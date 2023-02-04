<template>
  <div>
    <div class="bg-gray-100">
      <div class="container py-2 md:py-0">
        <div class="md:flex-row-reverse md:flex w-full pt-2 md:pt-10 md:pt-20 mb-4">
          <object class="w-40 md:w-2/5 mx-auto md:mt-0" type="image/svg+xml" data="/avatar_animated.svg" />
          <div class="w-full md:w-3/5 self-center">
            <h1 class="heading leading-snug">
              Hi! <br>
              I'm <NuxtLink to="/about" class="hover-underline-animation">Subodh Dahal</NuxtLink>
            </h1>
            <h2 class="text-2xl md:text-4xl text-gray-600 leading-snug">
              Software Engineer, Automation Enthusiast,<br> Hobbyist Photographer &amp; Avid Ponderer
            </h2>
            <h3 class="mt-8 mb-2 text-xl md:text-3xl text-gray-500">
              From 🇳🇵, based in 🇩🇪
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-10">
      <BlogPosts />
    </div>
  </div>
</template>

<script setup lang="ts">
const title: string = 'Subodh Dahal\'s musings on software engineering, automation, photography and more'
const description: string = 'Subodh Dahal -  Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer'
const image: string = ''
const path: string = '/'
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

<style scoped>
.heading {
  font-family: 'Source Serif Pro', serif;
  @apply text-5xl md:text-7xl mb-7 text-gray-700;
}
</style>
