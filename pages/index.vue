<template>
  <div>
    <div class="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" id="homepage-header">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-30 dark:opacity-25 background-pattern"></div>

      <div class="container relative">
        <!-- Two Column Layout -->
        <div class="md:flex md:items-center md:justify-between md:gap-12 min-h-[65vh] py-12">
          <!-- Left Column: Content -->
          <div class="w-full md:w-3/5 space-y-6 md:space-y-8">
            <div class="animate-fade-in">
              <h1 class="heading leading-tight mb-4">
                Hi! I'm <NuxtLink to="/#about" class="hover-highlight">Subodh Dahal</NuxtLink>.
              </h1>
                <p class="text-2xl md:text-3xl text-gray-600 dark:text-gray-100 mb-8">
                I build software solutions that automate and simplify.
              </p>
              <h2 class="text-2xl md:text-4xl mt-6 text-gray-700 dark:text-gray-50 font-semibold">
                Engineering Manager
              </h2>
              <div class="text-xl md:text-2xl font-light mt-3 text-gray-600 dark:text-gray-100">
                Software Engineer • Automation Enthusiast •<br>
                Hobbyist Photographer • Avid explorer
              </div>
              <h3 class="mt-8 text-xl md:text-2xl text-gray-500 dark:text-gray-200">
                <div class="flex items-center gap-2">
                  <span>From Bhaktapur</span>
                  <span class="text-2xl">🇳🇵</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <span>Based in Stuttgart</span>
                  <span class="text-2xl">🇩🇪</span>
                </div>
              </h3>
            </div>

            <!-- Social Links -->
            <div class="mt-8 animate-fade-in-delay">
              <SocialLinks :isHero="true" />
            </div>

            <!-- CTA Button -->
            <div class="pt-4 animate-fade-in-delay">
              <NuxtLink to="/#about" class="inline-block text-lg px-6 py-2 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-md transition-colors">
                About Me →
              </NuxtLink>
            </div>
          </div>

          <!-- Right Column: Image -->
          <div class="w-1/2 md:w-1/3 mx-auto md:mx-0 mt-8 md:mt-0 animate-fade-in">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full transform -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>
              <img
                src="/images/me.jpg"
                alt="Subodh Dahal"
                class="relative rounded-full shadow-xl w-full h-auto transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
    <div class="bg-white dark:bg-gray-800 pt-20 pb-16">
      <div class="container">
        <div class="relative mb-8">
          <h2 class="text-3xl font-serif font-bold text-center text-gray-800 dark:text-gray-100">
            Recent Articles
          </h2>
          <div class="absolute w-24 h-1 bg-primary-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </div>
        <div class="mb-2">
          <BlogPosts content="blog" :tags="[]" :quantity="5" :showDescription="false" />
          <div class="text-center mt-2">
            <NuxtLink
              to="/blog"
              class="inline-block text-primary-600 dark:text-primary-400 hover:opacity-80"
            >
              View All Articles →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <AboutSection />
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

<style scoped lang="postcss">
.heading {
  font-family: 'Source Serif Pro', serif;
  @apply text-5xl md:text-7xl mb-7 text-gray-700 dark:text-gray-50;
}

.hover-highlight {
  @apply relative inline-block;
}

.hover-highlight::after {
  @apply absolute bottom-0 left-0 w-full scale-x-0 origin-bottom-right transition-transform duration-300 ease-out;
  content: '';
  height: 0.15em;
  @apply bg-primary-600 dark:bg-primary-400;
}

.hover-highlight:hover::after {
  @apply scale-x-100 origin-bottom-left;
}

#homepage-header h1 {
  line-height: 5rem;
}

#homepage-header h2 {
  line-height: 2.6rem;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  opacity: 0;
}

.background-pattern {
  background-image: url('/images/bg.png');
  background-repeat: repeat;
  background-position: center;
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
