<template>
  <footer
    class="py-8 flex flex-col justify-center items-center text-center gap-6 bg-secondary-100 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700"
  >
    <IconWordmark class="h-10 w-auto text-secondary-800 dark:text-secondary-100" />
    <nav aria-label="Footer" class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
      <NuxtLink to="/blog/" class="link-underline">Blog</NuxtLink>
      <NuxtLink to="/library/" class="link-underline">Library</NuxtLink>
      <NuxtLink to="/photography/" class="link-underline">Photography</NuxtLink>
      <NuxtLink to="/tools/" class="link-underline">Tools</NuxtLink>
      <a href="/#about" class="link-underline">About</a>
    </nav>
    <SocialLinks />
    <nav
      aria-label="Legal"
      class="-mt-4 flex gap-x-6 font-sans text-xs text-secondary-600 dark:text-secondary-300"
    >
      <NuxtLink to="/impressum/" class="link-hit hover:text-primary-700 dark:hover:text-primary-300">
        <span class="link-underline">Impressum</span>
      </NuxtLink>
      <NuxtLink to="/privacy/" class="link-hit hover:text-primary-700 dark:hover:text-primary-300">
        <span class="link-underline">Datenschutz / Privacy</span>
      </NuxtLink>
    </nav>
  </footer>
</template>
