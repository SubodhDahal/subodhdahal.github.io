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
      <nav aria-label="Topics" class="mt-6 flex flex-wrap justify-center gap-2 font-sans text-sm">
        <NuxtLink
          v-for="t in topics"
          :key="t.path"
          :to="`${t.path}/`"
          class="rounded-full border border-secondary-200 px-3 py-1 text-secondary-700 transition-colors hover:border-primary-500 hover:text-primary-700 dark:border-secondary-700 dark:text-secondary-200 dark:hover:text-primary-300"
        >
          {{ t.title }}
        </NuxtLink>
      </nav>
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
const { data: topics } = await useAsyncData('topics-nav', () =>
  queryCollection('topics').select('title', 'path', 'order').order('order', 'ASC').all(),
)
const title: string = 'Blog: software, self-hosting and travel notes'
const description: string = 'Notes by Subodh Dahal on software, self-hosting, NixOS, automation, developer tools, photography and hiking.'
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

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage', name: title, description }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: 'https://subodhdahal.com/' },
      { name: 'Blog', item: `https://subodhdahal.com${path}` },
    ],
  }),
])

</script>
