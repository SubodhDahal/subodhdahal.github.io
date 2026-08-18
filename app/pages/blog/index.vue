<template>
  <div class="container my-10">
    <div class="mb-8">
      <h1 class="text-3xl font-serif font-bold text-center text-secondary-800 dark:text-secondary-100">
        Blog Articles
      </h1>
      <div class="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
      <p class="font-serif italic text-center text-secondary-600 dark:text-secondary-300 mt-4">
        Notes on software, automation, and the tools I build with.
      </p>
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
const path: string = '/blog/'
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
