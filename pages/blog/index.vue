<template>
  <div class="container blog-page m-10">
    <h1 class="font-bold text-4xl text-center mb-5">
      Blog Articles
    </h1>
    <Tags section="blog" @tagsSelected="setSelectedTags" />
    <BlogPosts content="blog" class="mt-10" :tags="selectedTags" :quantity="100" />
  </div>
</template>

<script setup lang="ts">
const title: string = 'Blog posts'
const description: string = 'Blog posts by Subodh Dahal'
const image: string = ''
const path: string = '/blog'
useMeta({
  title: 'Blog posts',
  description: 'Blog posts by Subodh Dahal',
  image: '',
  canonical: 'https://subodhdahal.com/blog',
  openGraph: {
    type: 'website',
    url: 'https://subodhdahal.com/blog',
    title: 'Blog posts',
    description: 'Blog posts by Subodh Dahal',
    image: ''
  },
  twitter: {
    card: 'summary',
    site: '@SubodhDahal',
    title: 'Blog posts',
    description: 'Blog posts by Subodh Dahal',
    image: ''
  }
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
