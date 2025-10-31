<template>
  <div class="container my-10">
    <div class="relative mb-8">
      <h1 class="text-3xl font-serif font-bold text-center text-gray-800 dark:text-gray-100">
        Blog Articles
      </h1>
      <div class="absolute w-24 h-1 bg-primary-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
    </div>
    <BlogPosts
      content="blog"
      class="mt-6"
      :quantity="100"
      key="blog-list"
    />
  </div>
</template>

<script setup lang="ts">
const title: string = 'Blog posts'
const description: string = 'Blog posts by Subodh Dahal'
const image: string = ''
const path: string = '/blog'
useHead({
  title,
  link: [
    {
      rel: 'canonical',
      href: `https://subodhdahal.com${path}`,
    },
  ],
})

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image || undefined,
  ogUrl: `https://subodhdahal.com${path}`,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image || undefined
})

</script>
