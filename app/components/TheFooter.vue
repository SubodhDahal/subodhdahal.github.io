<template>
  <footer
    class="py-8 flex flex-col justify-center items-center text-center gap-6 bg-secondary-100 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700"
  >
    <IconWordmark class="h-10 w-auto text-secondary-800 dark:text-secondary-100" />
    <nav aria-label="Footer" class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
      <NuxtLink to="/blog/" class="link-underline">Blog</NuxtLink>
      <NuxtLink to="/library/" class="link-underline">Library</NuxtLink>
      <a href="/#about" class="link-underline">About</a>
    </nav>
    <SocialLinks />
  </footer>
</template>
