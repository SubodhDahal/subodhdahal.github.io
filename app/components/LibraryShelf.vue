<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

import type { Book } from '~/composables/useLibrary'

const props = defineProps<{
  books: Book[]
  activeTitle: string | null
}>()

const emit = defineEmits<{
  /** Fired when a user picks a cover. The page resolves the scroll. */
  (e: 'pick', title: string): void
}>()

const stripRef = ref<HTMLElement | null>(null)
const activeItemRef = ref<HTMLElement | null>(null)

const coverUrl = (image: string) => `/images/library/${image}`

const handlePick = (title: string) => {
  emit('pick', title)
}

/**
 * Keep the active book visible in the strip. When the active book
 * changes (the reader is viewing a different entry), the matching
 * cover scrolls into view inside the strip without disturbing the
 * page's own scroll. Skipped under reduced motion.
 */
const scrollActiveIntoView = async () => {
  if (typeof window === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  await nextTick()
  const strip = stripRef.value
  const item = activeItemRef.value
  if (!strip || !item) return
  const stripRect = strip.getBoundingClientRect()
  const itemRect = item.getBoundingClientRect()
  const outOfViewLeft = itemRect.left < stripRect.left
  const outOfViewRight = itemRect.right > stripRect.right
  if (!outOfViewLeft && !outOfViewRight) return
  const offset =
    item.offsetLeft -
    strip.offsetLeft -
    strip.clientWidth / 2 +
    item.clientWidth / 2
  strip.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' })
}

watch(() => props.activeTitle, scrollActiveIntoView)
// No onMounted scroll: the first book is active on load and the first
// cover is already at scrollLeft=0. The previous "position on first
// active book" nudge computed a non-zero offset for the first item
// (it subtracted the strip's left padding, which was already baked
// into offsetLeft) and the browser clamped it to the max scroll,
// shoving the first cover ~183px left on every desktop load. Leaving
// the strip alone on mount is correct.

/**
 * First 5 covers are above the fold and load eagerly. Anything
 * beyond is lazy — readers either scroll the strip or scroll the
 * page before they meet it.
 */
const isEager = (index: number) => index < 5
</script>

<template>
  <nav
    class="library-shelf"
    aria-label="Jump to a book on the shelf"
  >
    <div class="library-shelf__inner">
      <div
        ref="stripRef"
        class="library-shelf__strip"
      >
        <button
          v-for="(book, index) in books"
          :key="book.title"
          :ref="(el) => {
            const node = el as HTMLElement | null
            if (book.title === activeTitle) activeItemRef = node
          }"
          type="button"
          :class="[
            'library-shelf__item',
            { 'is-active': book.title === activeTitle },
          ]"
          :aria-current="book.title === activeTitle ? 'true' : undefined"
          :aria-label="`Jump to ${book.title} by ${book.author}`"
          @click="handlePick(book.title)"
        >
          <div class="library-shelf__cover">
            <img
              :src="coverUrl(book.image)"
              :alt="`Cover of ${book.title} by ${book.author}`"
              :loading="isEager(index) ? 'eager' : 'lazy'"
              :fetchpriority="isEager(index) ? 'high' : 'auto'"
              width="220"
              height="330"
              class="library-shelf__cover-img"
            />
          </div>
          <div class="library-shelf__meta">
            <span class="library-shelf__index">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span class="library-shelf__title">{{ book.title }}</span>
            <span class="library-shelf__author">{{ book.author }}</span>
          </div>
        </button>
      </div>
    </div>
    <div class="library-shelf__edge" aria-hidden="true" />
  </nav>
</template>

<style scoped>
/* The shelf is a flat tonal surface the books "sit on". The surface
   itself is full-bleed so the rose front edge can run the full
   viewport width at the top of the library surface — like a floor.
   The covers and the strip are wrapped in a max-w-5xl inner
   container so they align with the filter and entries below. */
.library-shelf {
  position: relative;
  background-color: theme('colors.secondary.50');
  border-top: 1px solid theme('colors.secondary.200');
  border-bottom: 1px solid theme('colors.secondary.200');
}

