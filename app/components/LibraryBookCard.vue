<template>
  <article
    class="group flex flex-col h-full transition-transform duration-200 ease-out"
  >
    <!-- Cover -->
    <div
      class="relative aspect-[2/3] overflow-hidden rounded-lg border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800 transition-colors duration-300 group-hover:border-secondary-300 dark:group-hover:border-secondary-600"
    >
      <img
        :src="imageUrl(book.image)"
        :alt="`Cover of ${book.title} by ${book.author}`"
        loading="lazy"
        width="400"
        height="600"
        class="absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
    </div>

    <!-- Meta + body -->
    <div class="flex flex-col flex-1 mt-5">
      <header>
        <h2 class="font-serif text-lg font-bold leading-snug text-secondary-800 dark:text-secondary-50">
          {{ book.title }}
        </h2>
        <p class="font-sans text-sm mt-1 text-secondary-600 dark:text-secondary-300">
          {{ book.author }}
        </p>

        <!-- Genres, directly under the author -->
        <div class="mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="genre in book.genres"
            :key="genre"
            class="inline-block font-sans font-medium text-[0.6875rem] uppercase tracking-[0.06em] bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 px-2 py-0.5 rounded"
          >
            {{ genre }}
          </span>
        </div>
      </header>

      <!-- Description (what the book is) -->
      <p class="font-sans text-sm mt-5 leading-relaxed text-secondary-600 dark:text-secondary-300">
        {{ book.description }}
      </p>

      <!-- Why I recommend it -->
      <div class="mt-5 pt-4 border-t border-secondary-200 dark:border-secondary-700">
        <p class="font-sans text-[0.6875rem] uppercase tracking-[0.08em] font-medium text-primary-600 dark:text-primary-300">
          Why I recommend it
        </p>
        <p class="font-serif italic text-[0.95rem] mt-2 leading-relaxed text-secondary-700 dark:text-secondary-200">
          {{ book.recommendation }}
        </p>
      </div>

      <!-- Quote, if any -->
      <blockquote
        v-if="book.quote"
        class="mt-5 pl-4 border-l border-primary-500"
      >
        <p class="font-serif italic text-sm leading-relaxed text-secondary-700 dark:text-secondary-200">
          &ldquo;{{ book.quote }}&rdquo;
        </p>
        <footer
          v-if="book.quoteAttribution"
          class="font-sans text-xs mt-2 text-secondary-500 dark:text-secondary-400 not-italic"
        >
          {{ book.quoteAttribution }}
        </footer>
      </blockquote>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Book {
  title: string
  author: string
  image: string
  genres: string[]
  description: string
  recommendation: string
  quote?: string
  quoteAttribution?: string
}

const props = defineProps<{ book: Book }>()

const imageUrl = (image: string) => `/images/library/${image}`
</script>
