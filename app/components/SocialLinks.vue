<template>
  <ul
    class="self-center no-prose list-none"
    :class="[
      $colorMode.preference === 'dark' ? 'fill-secondary-50' : 'fill-secondary-700',
      isHero ? 'flex gap-4' : 'flex flex-wrap justify-center',
    ]"
  >
    <li>
      <a
        href="https://www.linkedin.com/in/subodhdahal"
        title="LinkedIn"
        aria-label="LinkedIn"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
      >
        <IconLinkedIn
          :class="[
            isHero
              ? 'w-6 h-6 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-secondary-700',
          ]"
        />
      </a>
    </li>
    <li>
      <a
        href="https://www.xing.com/profile/Subodh_Dahal"
        title="Xing"
        aria-label="Xing"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
      >
        <IconXing
          :class="[
            isHero
              ? 'w-6 h-6 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-secondary-700',
          ]"
        />
      </a>
    </li>
    <li>
      <a
        href="https://github.com/SubodhDahal"
        title="GitHub"
        aria-label="GitHub"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
      >
        <IconGitHub
          :class="[
            isHero
              ? 'w-6 h-6 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-secondary-700',
          ]"
        />
      </a>
    </li>
    <li>
      <a
        href="https://stackoverflow.com/users/1083422/sub0dh"
        title="Stackoverflow"
        aria-label="Stack Overflow"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
      >
        <IconStackOverflow
          :class="[
            isHero
              ? 'w-6 h-6 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-secondary-700',
          ]"
        />
      </a>
    </li>
    <li>
      <a
        href="https://instagram.com/wanderluster_subodh"
        title="Instagram"
        aria-label="Instagram"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
      >
        <IconInstagram
          :class="[
            isHero
              ? 'w-6 h-6 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-secondary-700',
          ]"
        />
      </a>
    </li>
    <li>
      <a href="/rss.xml" title="RSS Feed" aria-label="RSS Feed" rel="alternate" class="inline-flex items-center justify-center min-h-[44px] min-w-[44px]">
        <IconRSS
          :class="[
            isHero
              ? 'w-6 h-6 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-secondary-700',
          ]"
        />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import IconRSS from "~/components/icon/IconRSS.vue";

defineProps<{
  isHero?: boolean;
}>();
</script>

<style scoped>
li {
  display: inline-block;
}

a {
  @apply transition-colors;
}
</style>
