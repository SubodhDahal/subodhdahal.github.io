<template>
  <div class="mx-auto max-w-6xl px-4 py-10">
    <h1 class="font-bold text-2xl text-center mb-5">
      Blog Articles
    </h1>
    <BlogPosts
      content="blog"
      class="mt-10"
      :quantity="100"
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
  meta: createSEOMeta({ title, description, image, url: path }),
  link: [
    {
      rel: 'canonical',
      href: `https://subodhdahal.com${path}`,
    },
  ],
})

</script>
