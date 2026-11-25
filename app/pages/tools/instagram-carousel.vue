<script setup lang="ts">
const title = 'Instagram Carousel Tools'
const description =
  "Pad every image onto one shared canvas so Instagram doesn't crop or resize your carousel. Runs in your browser; your images are never uploaded."
const path = '/tools/instagram-carousel/'
const url = `https://subodhdahal.com${path}`

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
  defineWebPage({ name: title, description }),
  {
    '@type': 'SoftwareApplication',
    name: title,
    description,
    url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (web browser)',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Subodh Dahal' },
  },
])
</script>

<template>
  <main class="md:container mx-auto px-5 py-8">
    <h1 class="text-3xl font-serif font-bold text-secondary-800 dark:text-secondary-100">
      {{ title }}
    </h1>
    <p class="font-sans mt-3 mb-6 max-w-[70ch] text-secondary-600 dark:text-secondary-300">
      Pad every image onto one white canvas so Instagram doesn't crop or resize your carousel.
      Your images never leave your device: everything runs in your browser and nothing is
      uploaded. This page uses Rybbit for pageview analytics only, never your images.
    </p>
    <ClientOnly>
      <CarouselTool />
    </ClientOnly>
  </main>
</template>
