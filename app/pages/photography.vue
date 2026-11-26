<script setup lang="ts">
import { computed, ref } from 'vue'

import PhotoViewer from '~/components/PhotoViewer.vue'
import {
  hangStyles,
  photoCaption,
  photoSrc,
  photoSrcset,
  plateNumber,
  type Photo,
} from '~/composables/usePhotography'
import { usePhotoViewer, type ViewerItem } from '~/composables/usePhotoViewer'

const title = 'Photography'
const description =
  'Photos from Nepal and trips around Europe, hung as small previews on one wall.'
const path = '/photography/'
const url = `https://subodhdahal.com${path}`
const instagram = 'https://instagram.com/wanderluster_subodh'

const { data } = await useAsyncData('photography', () =>
  queryCollection('photography').path('/photography').first(),
)
const photos = computed<Photo[]>(() => (data.value?.photos ?? []) as Photo[])

useHead({ title, link: [{ rel: 'canonical', href: url }] })
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: url,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
})
defineOgImage('SimpleBlog', { title, description })

// Every print carries its credit in structured data too, so a search
// result or an image crawler shows who made it.
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage', name: title, description }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: 'https://subodhdahal.com/' },
      { name: title, item: url },
    ],
  }),
  {
    '@type': 'ImageGallery',
    name: 'Photography by Subodh Dahal',
    description,
    url,
    image: photos.value.map((p) => ({
      '@type': 'ImageObject',
      contentUrl: `https://subodhdahal.com${photoSrc(p.slug, 1200)}`,
      name: p.title,
      caption: `${p.title}, ${photoCaption(p)}`,
      contentLocation: { '@type': 'Place', name: p.place },
      creator: { '@type': 'Person', name: 'Subodh Dahal' },
      creditText: 'Subodh Dahal',
      copyrightNotice: '© Subodh Dahal. All rights reserved.',
      width: p.width,
      height: p.height,
    })),
  },
])

// ---- The print in front -------------------------------------------------

const printRefs = ref<(HTMLElement | null)[]>([])
const viewerItems = computed<ViewerItem[]>(() =>
  photos.value.map((p) => ({
    src: photoSrc(p.slug, 1200),
    alt: p.alt,
    title: p.title,
    caption: photoCaption(p),
    width: p.width,
    height: p.height,
  })),
)
const { openIndex, open, close, step } = usePhotoViewer(
  (i) => printRefs.value[i]?.querySelector('button'),
  () => photos.value.length,
)

// Row breaks and print widths are worked out here, on the server, so the
// wall arrives already hung (see hangStyles).
const hang = computed(() => hangStyles(photos.value))

// The first rows are above the fold; the rest load as the wall scrolls in.
const isEager = (index: number) => index < 6
</script>

<template>
  <div class="bg-white dark:bg-secondary-900">
    <header class="bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700">
      <div class="container pt-12 pb-9 md:pt-16 md:pb-10">
        <div class="mb-6">
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-center text-secondary-800 dark:text-secondary-100 tracking-tight">
            Photography
          </h1>
          <div class="w-24 h-1 bg-primary-500 mx-auto mt-4" />
        </div>
        <p class="font-serif italic text-lg md:text-xl text-center max-w-2xl mx-auto leading-relaxed text-secondary-700 dark:text-secondary-200 text-balance">
          Forests in Nepal, old cities and lakes around Europe, and whatever caught the light on the way. Pick any print to see it up close.
        </p>
      </div>
    </header>

    <section class="wall" aria-label="Photographs">
      <div class="wall__inner">
        <ol class="wall__grid">
          <li
            v-for="(photo, index) in photos"
            :key="photo.slug"
            :ref="(el) => { printRefs[index] = el as HTMLElement | null }"
            class="wall__item"
            :style="hang[index]"
          >
            <button
              type="button"
              class="print"
              :aria-label="`${plateNumber(index)}. ${photo.title}, ${photoCaption(photo)}. View larger`"
              @click="open(index)"
            >
              <span class="print__frame">
                <img
                  :src="photoSrc(photo.slug, 600)"
                  :srcset="photoSrcset(photo.slug)"
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                  :alt="photo.alt"
                  :width="photo.width"
                  :height="photo.height"
                  :loading="isEager(index) ? 'eager' : 'lazy'"
                  decoding="async"
                  class="print__img"
                />
              </span>
              <span class="print__label" aria-hidden="true">
                <span class="print__no">{{ plateNumber(index) }}</span>
                <span class="print__place">{{ photo.place }}</span>
              </span>
            </button>
          </li>
        </ol>
      </div>
      <div class="wall__edge" aria-hidden="true" />
    </section>

    <section class="container py-14 md:py-16 text-center">
      <p class="font-serif italic text-lg md:text-xl text-secondary-700 dark:text-secondary-200 max-w-xl mx-auto leading-relaxed text-balance">
        These are small previews, signed in the corner when you open one. The full-size files stay with me, so please ask before using any of them.
      </p>
      <a
        :href="instagram"
        class="link-underline mt-5 text-primary-700 dark:text-primary-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        rel="me noopener"
        target="_blank"
      >
        More on Instagram<span aria-hidden="true"> →</span>
      </a>
    </section>

    <PhotoViewer
      :items="viewerItems"
      :index="openIndex"
      @close="close"
      @step="step"
    />
  </div>
