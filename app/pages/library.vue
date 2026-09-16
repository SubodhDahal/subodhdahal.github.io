<script setup lang="ts">
import { computed, nextTick } from 'vue'

import LibraryBookEntry from '~/components/LibraryBookEntry.vue'
import LibraryShelf from '~/components/LibraryShelf.vue'
import { bookId, useLibrary } from '~/composables/useLibrary'

const title = 'Library'
const description =
  "Books I have read and recommend, with a short note on why each one earned its place."
const path = '/library/'

const { data } = await useAsyncData('library', () =>
  queryCollection('library').path('/library').first(),
)

const {
  activeGenre,
  activeTitle,
  allBooks,
  genres,
  filteredBooks,
  setGenre,
  setActiveTitle,
  registerEntry,
} = useLibrary(computed(() => data.value?.books ?? null))

useHead({
  title,
  link: [
    {
      rel: 'canonical',
      href: `https://subodhdahal.com${path}`,
    },
  ],
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: `https://subodhdahal.com${path}`,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
})

const bookCount = computed(() => allBooks.value.length)
const visibleCount = computed(() => filteredBooks.value.length)

const scrollToTitle = async (title: string) => {
  if (typeof window === 'undefined') return
  const target = document.getElementById(bookId(title))
  if (!target) return
  // Set the active book before the scroll so the shelf's dot lands
  // on the picked book instead of machine-gunning through the
  // intermediate entries during the smooth-scroll animation.
  setActiveTitle(title)
  await nextTick()
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  })
  history.replaceState(null, '', `#${bookId(title)}`)
}

const handleShelfPick = async (picked: string) => {
  // If the book is hidden by the active filter, clear the filter so
  // the picked entry actually exists in the DOM before we try to
  // scroll to it. The await ensures Vue has flushed the re-render
  // before we look up the element.
  if (filteredBooks.value.every((b) => b.title !== picked)) {
    setGenre(null)
    await nextTick()
  }
  scrollToTitle(picked)
}

const handleEntryMount = (title: string, el: HTMLElement | null) => {
  registerEntry(title, el)
}

const handleEntryNavigate = (title: string) => {
  scrollToTitle(title)
}
</script>

<template>
  <div class="bg-white dark:bg-secondary-900">
    <!-- Header: the standard site section title with the rose rule
         below, plus a reflective lede. Tonal background matches the
         rest of the site. -->
    <header class="bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700">
      <div class="container pt-16 pb-10 md:pt-20 md:pb-12">
        <div class="relative mb-6">
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-center text-secondary-800 dark:text-secondary-100 tracking-tight">
            Library
          </h1>
          <div class="absolute w-24 h-1 bg-primary-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4" />
        </div>

        <p class="font-serif italic text-lg md:text-xl text-center max-w-2xl mx-auto leading-relaxed text-secondary-700 dark:text-secondary-200">
          Books I&rsquo;ve read, learned from, and keep recommending. The shelf above the filter is the whole library at a glance; each entry below is the argument for why the book earned its place.
        </p>
      </div>
    </header>

    <!-- Shelf: the horizontal cover index of the whole library. Sits
         on its own tonal surface (handled inside the component) so the
         row reads as a deliberate display surface, not a band of
         cards. Always shows all books; the filter only affects the
         entries below. -->
    <LibraryShelf
      :books="allBooks"
      :active-title="activeTitle"
      @pick="handleShelfPick"
    />

    <!-- Filter: a row of small genre chips, with "All" as the reset.
         The visible count sits next to the chips so the reader knows
         how the filter is affecting the page. -->
    <section
      v-if="bookCount > 0"
      class="container py-8 md:py-10"
      aria-label="Filter the library by genre"
    >
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div
          class="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by genre"
        >
          <button
            type="button"
            :class="[
              'library-filter__chip',
              activeGenre === null ? 'is-active' : '',
            ]"
            :aria-pressed="activeGenre === null"
            @click="setGenre(null)"
          >
            All
          </button>
          <button
            v-for="genre in genres"
            :key="genre"
            type="button"
            :class="[
              'library-filter__chip',
              activeGenre === genre ? 'is-active' : '',
            ]"
            :aria-pressed="activeGenre === genre"
            @click="setGenre(genre)"
          >
            {{ genre }}
          </button>
        </div>
        <p class="font-sans text-xs tracking-[0.08em] uppercase text-secondary-500 dark:text-secondary-400">
          <span v-if="activeGenre">
            {{ visibleCount }} of {{ bookCount }} &middot; {{ activeGenre }}
          </span>
          <span v-else>
            {{ bookCount }} {{ bookCount === 1 ? 'book' : 'books' }} on the shelf
          </span>
        </p>
      </div>
    </section>

    <!-- Entries: the long-form notes. One per visible book. Alternating
         cover-left / cover-right at md+, stacked on mobile. -->
    <section class="container">
      <ol
        class="library-entries"
        aria-label="Library entries"
      >
        <li
          v-for="(book, index) in filteredBooks"
          :key="book.title"
          class="library-entries__item"
        >
          <LibraryBookEntry
            :book="book"
            :index="index"
            :all-books="allBooks"
            @mount="handleEntryMount"
            @navigate="handleEntryNavigate"
          />
        </li>
      </ol>

      <p
        v-if="visibleCount === 0"
        class="font-serif italic text-lg text-center text-secondary-500 dark:text-secondary-400 py-16"
      >
        Nothing on the shelf for that genre yet. Try another, or read everything.
      </p>
    </section>
  </div>
</template>

<style scoped>
.library-entries {
  list-style: none;
  margin: 0;
  padding: 0;
}

.library-entries__item {
  margin: 0;
}
</style>

<style>
/* Filter chip styles live outside <style scoped> because the same
   chip class can apply to both the active and inactive states and
   the rules benefit from being a single block. Unscoped because the
   class-based dark-mode rules need to target the global html.dark
   parent. */
.library-filter__chip {
  font-family: theme('fontFamily.sans');
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: theme('colors.secondary.600');
  background-color: theme('colors.secondary.100');
  border: 1px solid theme('colors.secondary.200');
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  /* DESIGN.md mandates 44×44px touch targets on every interactive
     surface. 44px is the floor, not a stretch goal. */
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
}

.library-filter__chip:hover {
  background-color: theme('colors.secondary.200');
  color: theme('colors.secondary.800');
}

.library-filter__chip:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px theme('colors.secondary.50'),
    0 0 0 4px theme('colors.primary.500');
}

.library-filter__chip.is-active {
  background-color: theme('colors.primary.50');
  color: theme('colors.primary.700');
  border-color: theme('colors.primary.300');
}

html.dark .library-filter__chip {
  color: theme('colors.secondary.300');
  background-color: theme('colors.secondary.800');
  border-color: theme('colors.secondary.700');
}

html.dark .library-filter__chip:hover {
  background-color: theme('colors.secondary.700');
  color: theme('colors.secondary.50');
}

html.dark .library-filter__chip.is-active {
  background-color: theme('colors.primary.900');
  color: theme('colors.primary.200');
  border-color: theme('colors.primary.700');
}

@media (prefers-reduced-motion: reduce) {
  .library-filter__chip {
    transition: none;
  }
}
</style>
