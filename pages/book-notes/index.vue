<template>
  <div class="container blog-page m-10">
    <h1 class="font-bold text-4xl text-center mb-5">
      Book Notes
    </h1>
    <Tags section="book-notes" @tagsSelected="setSelectedTags" />
    <ArticlePosts content="book-notes" class="mt-10" :tags="selectedTags" :quantity="100" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createSEOMeta, useHead } from '@/utils/seo'

const title: string = 'Book Notes'
const description: string = 'Notes on books read by Subodh Dahal'
const image: string = ''
const path: string = '/book-notes'

useHead({
  title,
  meta: createSEOMeta({ title, description, image, url: path }),
  link: [
    {
      rel: 'canonical',
      href: `https://subodhdahal.com${path}`,
    },
  ],
})

let selectedTags: Ref<string[]> = ref([])
const setSelectedTags = (tags: string[]) => { selectedTags.value = tags }
</script>

<style>
  .blog-page h1, .blog-page h2, .blog-page h3 {
    font-weight: bold;
  }
  .article-title {
    @apply text-3xl mb-3;
  }
</style>