</template>

<style scoped>
/* The wall: one tonal surface the prints hang on, closed by the rose
   front edge shared with the Library shelf.

   Prints hang in rows on a shared centre line. Each one's width grows
   with its aspect ratio times its weight, so every print keeps its own
   proportions (never cropped) while feature prints hang larger than
   their neighbours. Rows justify to the wall's width. */
.wall {
  --gap: 0.75rem;
  --mat: clamp(0.5rem, 1.3vw, 0.9rem);
  background-color: var(--color-secondary-100);
}

.wall__inner {
  max-width: 80rem;
  margin-inline: auto;
  padding: 2rem 1rem 2.5rem;
}

.wall__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.25rem var(--gap);
}

/* Each print's width is its share (f) of what its row (k prints) leaves
   after gaps and mats, plus its own mat. Exact at any wall width; the
   0.05px keeps sub-pixel rounding from wrapping a row early. */
.wall__item {
  --f: var(--f-mobile);
  --k: var(--k-mobile);
  --e: calc(2 * var(--mat) + 2px);
  flex: 0 0 calc(var(--f) * (100% - (var(--k) - 1) * var(--gap) - var(--k) * var(--e)) + var(--e) - 0.05px);
  min-width: 0;
}

@media (min-width: 640px) {
  .wall {
    --gap: 1.25rem;
  }
  .wall__item {
    --f: var(--f-tablet);
    --k: var(--k-tablet);
  }
  .wall__inner {
    padding: 3rem 1.5rem 3.5rem;
  }
  .wall__grid {
    gap: 2rem var(--gap);
  }
}

@media (min-width: 1024px) {
  .wall {
    --gap: 1.75rem;
  }
  .wall__item {
    --f: var(--f-desktop);
    --k: var(--k-desktop);
  }
  .wall__inner {
    padding: 3.5rem 2rem 4rem;
  }
  .wall__grid {
    gap: 2.75rem var(--gap);
  }
}

.wall__edge {
  height: 2px;
  background-color: var(--color-primary-500);
  opacity: 0.85;
}

/* A print: the photo contained in its mat, never cropped. The mat's
   bottom is weighted like a real one and carries the hanging number. */
.print {
  position: relative;
  display: block;
  width: 100%;
  padding: var(--mat);
  padding-bottom: 0;
  background: #fff;
  border: 1px solid var(--color-secondary-200);
  border-radius: 2px;
  box-shadow:
    0 1px 2px rgb(17 24 39 / 0.05),
    0 8px 18px -12px rgb(17 24 39 / 0.25);
  cursor: zoom-in;
  container-type: inline-size;
  font: inherit;
  color: inherit;
  text-align: left;
  transition:
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.2s ease;
}

.print__frame {
  display: block;
}

/* The tone behind the photo doubles as the loading state. */
.print__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: var(--ratio);
  background-color: var(--color-secondary-100);
}

.print__label {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  height: 1.5rem;
  padding-top: 0.25rem;
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
}

.print__no {
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--color-secondary-500);
}

.print__place {
  color: var(--color-secondary-600);
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.print:hover,
.print:focus-visible {
  transform: translateY(-3px);
  box-shadow:
    0 2px 4px rgb(17 24 39 / 0.06),
    0 18px 32px -16px rgb(17 24 39 / 0.35);
}

.print:hover .print__place,
.print:focus-visible .print__place {
  opacity: 1;
  transform: none;
}

.print:focus-visible {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow:
    0 0 0 3px var(--color-secondary-100),
    0 0 0 5px var(--color-primary-500),
    0 18px 32px -16px rgb(17 24 39 / 0.35);
}

/* Narrow prints keep just their number; a clipped place name reads
   as broken. The viewer always shows the full caption. */
@container (max-width: 11rem) {
  .print__place {
    display: none;
  }
}

/* Touch screens have no hover: show the place under every print. */
@media (hover: none) {
  .print__place {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .print,
  .print:hover,
  .print:focus-visible {
    transform: none;
  }
}
</style>

<style>
html.dark .wall {
  background-color: var(--color-secondary-950);
}

html.dark .wall__edge {
  background-color: var(--color-primary-400);
}

html.dark .print {
  background: var(--color-secondary-800);
  border-color: var(--color-secondary-700);
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.4),
    0 8px 18px -12px rgb(0 0 0 / 0.7);
}

html.dark .print:hover {
  box-shadow:
    0 2px 4px rgb(0 0 0 / 0.4),
    0 18px 32px -16px rgb(0 0 0 / 0.9);
}

html.dark .print:focus-visible {
  border-color: var(--color-primary-400);
  box-shadow:
    0 0 0 3px var(--color-secondary-950),
    0 0 0 5px var(--color-primary-400);
}

html.dark .print__img {
  background-color: var(--color-secondary-700);
}

html.dark .print__no {
  color: var(--color-secondary-400);
}

html.dark .print__place {
  color: var(--color-secondary-300);
}
</style>
