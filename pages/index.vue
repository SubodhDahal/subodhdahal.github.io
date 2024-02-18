<template>
  <div>
    <div class="bg-gray-100 dark:bg-gray-800" id="homepage-header">
      <div class="container md:py-0">
        <div class="md:flex-row-reverse md:flex w-full pt-2 md:pt-40 mb-4 justify-end items-end px-8 md:px-8">
          <div class="w-full md:w-3/5 self-center dark:text-gray-50">
            <h1 class="heading leading-snug pb-4">
              Hi! <br>
              I'm <NuxtLink to="/#about" class="hover-underline-animation">Subodh Dahal</NuxtLink>
            </h1>
            <h2 class="text-2xl md:text-3xl text-gray-600 dark:text-gray-50">
              Software Engineer, Automation Enthusiast,<br> Hobbyist Photographer &amp; Avid Ponderer
            </h2>
            <h3 class="mt-8 mb-10 text-xl md:text-3xl text-gray-500 dark:text-gray-50">
              From 🇳🇵, based in 🇩🇪
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container mt-10">
        <h1 class="font-bold text-4xl text-center mb-10">
          Recent Articles
        </h1>
        <BlogPosts content="blog" :tags=[] :quantity="6" />
      </div>
    </div>
    <div class="bg-gray-100 dark:bg-gray-800">
      <div class="container mt-10 pt-5" id="about">
        <h1 class="font-bold text-4xl text-center mb-5 pt-5">
          About me
        </h1>
        <div class="prose max-w-none md:w-3/5 m-auto dark:text-gray-50">
          <div class="md:flex">
            <div class="w-1/2 md:w-1/3 md:mr-10 m-auto not-prose mt-5">
              <img src="/images/me.jpg" class="max-w-full h-auto" alt="Subodh Dahal" />
            </div>

            <!-- TODO: fix not reading from markdown file -->
            <!-- <ContentDoc path="about" class="md:w-2/3" /> -->
            <div class="md:w-2/3">
              <div>
                <p>Hi! I'm Subodh Dahal, an experienced software engineer with a strong passion for technology and a growing interest in Large Language Models (LLMs).</p>

                <p>Originally from Nepal, I've been in Germany since 2016, where I earned a Master's in Information Engineering, specializing in Intelligent Systems and Machine Learning.</p>

                <p>Over a decade, I've become skilled in various programming languages like Python, Javascript, Typescript, NodeJS, and PHP. I have a successful track record of delivering innovative solutions.</p>

                <p>As a team lead and mentor, I prioritize effective communication and teamwork for success. I'm dedicated to making technology accessible and supporting the open-source community.</p>

                <p>In my spare time, I enjoy exploring nature, photography, and diving into science fiction for inspiration.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title: string = 'Subodh Dahal\'s musings on software engineering, automation, photography and more'
const description: string = 'Subodh Dahal -  Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer'
const image: string = '/images/me.jpg'
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
  @apply text-5xl md:text-7xl mb-7 text-gray-700 dark:text-gray-50;
}
#homepage-header h1 {
  line-height: 5rem;
}
#homepage-header h2 {
  line-height: 2.6rem;
}
</style>
