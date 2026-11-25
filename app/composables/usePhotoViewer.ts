import { nextTick, ref, type Ref } from 'vue'

/** One photo the viewer can bring forward. */
export interface ViewerItem {
  src: string
  alt: string
  title: string
  /** Secondary line under the title, e.g. "Colmar, France · 2023". */
  caption?: string
  width?: number
  height?: number
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const transition = async (update: () => void | Promise<void>) => {
  const doc = document as Document & {
    startViewTransition?: (cb: () => Promise<void>) => { finished: Promise<void> }
  }
  if (!doc.startViewTransition || prefersReducedMotion()) {
    await update()
    return
  }
  await doc.startViewTransition(async () => {
    await update()
    await nextTick()
  }).finished
}

/**
 * Open, step through and close the shared photo viewer
 * (components/PhotoViewer.vue), with the photo travelling between the page
 * and the viewer as a shared-element view transition.
 *
 *   trigger(i): the focusable element that opened photo i. It is either
 *               the <img> itself or an element containing it. Focus
 *               returns there on close.
 *   count:      how many photos there are.
 */
export const usePhotoViewer = (
  trigger: (index: number) => HTMLElement | null | undefined,
  count: Ref<number> | (() => number),
) => {
  const openIndex = ref<number | null>(null)
  const total = () => (typeof count === 'function' ? count() : count.value)

  // The page's image is named for the transition only while it travels.
  const imageOf = (index: number) => {
    const el = trigger(index)
    if (!el) return null
    return (el instanceof HTMLImageElement ? el : el.querySelector('img')) as HTMLImageElement | null
  }

  const open = async (index: number) => {
    const img = imageOf(index)
    if (img) img.style.viewTransitionName = 'print-forward'
    await transition(async () => {
      if (img) img.style.viewTransitionName = ''
      openIndex.value = index
      await nextTick()
    })
  }

  const close = async () => {
    const index = openIndex.value
    if (index === null) return
    const el = trigger(index)
    // Make sure the photo it returns to is on screen.
    el?.scrollIntoView({ block: 'nearest', behavior: 'instant' as ScrollBehavior })
    const img = imageOf(index)
    await transition(async () => {
      openIndex.value = null
      await nextTick()
      if (img) img.style.viewTransitionName = 'print-forward'
    })
    if (img) img.style.viewTransitionName = ''
    el?.focus({ preventScroll: true })
  }

  const step = (delta: 1 | -1) => {
    if (openIndex.value === null) return
    const next = openIndex.value + delta
    if (next < 0 || next >= total()) return
    transition(() => {
      openIndex.value = next
    })
  }

  return { openIndex, open, close, step }
}
