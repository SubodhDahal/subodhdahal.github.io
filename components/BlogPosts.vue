<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const props = defineProps<{
  tags: string[]
  quantity: number
  content: string
}>()
let articles: Ref<Omit<ParsedContent, "body">[] | null> = ref([])

articles = await getArticles(props.tags, props.quantity, props.content)

watch(() => props.tags, async (newTags) => {
  console.log('Tags changed:', newTags)
  articles = await getArticles(newTags, props.quantity, props.content)
})

async function getArticles (tags: string[] = [], quantity: number = 100, content: string) {
  console.log('Fetching articles with tags:', tags)
  console.log('Query content:', queryContent(content)
      .where({ tags: { $contains: tags } })
      .without('body')
      .sort({ postDate: -1 })
      .limit(quantity)
      .find())
  const { data: articles } = await useAsyncData('articles-home', () => queryContent(content)
      .where({ tags: { $contains: tags } })
      .without('body')
      .sort({ postDate: -1 })
      .limit(quantity)
      .find()
  )
  console.log('Fetched articles:', articles)
  return articles
}
</script>

<template>
  <ul class="flex flex-wrap">
    <li
      v-for="article of articles"
      :key="article.url  || article._path"
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
        >

        <div class="p-0 pt-4 md:p-6 md:pt-0 xxlmin:w-1/2 xxlmax:w-full">
          <h2 class="text-2xl font-bold">
            {{ article.title }}
          </h2>
          <p class="text-gray-600 dark:text-white">
            {{ article.description }}
          </p>
          <ArticleTags :tags="article.tags" class="mt-2" />
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
