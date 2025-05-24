<script setup lang="ts">
interface Props {
  tags: string[]
  quantity: number
  content: string
  showDescription?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tags: () => [],
  quantity: 100,
  content: 'blog',
  showDescription: true
})

const { articles, isLoading, error } = useArticles({
  tags: props.tags,
  quantity: props.quantity,
  content: props.content
})
</script>

<template>
  <div>
    <div v-if="error" class="text-red-500 text-center my-4">
      {{ error }}
    </div>

    <div v-else-if="isLoading" class="text-center my-4">
      Loading articles...
    </div>

    <ul v-else-if="articles.length" class="flex flex-col">
      <li
        v-for="article in articles"
        :key="article.url || article._path"
        class="w-full mb-3 article-card border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 last:mb-0"
      >
        <NuxtLink
          :to="article.url || article._path"
          :target="article.url ? '_blank' : '_self'"
          class="block hover:opacity-80 transition-opacity duration-150"
        >
          <div class="px-1">
            <h2 class="text-base">
              {{ article.title }}
            </h2>
            <p v-if="showDescription && article.description" class="text-sm mt-1 text-gray-600 dark:text-white">
              {{ article.description }}
            </p>
            <ArticleTags
              v-if="article.tags?.length"
              :tags="article.tags"
              class="mt-1"
            />
          </div>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-center text-gray-500">
      No articles found
    </p>
  </div>
</template>
