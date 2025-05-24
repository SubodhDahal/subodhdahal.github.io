<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

interface Article extends Omit<ParsedContent, 'body'> {
  url?: string
  _path?: string
  title: string
  description?: string
  image?: string
  tags?: string[]
  postDate: string
}

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

const articles = ref<Article[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function getArticles(tags: string[] = [], quantity: number = 100, content: string): Promise<Article[]> {
  try {
    const query = queryContent(content)
      .where({
        published: { $ne: false },
        ...(tags.length > 0 && { tags: { $contains: tags } })
      })
      .without('body')
      .sort({ postDate: -1 })
      .limit(quantity)

    const { data } = await useAsyncData(`articles-${tags.join('-')}`, () => query.find())
    return data.value as Article[] || []
  } catch (e) {
    console.error('Error fetching articles:', e)
    error.value = 'Failed to fetch articles'
    return []
  }
}

// Initial fetch
const fetchArticles = async () => {
  isLoading.value = true
  error.value = null
  try {
    articles.value = await getArticles(props.tags, props.quantity, props.content)
  } catch (e) {
    error.value = 'Failed to fetch articles'
  } finally {
    isLoading.value = false
  }
}

await fetchArticles()

// Watch for tag changes with debounce
watch(() => props.tags, async (newTags) => {
  await fetchArticles()
}, { deep: true })
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
