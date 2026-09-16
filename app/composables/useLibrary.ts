import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import type { Ref } from 'vue'

export interface Book {
  title: string
  author: string
  image: string
  year?: number
  genres: string[]
  description: string
  recommendation: string
  quote?: string
  quoteAttribution?: string
  quotes?: Array<{ text: string; attribution?: string }>
}

/**
 * Generates a URL-safe id from a book title for in-page anchors.
 * Stable across renders, lowercase, hyphen-separated.
 */
export const bookId = (title: string): string =>
  `book-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

/**
 * Splits a long-form recommendation into paragraphs on blank lines.
 * Existing entries that are single paragraphs render unchanged; entries
 * that want essay-length notes can include "\n\n" in the source string.
 */
export const recommendationParagraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

/**
 * Shared state for the library page: the active genre filter and the
 * active book (the entry currently in the viewport). Kept here so the
 * shelf and the entries can read and write to the same source of truth
 * without prop-drilling or an event bus.
 */
export function useLibrary(books: Ref<Book[] | undefined | null>) {
  const activeGenre = ref<string | null>(null)
  // Seed the active book to the first book in the collection so the
  // shelf's rose "you are here" dot lands on something visible at the
  // top of the page. The intersection observer takes over once the
  // reader scrolls and the entry actually enters the active band.
  const activeTitle = ref<string | null>(
    (books.value && books.value[0]?.title) ?? null,
  )

  const allBooks = computed<Book[]>(() => books.value ?? [])

  const genres = computed<string[]>(() => {
    const set = new Set<string>()
    for (const book of allBooks.value) {
      for (const genre of book.genres) set.add(genre)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  })

  const filteredBooks = computed<Book[]>(() => {
    const list = allBooks.value
    if (!activeGenre.value) return list
    return list.filter((book) => book.genres.includes(activeGenre.value!))
  })

  const setGenre = (genre: string | null) => {
    activeGenre.value = genre
    // Clear the active book when the filter changes so the shelf
    // doesn't keep pointing at something the reader can no longer see.
    activeTitle.value = null
  }

  // ---- Active book tracking (intersection observer) ----------------
  //
  // Each book entry registers its DOM element on mount and unregisters
  // on unmount. The observer is created lazily on the client (not during
  // SSR) and entries registered before it exists are queued.

  const entryRefs = new Map<string, HTMLElement>()
  const pendingEntries: HTMLElement[] = []
  let observer: IntersectionObserver | null = null
  let suppressObserverUpdates = false

  const observeNow = (el: HTMLElement) => {
    observer?.observe(el)
  }

  const registerEntry = (title: string, el: HTMLElement | null) => {
    const previous = entryRefs.get(title)
    if (previous && previous !== el) {
      observer?.unobserve(previous)
    }
    if (!el) {
      entryRefs.delete(title)
      return
    }
    el.dataset.bookTitle = title
    entryRefs.set(title, el)
    if (observer) {
      observeNow(el)
    } else {
      pendingEntries.push(el)
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }
    // Bias the active band toward the upper-middle of the viewport so a
    // book "becomes active" once the reader has reached it, not while
    // it is still climbing into view.
    observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverUpdates) return
        let bestTitle: string | null = null
        let bestRatio = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestTitle = (entry.target as HTMLElement).dataset.bookTitle ?? null
          }
        }
        if (bestTitle) activeTitle.value = bestTitle
      },
      {
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )
    for (const el of pendingEntries) observer.observe(el)
    pendingEntries.length = 0
    for (const el of entryRefs.values()) observer.observe(el)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  /**
   * Programmatic active-title set, used by smooth-scroll flows where
   * the in-view observer would otherwise pick the wrong entry during
   * the scroll animation. Suppresses the observer for a frame.
   */
  const setActiveTitle = (title: string | null) => {
    if (!title) {
      activeTitle.value = null
      return
    }
    suppressObserverUpdates = true
    activeTitle.value = title
    // Release the suppression on the next frame so the observer can
    // re-take control once the scroll animation has settled.
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          suppressObserverUpdates = false
        })
      })
    }
  }

  return {
    activeGenre,
    activeTitle,
    allBooks,
    genres,
    filteredBooks,
    setGenre,
    setActiveTitle,
    registerEntry,
  }
}
