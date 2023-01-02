<script setup>
import { createSEOMeta } from '@/utils/seo'

const description = 'Subodh Dahal -  Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer'
const ogTitle = 'Subodh Dahal\'s musings on software engineering, automation, photography and more'
const twitterCard = 'https://subodhdahal.com/twitter-card.png'
const mySite = 'https://subodhdahal.com'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: ogTitle,
  titleTemplate: title =>
    title !== ogTitle
      ? `${title} · Subodh Dahal`
      : title,
  meta: createSEOMeta({ title: ogTitle, description, image: twitterCard, url: '' }),
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'canonical',
      href: mySite,
    },
  ],
})
</script>

<template>
  <div>
    <TheHeader />
    <NuxtPage />
    <TheFooter />
  </div>
</template>
