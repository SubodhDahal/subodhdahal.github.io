<template>
  <div>
    <div class="relative overflow-hidden bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-900" id="homepage-header">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-30 dark:opacity-25 background-pattern"></div>

      <div class="container relative">
        <!-- Two Column Layout -->
        <div class="md:flex md:items-center md:justify-between md:gap-12 min-h-[65vh] py-12">
          <!-- Left Column: Content -->
          <div class="w-full md:w-3/5 space-y-6">
            <div class="animate-fade-in space-y-5">
              <h1 class="heading">
                Hi! I'm <NuxtLink to="/#about" class="hover-highlight">Subodh Dahal</NuxtLink>.
              </h1>
              <h2 class="font-serif text-2xl md:text-3xl font-bold text-secondary-800 dark:text-secondary-50 leading-tight tracking-tight">
                Engineering Manager
              </h2>
              <p class="font-sans text-sm md:text-base text-secondary-500 dark:text-secondary-400">
                From Bhaktapur <span aria-hidden="true">🇳🇵</span><span class="mx-2 text-secondary-300 dark:text-secondary-600" aria-hidden="true">·</span>Based in Stuttgart <span aria-hidden="true">🇩🇪</span>
              </p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 max-w-xl font-serif italic text-base md:text-lg text-secondary-600 dark:text-secondary-200">
                <li>Software Engineer</li>
                <li>Engineering Leader</li>
                <li>Automation Enthusiast</li>
                <li>Photographer &amp; Explorer</li>
              </ul>
            </div>

            <!-- Social Links -->
            <div class="animate-fade-in-delay">
              <SocialLinks :isHero="true" />
            </div>
          </div>

          <!-- Right Column: Image -->
          <div class="w-1/2 md:w-1/3 mx-auto md:mx-0 mt-8 md:mt-0 animate-fade-in">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full transform -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>
              <img
                src="/images/me.jpg"
                alt="Subodh Dahal"
                width="320"
                height="320"
                fetchpriority="high"
                class="relative rounded-full w-full h-auto transform transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-cue">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-400 dark:text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
    <div class="bg-white dark:bg-secondary-800 pt-20 pb-16">
      <div class="container">
        <div class="relative mb-8">
          <h2 class="text-3xl font-serif font-bold text-center text-secondary-800 dark:text-secondary-100">
            Recent Articles
          </h2>
          <div class="absolute w-24 h-1 bg-primary-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </div>
        <div class="mb-2">
          <BlogPosts content="blog" :tags="[]" :quantity="5" :showDescription="false" />
          <div class="text-center mt-2">
            <NuxtLink
              to="/blog/"
              class="inline-block text-primary-600 dark:text-primary-400 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
            >
              View All Articles
              <span aria-hidden="true"> →</span>
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
    {
      rel: 'preload',
      as: 'image',
      href: image,
      fetchpriority: 'high',
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
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700;
  @apply text-secondary-700 dark:text-secondary-50;
  font-size: 3rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .heading {
    font-size: 4.5rem;
  }
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

.scroll-cue {
  animation: scrollCue 2.4s ease-in-out infinite;
}

@keyframes scrollCue {
  0%,
  100% {
    transform: translate(-50%, 0);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -6px);
    opacity: 1;
  }
}

.background-pattern {
  background-image: url('/images/bg.png');
  background-repeat: repeat;
  background-position: center;
}
</style>
