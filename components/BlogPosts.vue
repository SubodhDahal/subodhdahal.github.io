<script setup lang="ts">
const { data: articles } = await useAsyncData('articles-home',
  () => queryContent('blog')
    // .where({ published: { $ne: false } })
    .without('body')
    .sort({ postDate: -1 })
    .limit(6)
    .find()
)
</script>

<template>
  <div class="blog-page">
    <h1 class="font-bold text-4xl text-center mb-10">
      Blog Articles
    </h1>
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
            <p class="text-gray-600">
              {{ article.description }}
            </p>
            <ArticleTags :tags="article.tags" class="mt-4" />
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
