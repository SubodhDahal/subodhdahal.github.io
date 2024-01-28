<script setup>
useMeta({
  title: 'Subodh Dahal\'s musings on software engineering, automation, photography and more',
  description: 'Subodh Dahal - Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://subodhdahal.com' },
  ],
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@SubodhDahal' },
    { name: 'twitter:title', content: 'Subodh Dahal\'s musings on software engineering, automation, photography and more' },
    { name: 'twitter:description', content: 'Subodh Dahal - Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer' },
    { name: 'twitter:image', content: 'https://subodhdahal.com/twitter-card.png' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://subodhdahal.com' },
    { property: 'og:title', content: 'Subodh Dahal\'s musings on software engineering, automation, photography and more' },
    { property: 'og:description', content: 'Subodh Dahal - Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer' },
    { property: 'og:image', content: 'https://subodhdahal.com/twitter-card.png' }
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
