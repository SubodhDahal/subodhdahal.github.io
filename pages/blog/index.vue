<template>
  <div class="container blog-page">
    <BlogPosts class="mt-10" />
    <BlogTags class="mb-10" />
  </div>
</template>

<script setup lang="ts">
const title: string = 'Blog posts'
const description: string = 'Blog posts by Subodh Dahal'
const image: string = ''
const path: string = '/blog'
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
</script>

<style>
  .blog-page h1, .blog-page h2, .blog-page h3 {
    font-family: 'Source Serif Pro', serif;
    font-weight: bold;
  }
  .article-title {
    @apply text-3xl mb-3;
  }
</style>
