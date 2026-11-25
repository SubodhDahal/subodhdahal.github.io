<script setup lang="ts">
// Search-facing name. The visible H1 and <title> lead with the phrases people
// actually search for ("instagram white border", "carousel", "no crop").
const title = 'Instagram Carousel White Border Tool (No Crop)'
const heading = 'Instagram carousel white border tool'
const description =
  'Free white border tool for Instagram carousels: fit portrait and landscape photos on one matching canvas so nothing gets cropped. No upload, no sign-up.'
const path = '/tools/instagram-carousel/'
const site = 'https://subodhdahal.com'
const url = `${site}${path}`
const screenshot = '/images/instagram-carousel-tool/carousel-tool-four-photos-loaded.png'
const postPath = '/blog/instagram-carousel-padding-tool/'

// Single source for the visible FAQ and the FAQPage structured data, so the
// two can never drift apart (Google requires the markup to match the page).
const faqs: { q: string; a: string }[] = [
  {
    q: "Why not just use Instagram's Mixed option?",
    a: "Instagram's Mixed option keeps each photo's shape, but it fills the empty space with a background that follows the app's light or dark theme, and you can't control its color or size. This tool bakes an even white border into every image, so the carousel looks the same for every viewer.",
  },
  {
    q: 'How do I post portrait and landscape photos in one carousel without cropping?',
    a: 'Add all the photos here, keep the aspect ratio on Auto, and download the ZIP. Every slide comes out at the same canvas size with the whole photo inside it, so Instagram has nothing to crop. Upload the slides in the numbered order.',
  },
  {
    q: 'What size should Instagram carousel images be?',
    a: 'Instagram stores posts at 1080 pixels wide, with an aspect ratio between 1.91:1 (1080 × 566) and 4:5 (1080 × 1350). The app also accepts 3:4 (1080 × 1440). Every slide in a carousel should share one ratio. Choose the 1080 export width here for files sized exactly for Instagram.',
  },
  {
    q: 'Are my photos uploaded anywhere?',
    a: 'No. The images are decoded, padded and encoded by your browser on your own device. Nothing is sent to a server.',
  },
  {
    q: 'How many photos can I add?',
    a: 'Up to 20, which is the most Instagram allows in one carousel. The tool also warns you when a slide is larger than 8 MB.',
  },
  {
    q: 'How wide should the white border be?',
    a: 'Padding is a percentage of the shared photo area, from 0 to 20%. Around 5% reads as a thin frame and around 10% looks like a matted gallery print. At 0% the photos still share one canvas, with white only where their shapes differ.',
  },
  {
    q: 'Should I export JPEG or PNG?',
    a: 'JPEG at 95% quality suits photos and keeps files small. PNG is lossless and better for screenshots, text or flat graphics, but the files are much larger.',
  },
  {
    q: 'Can I use a border color other than white?',
    a: 'Not yet, the padding is always white. If you want another color, open an issue on GitHub and say what you would use it for.',
  },
]

useHead({ title, link: [{ rel: 'canonical', href: url }] })
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: url,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
})
defineOgImage('SimpleBlog', { title: heading, image: screenshot })
useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage', name: title, description }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: `${site}/` },
      { name: 'Tools', item: `${site}/tools/` },
      { name: heading, item: url },
    ],
  }),
  ...faqs.map(({ q, a }) => defineQuestion({ name: q, acceptedAnswer: a })),
  {
    '@type': 'WebApplication',
    name: title,
    alternateName: ['Instagram Carousel Tools', 'Instagram white border maker', 'Instagram no crop tool'],
    description,
    url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript and a modern browser',
    isAccessibleForFree: true,
    screenshot: `${site}${screenshot}`,
    featureList: [
      'Pads every photo onto one shared canvas so Instagram does not crop it',
      'Even white border from 0 to 20%',
      'Auto aspect ratio, or fixed 4:5, 1:1, 1.91:1 or 3:4',
      'Export at original size, 1080 or 1440 px wide',
      'JPEG or PNG, downloaded as a ZIP',
      'Up to 20 slides, matching the Instagram carousel limit',
      'Runs entirely in the browser; images are never uploaded',
    ],
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    author: { '@id': `${site}/#identity` },
  },
])

const link = 'font-medium text-primary-700 underline underline-offset-2 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200'
</script>

