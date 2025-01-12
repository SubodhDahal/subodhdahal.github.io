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
}

const props = withDefaults(defineProps<Props>(), {
  tags: () => [],
  quantity: 100,
  content: 'blog'
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

    <ul v-else-if="articles.length" class="flex flex-wrap">
      <li
        v-for="article in articles"
        :key="article.url || article._path"
        class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 mb-6 article-card"
      >
        <NuxtLink
          :to="article.url || article._path"
          :target="article.url ? '_blank' : '_self'"
          class="md:flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
        >
          <img
            v-if="article.image"
            class="w-full md:w-48 xxlmin:w-1/2 xxlmax:w-full h-48 mx-auto object-cover"
            :src="article.image"
            :alt="article.title"
          >

          <div class="p-0 pt-4 md:p-6 md:pt-0 xxlmin:w-1/2 xxlmax:w-full">
            <h2 class="text-2xl font-bold">
              {{ article.title }}
            </h2>
            <p v-if="article.description" class="text-gray-600 dark:text-white">
              {{ article.description }}
            </p>
            <ArticleTags
              v-if="article.tags?.length"
              :tags="article.tags"
              class="mt-2"
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
