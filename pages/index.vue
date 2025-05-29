<template>
  <div>
    <div class="bg-gray-100 dark:bg-gray-800" id="homepage-header">
      <div class="container md:py-0">
        <div class="md:flex-row-reverse md:flex w-full pt-10 md:pt-40 mb-4 justify-end items-end px-0 md:px-8">
          <div class="w-full self-center dark:text-gray-50">
            <h1 class="heading leading-snug pb-4">
              Hi! <br>
              I'm <NuxtLink to="/#about" class="hover-underline-animation">Subodh Dahal</NuxtLink>
            </h1>
            <h2 class="text-xl md:text-3xl text-gray-600 dark:text-gray-50">
              Software Engineer, Automation Enthusiast,<br> Hobbyist Photographer &amp; Avid Ponderer
            </h2>
            <h3 class="mt-8 pb-10 text-xl md:text-3xl text-gray-500 dark:text-gray-50">
              From 🇳🇵, based in 🇩🇪
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container mt-10">
        <h1 class="font-bold text-2xl text-center mb-8">
          Recent Articles
        </h1>
        <BlogPosts content="blog" :tags="[]" :quantity="5" :showDescription="false" />
        <div class="text-center mt-8">
          <NuxtLink
            to="/blog"
            class="inline-block px-6 py-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All Articles →
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 dark:bg-gray-800">
      <div class="container mt-10 pt-5" id="about">
        <h1 class="font-bold text-4xl text-center mb-5 pt-5">
          About me
        </h1>
        <div class="prose max-w-none m-auto dark:text-gray-50">
          <div class="md:flex">
            <div class="w-1/2 md:w-1/3 md:mr-10 m-auto not-prose mt-5">
              <img src="/images/me.jpg" class="max-w-full h-auto" alt="Subodh Dahal" />
            </div>

            <div class="md:w-2/3">
              <ContentRenderer v-if="about" :value="about" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: about } = await useAsyncData('about', () =>
  queryCollection('about').first()
)

const title: string = 'Subodh Dahal\'s musings on software engineering, automation, photography and more'
const description: string = 'Subodh Dahal -  Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer'
const image: string = '/images/me.jpg'
const path: string = '/'
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
  ogImage: image,
  ogUrl: `https://subodhdahal.com${path}`,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image
})
</script>

<style scoped>
.heading {
  font-family: 'Source Serif Pro', serif;
  @apply text-5xl md:text-7xl mb-7 text-gray-700 dark:text-gray-50;
}
#homepage-header h1 {
  line-height: 5rem;
}
#homepage-header h2 {
  line-height: 2.6rem;
}
@media (max-width: 640px) {
  #homepage-header h1 {
    line-height: 3.5rem;
  }
  #homepage-header h2 {
    line-height: 1.8rem;
  }
}
</style>