<template>
  <main class="md:container mx-auto px-5 pt-8 pb-20">
    <h1 class="text-3xl font-serif font-bold text-secondary-800 dark:text-secondary-100">
      {{ heading }}
    </h1>
    <p class="font-sans mt-3 max-w-[60ch] text-lg leading-snug text-secondary-700 dark:text-secondary-200 text-pretty">
      Put portrait, landscape and square photos on one white canvas with an even border, so Instagram doesn't crop
      your carousel and mixed photos sit in the same frame like gallery prints.
    </p>
    <p class="mt-3 mb-8 flex max-w-[70ch] items-start gap-2 font-sans text-sm leading-relaxed text-secondary-600 dark:text-secondary-300 text-pretty">
      <svg class="mt-0.5 h-4 w-4 flex-none text-accent-600 dark:text-accent-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="10" height="6.5" rx="1.5" /><path d="M5.2 7V5.2a2.8 2.8 0 015.6 0V7" />
      </svg>
      <span>
        Free, no sign-up. Everything runs in your browser and your images never leave your device.
        This page uses Rybbit for pageview analytics only.
      </span>
    </p>
    <ClientOnly>
      <CarouselTool />
    </ClientOnly>

    <div class="blog-page !mx-0 mt-16 max-w-3xl">
      <h2 id="how-to">How to add white borders to an Instagram carousel</h2>
      <ol>
        <li>Drop your photos onto the page, or pick them from your device. Drag the slides to change their order.</li>
        <li>Leave the aspect ratio on <strong>Auto</strong>, or force 4:5, 1:1, 1.91:1 or 3:4.</li>
        <li>Move the padding slider until the border looks right. Click any slide to swipe through a preview.</li>
        <li>Choose <strong>1080</strong> as the export width for files sized exactly for Instagram, then download the ZIP.</li>
        <li>In Instagram, select the slides in their numbered order. They already share one shape, so nothing gets cropped.</li>
      </ol>

      <h2 id="auto-ratio">How Auto picks the canvas shape</h2>
      <p>
        Instagram makes every slide in a carousel the same shape and crops anything that doesn't fit. Auto looks at
        every photo in the set and picks the ratio within Instagram's 1.91:1 to 4:5 range that leaves the least
        empty space overall. Three tall photos and one wide one end up on a 4:5 canvas, with white above and below
        the wide photo. A set of mostly wide photos gets a landscape canvas instead.
      </p>
      <p>
        The canvas is the smallest one that holds every photo at its native resolution, so no photo is scaled up.
        Photos taller than 4:5 or wider than 1.91:1 get extra white on the sides or top and bottom, so they still
        fit without being cropped.
      </p>

      <h2 id="sizes">Instagram carousel sizes</h2>
      <table>
        <thead>
          <tr><th>Shape</th><th>Ratio</th><th>Size at 1080 wide</th></tr>
        </thead>
        <tbody>
          <tr><td>Portrait</td><td>4:5</td><td>1080 × 1350 px</td></tr>
          <tr><td>Tall portrait (app only)</td><td>3:4</td><td>1080 × 1440 px</td></tr>
          <tr><td>Square</td><td>1:1</td><td>1080 × 1080 px</td></tr>
          <tr><td>Landscape</td><td>1.91:1</td><td>1080 × 566 px</td></tr>
        </tbody>
      </table>
      <p>
        A carousel holds up to 20 slides. Portrait 4:5 takes up the most room in the feed on every surface, which is
        why Auto leans toward it when the set has tall photos.
      </p>

      <h2 id="faq">Questions</h2>
      <template v-for="(f, i) in faqs" :key="i">
        <h3>{{ f.q }}</h3>
        <p>{{ f.a }}</p>
      </template>

      <p>
        I built this for posting photos from hikes and trips, and wrote about why in
        <NuxtLink :to="postPath">a post about the carousel padding tool</NuxtLink>.
        More small utilities live on the <NuxtLink to="/tools/">tools page</NuxtLink>.
      </p>
    </div>

    <p class="mt-10 max-w-[70ch] border-t border-secondary-200 pt-5 font-sans text-sm leading-relaxed text-secondary-600 dark:border-secondary-700 dark:text-secondary-300 text-pretty">
      Found a bug or want a feature? Please
      <a
        href="https://github.com/SubodhDahal/subodhdahal.github.io/issues/new"
        target="_blank"
        rel="noopener"
        :class="link"
      >open an issue on GitHub</a>.
    </p>
  </main>
</template>
