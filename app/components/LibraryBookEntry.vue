<script setup lang="ts">
import { computed } from 'vue'

import type { Book } from '~/composables/useLibrary'
import { bookId, recommendationParagraphs } from '~/composables/useLibrary'

const props = withDefaults(
  defineProps<{
    book: Book
    /** Zero-based index; controls which side the cover sits on. */
    index?: number
  }>(),
  {
    index: 0,
  },
)

const coverUrl = (image: string) => `/images/library/${image}`

const slug = computed(() => bookId(props.book.title))

const paragraphs = computed(() => recommendationParagraphs(props.book.recommendation))

/**
 * Combine the legacy single-quote shape with the new `quotes[]` shape
 * so existing entries (with `quote` + `quoteAttribution`) keep working
 * alongside entries that want multiple pull quotes.
 */
const allQuotes = computed(() => {
  const result: Array<{ text: string; attribution?: string }> = []
  if (props.book.quotes?.length) {
    for (const q of props.book.quotes) result.push(q)
  } else if (props.book.quote) {
    result.push({ text: props.book.quote, attribution: props.book.quoteAttribution })
  }
  return result
})

const emit = defineEmits<{
  /** Fired by the entry's root ref so the parent can register it with
   *  the intersection observer. */
  (e: 'mount', title: string, el: HTMLElement | null): void
}>()
</script>

<template>
  <article
    :id="slug"
    :ref="(el) => $emit('mount', book.title, el as HTMLElement | null)"
    :class="['library-entry', index % 2 === 0 ? 'library-entry--cover-left' : 'library-entry--cover-right']"
    :data-book-title="book.title"
  >
    <div class="library-entry__inner">
      <!-- Cover column: just the cover image. The book identity
           (kicker, title, author, year, genres) lives with the text
           so the thumbnail and the reading experience stay in their
           own lanes. -->
      <div class="library-entry__cover-col">
        <div class="library-entry__cover">
          <img
            :src="coverUrl(book.image)"
            :alt="`Cover of ${book.title} by ${book.author}`"
            loading="lazy"
            width="400"
            height="600"
            class="library-entry__cover-img"
          />
        </div>
      </div>

      <!-- Note column: the long-form reading experience. Opens with
           the book identity block (kicker, title, author, year,
           genres), then the description, essay, and quotes. Width is
           capped at the prose reading width; the whole entry fits
           within the page container. -->
      <div class="library-entry__note-col">
        <header class="library-entry__header">
          <div class="library-entry__kicker-row">
            <span class="library-entry__kicker">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span v-if="book.year" class="library-entry__year">
              Read in {{ book.year }}
            </span>
          </div>
          <h2 class="library-entry__title">{{ book.title }}</h2>
          <p class="library-entry__author">{{ book.author }}</p>

          <ul v-if="book.genres.length" class="library-entry__genres" aria-label="Genres">
            <li
              v-for="genre in book.genres"
              :key="genre"
              class="library-entry__genre"
            >
              {{ genre }}
            </li>
          </ul>
        </header>

        <p class="library-entry__description">
          {{ book.description }}
        </p>

        <div class="library-entry__essay">
          <p class="library-entry__essay-label">
            Why it stayed with me
          </p>
          <p
            v-for="(para, i) in paragraphs"
            :key="i"
            class="library-entry__paragraph"
          >
            {{ para }}
          </p>
        </div>

        <blockquote
          v-for="(quote, i) in allQuotes"
          :key="i"
          class="library-entry__quote"
        >
          <p class="library-entry__quote-text">
            &ldquo;{{ quote.text }}&rdquo;
          </p>
          <footer
            v-if="quote.attribution"
            class="library-entry__quote-attr"
          >
            {{ quote.attribution }}
          </footer>
        </blockquote>
      </div>
    </div>
  </article>
</template>

<style scoped>
.library-entry {
  scroll-margin-top: 96px; /* anchor target lands below the page header */
  padding: 64px 0;
  border-bottom: 1px solid theme('colors.secondary.200');
}

.library-entry:last-of-type {
  border-bottom: 0;
}

@media (min-width: 768px) {
  .library-entry {
    padding: 96px 0;
  }
}

.library-entry__inner {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .library-entry__inner {
    grid-template-columns: 240px 1fr;
    gap: 64px;
    align-items: start;
  }
  .library-entry--cover-right .library-entry__inner {
    grid-template-columns: 1fr 240px;
  }
  .library-entry--cover-right .library-entry__cover-col {
    order: 2;
  }
  .library-entry--cover-right .library-entry__note-col {
    order: 1;
  }
}

@media (min-width: 1024px) {
  .library-entry__inner {
    grid-template-columns: 280px 1fr;
    gap: 80px;
  }
  .library-entry--cover-right .library-entry__inner {
    grid-template-columns: 1fr 280px;
  }
}

/* Cover column.
   The "mat" around the cover image is rendered as a 4px solid border
   in the page background color — it is the same color as the cover
   container's surface in light mode (secondary-50) and a darker
   surface in dark mode (secondary-800). Using a background color
   rather than box-shadow keeps the Flat-At-Rest rule honest while
   still giving the cover a quiet photo-mat feel. */
