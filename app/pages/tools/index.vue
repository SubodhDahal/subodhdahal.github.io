<script setup lang="ts">
const title = 'Free browser tools'
const description = 'Free, small browser-based tools I built for myself. They run on your device, with no upload and no sign-up.'
const path = '/tools/'
const url = `https://subodhdahal.com${path}`

const tools = [
  {
    name: 'Instagram carousel white border tool',
    description:
      "Put portrait and landscape photos on one white canvas with an even border so Instagram doesn't crop your carousel. Runs in your browser.",
    to: '/tools/instagram-carousel/',
  },
]

useHead({ title, link: [{ rel: 'canonical', href: url }] })
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: url,
  twitterCard: 'summary_large_image',
})
defineOgImage('SimpleBlog', { title, description })
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage', name: title, description }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: 'https://subodhdahal.com/' },
      { name: title, item: url },
    ],
  }),
])
</script>

<template>
  <div class="container my-10">
    <div class="mb-8">
      <h1 class="text-3xl font-serif font-bold text-center text-secondary-800 dark:text-secondary-100">
        Tools
      </h1>
      <div class="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
      <p class="font-serif italic text-center text-secondary-600 dark:text-secondary-300 mt-4">
        {{ description }}
      </p>
    </div>
    <ul
      class="grid gap-6 list-none p-0 mx-auto"
      :class="tools.length > 1 ? 'sm:grid-cols-2' : 'max-w-xl'"
    >
      <li v-for="tool in tools" :key="tool.to">
        <NuxtLink
          :to="tool.to"
          class="block h-full rounded-lg border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800 p-6 transition-colors hover:border-primary-500"
        >
          <h2 class="font-serif text-lg font-bold text-secondary-800 dark:text-secondary-50">
            {{ tool.name }}
          </h2>
          <p class="font-sans text-sm mt-2 leading-relaxed text-secondary-600 dark:text-secondary-300">
            {{ tool.description }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
