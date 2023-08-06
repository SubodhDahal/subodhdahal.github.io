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
    <TheHeader @toggle-dark-mode="toggleDarkMode" />
    <NuxtPage />
    <TheFooter />
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  },
  methods: {
    toggleDarkMode() {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      } else {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      }
    },
  },
};
</script>
