<template>
  <div
    class="self-center no-prose"
    :class="[
      $colorMode.preference === 'dark' ? 'fill-gray-50' : 'fill-gray-700',
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
      >
        <IconLinkedIn
          :class="[
            isHero
              ? 'w-6 h-6 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-gray-700',
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
      >
        <IconXing
          :class="[
            isHero
              ? 'w-6 h-6 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-gray-700',
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
      >
        <IconGitHub
          :class="[
            isHero
              ? 'w-6 h-6 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-gray-700',
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
      >
        <IconStackOverflow
          :class="[
            isHero
              ? 'w-6 h-6 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-gray-700',
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
      >
        <IconInstagram
          :class="[
            isHero
              ? 'w-6 h-6 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-gray-700',
          ]"
        />
      </a>
    </li>
    <li>
      <a href="/rss.xml" title="RSS Feed" aria-label="RSS Feed" rel="alternate">
        <IconRSS
          :class="[
            isHero
              ? 'w-6 h-6 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'
              : 'h-8 w-8 mr-2 text-gray-700',
          ]"
        />
      </a>
    </li>
  </div>
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