.library-entry__cover {
  position: relative;
  width: 100%;
  max-width: 220px;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  overflow: hidden;
  background-color: theme('colors.secondary.50');
  border: 4px solid theme('colors.secondary.50');
  outline: 1px solid theme('colors.secondary.200');
  outline-offset: -1px;
  transition: transform 0.3s ease, outline-color 0.3s ease;
}

@media (min-width: 768px) {
  .library-entry__cover {
    max-width: none;
  }
}

.library-entry:hover .library-entry__cover {
  transform: translateY(-2px);
  outline-color: theme('colors.secondary.300');
}

.library-entry__cover-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.library-entry__cover-col {
  /* On mobile, the cover sits left-aligned to match the container
     padding. At md+ the grid column takes over. */
  display: flex;
  justify-content: flex-start;
}

@media (min-width: 768px) {
  /* At md+ the cover is sticky-ish in feel: it sits at the top of
     the entry, aligned with the kicker / title, and the long note
     flows past it. The cover itself is not sticky — it just shares
     the top with the header. */
  .library-entry__cover-col {
    display: block;
  }
}

/* The book identity block now lives at the top of the note column.
   It needs bottom margin to separate the header from the description
   that follows — the old margin-top (when the header sat below the
   cover) no longer applies. */
.library-entry__header {
  margin-bottom: 32px;
}

.library-entry__kicker-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 6px;
}

/* primary-700 over white holds 5.9:1 at 11px (passes AA for body
   text at this weight). Was primary-600 (4.0:1, fails AA). */
.library-entry__kicker,
.library-entry__essay-label {
  font-family: theme('fontFamily.sans');
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: theme('colors.primary.700');
}

.library-entry__essay-label {
  margin: 0 0 16px;
}

.library-entry__year {
  font-family: theme('fontFamily.sans');
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 400;
  color: theme('colors.secondary.500');
}

.library-entry__title {
  font-family: theme('fontFamily.serif');
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: theme('colors.secondary.800');
  margin: 0;
}

@media (min-width: 768px) {
  .library-entry__title {
    font-size: 1.875rem;
  }
}

.library-entry__author {
  font-family: theme('fontFamily.sans');
  font-size: 0.9375rem;
  color: theme('colors.secondary.600');
  margin-top: 4px;
}

.library-entry__genres {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.library-entry__genre {
  font-family: theme('fontFamily.sans');
  font-weight: 500;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: theme('colors.secondary.100');
  color: theme('colors.secondary.600');
  padding: 4px 8px;
  border-radius: 4px;
}

/* Note column */

.library-entry__description {
  font-family: theme('fontFamily.sans');
  font-size: 0.9375rem;
  line-height: 1.6;
  color: theme('colors.secondary.600');
  margin: 0 0 32px;
  max-width: 60ch;
}

.library-entry__essay {
  margin: 0 0 32px;
}

.library-entry__paragraph {
  font-family: theme('fontFamily.serif');
  font-size: 1.0625rem;
  line-height: 1.75;
  color: theme('colors.secondary.800');
  margin: 0 0 16px;
  max-width: 65ch;
}

.library-entry__paragraph:last-child {
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .library-entry__paragraph {
    font-size: 1.125rem;
  }
}

.library-entry__quote {
  margin: 32px 0;
  padding: 4px 0 4px 24px;
  border-left: 2px solid theme('colors.primary.500');
  max-width: 60ch;
}

.library-entry__quote-text {
  font-family: theme('fontFamily.serif');
  font-style: italic;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: theme('colors.secondary.700');
  margin: 0;
}

@media (min-width: 768px) {
  .library-entry__quote-text {
    font-size: 1.125rem;
  }
}

.library-entry__quote-attr {
  font-family: theme('fontFamily.sans');
  font-size: 0.75rem;
  font-style: normal;
  letter-spacing: 0.04em;
  color: theme('colors.secondary.500');
  margin-top: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .library-entry__cover,
  .library-entry:hover .library-entry__cover {
    transition: none;
    transform: none;
  }
}
</style>

<style>
/* Class-based dark mode (html.dark), matching the rest of the site.
   Kept in a non-scoped block so the html.dark ancestor selector is
   not constrained by this component's scope. */
html.dark .library-entry {
  border-color: theme('colors.secondary.700');
}

html.dark .library-entry__cover {
  background-color: theme('colors.secondary.800');
  border-color: theme('colors.secondary.800');
  outline-color: theme('colors.secondary.700');
}

html.dark .library-entry:hover .library-entry__cover {
  outline-color: theme('colors.secondary.500');
}

html.dark .library-entry__kicker,
html.dark .library-entry__essay-label {
  color: theme('colors.primary.300');
}

html.dark .library-entry__year {
  color: theme('colors.secondary.400');
}

html.dark .library-entry__title {
  color: theme('colors.secondary.50');
}

html.dark .library-entry__author {
  color: theme('colors.secondary.300');
}

html.dark .library-entry__genre {
  background-color: theme('colors.secondary.800');
  color: theme('colors.secondary.300');
}

html.dark .library-entry__description {
  color: theme('colors.secondary.300');
}

html.dark .library-entry__paragraph {
  color: theme('colors.secondary.100');
}

html.dark .library-entry__quote {
  border-color: theme('colors.primary.400');
}

html.dark .library-entry__quote-text {
  color: theme('colors.secondary.200');
}

html.dark .library-entry__quote-attr {
  color: theme('colors.secondary.400');
}
</style>
