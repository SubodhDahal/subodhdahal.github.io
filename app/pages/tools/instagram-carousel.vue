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
    <p class="font-sans mt-3 max-w-[60ch] text-lg leading-snug text-secondary-700 dark:text-secondary-200 text-pretty">
      Pad every image onto one white canvas so Instagram doesn't crop or resize your carousel.
    </p>
    <p class="mt-3 mb-8 flex max-w-[70ch] items-start gap-2 font-sans text-sm leading-relaxed text-secondary-600 dark:text-secondary-300 text-pretty">
      <svg class="mt-0.5 h-4 w-4 flex-none text-accent-600 dark:text-accent-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="10" height="6.5" rx="1.5" /><path d="M5.2 7V5.2a2.8 2.8 0 015.6 0V7" />
      </svg>
      <span>
        Everything runs in your browser and your images never leave your device.
        This page uses Rybbit for pageview analytics only.
      </span>
    </p>
    <ClientOnly>
      <CarouselTool />
    </ClientOnly>
    <p class="mt-10 max-w-[70ch] border-t border-secondary-200 pt-5 font-sans text-sm leading-relaxed text-secondary-600 dark:border-secondary-700 dark:text-secondary-300 text-pretty">
      Found a bug or want a feature? Please
      <a
        href="https://github.com/SubodhDahal/subodhdahal.github.io/issues/new"
        target="_blank"
        rel="noopener"
        class="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200"
      >open an issue on GitHub</a>.
    </p>
  </main>
</template>
