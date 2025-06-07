<template>
  <div class="container py-10">
    <h1 class="font-bold text-2xl text-center mb-5">
      Blog Articles
    </h1>
    <BlogPosts
      content="blog"
      class="mt-10"
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
