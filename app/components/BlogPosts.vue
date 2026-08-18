<script setup lang="ts">
interface Props {
  quantity: number;
  content: string;
  showDescription?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  quantity: 100,
  content: "blog",
  showDescription: true,
});

const { articles, isLoading, error } = useArticles({ quantity: props.quantity });

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <div>
    <div v-if="error" class="text-red-500 text-center my-4" role="alert">
      {{ error }}
    </div>

    <div v-else-if="isLoading" class="text-center my-4" aria-live="polite">
      Loading articles...
    </div>

    <ul v-else-if="articles.length" class="flex flex-col max-w-2xl mx-auto">
      <li
        v-for="article in articles"
        :key="article.url || article.path"
        class="py-4 border-b border-secondary-200 dark:border-secondary-700 last:border-b-0 group transition-colors duration-150 hover:border-secondary-300 dark:hover:border-secondary-600"
      >
        <NuxtLink
          :to="article.url || article.path"
          :target="article.url ? '_blank' : '_self'"
          class="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        >
          <div class="flex justify-between items-start gap-4">
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-semibold text-secondary-700 dark:text-secondary-200 group-hover:text-secondary-900 dark:group-hover:text-secondary-50 transition-colors duration-150">
                {{ article.title }}
              </h2>
              <p
                v-if="showDescription && article.description"
                class="text-sm mt-1 text-secondary-600 dark:text-secondary-200"
              >
                {{ article.description }}
              </p>
              <div v-if="article.tags?.length" class="mt-1">
                <ArticleTags :tags="article.tags" />
              </div>
            </div>
            <time
              v-if="article.postDate"
              class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 flex-shrink-0 hidden sm:block"
            >
              {{ formatDate(article.postDate) }}
            </time>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-center text-secondary-500">No articles found</p>
  </div>
</template>