.library-shelf__inner {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 640px) {
  .library-shelf__inner {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (min-width: 768px) {
  .library-shelf__inner {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.library-shelf__strip {
  display: flex;
  gap: 14px;
  padding-top: 28px;
  padding-bottom: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
  scroll-padding-inline: 16px;
  -webkit-overflow-scrolling: touch;
}

/* The styled scrollbar relies solely on the webkit pseudo-elements
   below. Do NOT also set `scrollbar-width: thin` here — Chromium
   ≥121 will honor the standard `scrollbar-width`/`scrollbar-color`
   pair and ignore the webkit block, which leaves a chunky UA
   scrollbar sitting on top of the rose front edge. The webkit block
   alone is what produces the intended 6px custom scrollbar. */
.library-shelf__strip::-webkit-scrollbar {
  height: 6px;
}

.library-shelf__strip::-webkit-scrollbar-track {
  background: transparent;
}

.library-shelf__strip::-webkit-scrollbar-thumb {
  background-color: theme('colors.secondary.300');
  border-radius: 9999px;
}

.library-shelf__item {
  flex: 0 0 auto;
  width: 132px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  scroll-snap-align: start;
  font: inherit;
  color: inherit;
}

.library-shelf__cover {
  position: relative;
  width: 132px;
  height: 198px; /* 2:3 */
  border-radius: 6px;
  overflow: hidden;
  background-color: theme('colors.secondary.100');
  border: 1px solid theme('colors.secondary.200');
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.library-shelf__cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.library-shelf__item:hover .library-shelf__cover,
.library-shelf__item:focus-visible .library-shelf__cover {
  transform: translateY(-2px);
  border-color: theme('colors.secondary.400');
}

.library-shelf__item:focus-visible {
  outline: none;
}

.library-shelf__item:focus-visible .library-shelf__cover {
  box-shadow: 0 0 0 2px theme('colors.secondary.50'),
    0 0 0 4px theme('colors.primary.500');
}

.library-shelf__item.is-active .library-shelf__cover {
  border-color: theme('colors.primary.500');
}

.library-shelf__meta {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 10px;
  padding-bottom: 14px;
}

.library-shelf__index {
  font-family: theme('fontFamily.sans');
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  /* secondary-500 over secondary-50 holds AA at this size. */
  color: theme('colors.secondary.500');
  font-weight: 500;
}

.library-shelf__title {
  font-family: theme('fontFamily.serif');
  font-size: 0.9375rem;
  line-height: 1.25;
  font-weight: 600;
  color: theme('colors.secondary.800');
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.library-shelf__author {
  font-family: theme('fontFamily.sans');
  font-size: 0.75rem;
  line-height: 1.4;
  color: theme('colors.secondary.500');
}

/* The active book gets a small rose dot under the meta block, sitting
   on the shelf surface (the strip's bottom padding reserves room for
   it). This is the "you are here" indicator and the only place the
   strip uses the brand color. */
.library-shelf__item.is-active .library-shelf__meta::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: theme('colors.primary.500');
  transform: translateX(-50%);
}

/* The "front edge" of the shelf. A 2px rose rule under the strip,
   full viewport width. Reads as the surface the books rest on. */
.library-shelf__edge {
  height: 2px;
  background-color: theme('colors.primary.500');
  opacity: 0.85;
}

@media (prefers-reduced-motion: reduce) {
  .library-shelf__cover,
  .library-shelf__item:hover .library-shelf__cover,
  .library-shelf__item:focus-visible .library-shelf__cover {
    transition: none;
    transform: none;
  }
}
</style>

<style>
/* Dark-mode rules are kept in a non-scoped block because the site
   uses class-based dark mode (class="dark" on <html>, set by
   @nuxtjs/color-mode), not the OS-level prefers-color-scheme media
   query. Every dark rule lives here, keyed off the global html.dark
   class, so the surface stays in lockstep with the rest of the site
   when the reader toggles the theme. */
html.dark .library-shelf {
  background-color: theme('colors.secondary.800');
  border-color: theme('colors.secondary.700');
}

html.dark .library-shelf__strip::-webkit-scrollbar-thumb {
  background-color: theme('colors.secondary.600');
}

html.dark .library-shelf__cover {
  background-color: theme('colors.secondary.700');
  border-color: theme('colors.secondary.600');
}

html.dark .library-shelf__item:hover .library-shelf__cover,
html.dark .library-shelf__item:focus-visible .library-shelf__cover {
  border-color: theme('colors.secondary.500');
}

html.dark .library-shelf__item:focus-visible .library-shelf__cover {
  box-shadow: 0 0 0 2px theme('colors.secondary.800'),
    0 0 0 4px theme('colors.primary.400');
}

html.dark .library-shelf__item.is-active .library-shelf__cover {
  border-color: theme('colors.primary.400');
}

html.dark .library-shelf__index {
  /* secondary-400 on secondary-800 holds ~5.4:1 at 11px, passing AA.
     secondary-500 was 3.0:1 and failed. */
  color: theme('colors.secondary.400');
}

html.dark .library-shelf__title {
  color: theme('colors.secondary.50');
}

html.dark .library-shelf__author {
  color: theme('colors.secondary.300');
}

html.dark .library-shelf__item.is-active .library-shelf__meta::after {
  background-color: theme('colors.primary.400');
}

html.dark .library-shelf__edge {
  background-color: theme('colors.primary.400');
}
</style>
