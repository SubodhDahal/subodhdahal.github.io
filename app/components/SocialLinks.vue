<template>
  <ul
    class="self-center no-prose list-none flex"
    :class="isHero ? 'gap-4' : 'flex-wrap justify-center'"
  >
    <li>
      <a
        href="https://www.linkedin.com/in/subodhdahal"
        title="LinkedIn"
        aria-label="LinkedIn"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
      >
        <IconLinkedIn :class="iconClass" />
      </a>
    </li>
    <li>
      <a
        href="https://www.xing.com/profile/Subodh_Dahal"
        title="Xing"
        aria-label="Xing"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
      >
        <IconXing :class="iconClass" />
      </a>
    </li>
    <li>
      <a
        href="https://github.com/SubodhDahal"
        title="GitHub"
        aria-label="GitHub"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
      >
        <IconGitHub :class="iconClass" />
      </a>
    </li>
    <li>
      <a
        href="https://stackoverflow.com/users/1083422/sub0dh"
        title="Stackoverflow"
        aria-label="Stack Overflow"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
      >
        <IconStackOverflow :class="iconClass" />
      </a>
    </li>
    <li>
      <a
        href="https://instagram.com/wanderluster_subodh"
        title="Instagram"
        aria-label="Instagram"
        target="_blank"
        rel="me noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
      >
        <IconInstagram :class="iconClass" />
      </a>
    </li>
    <li>
      <a
        href="/rss.xml"
        title="RSS Feed"
        aria-label="RSS Feed"
        rel="alternate"
        class="inline-flex items-center justify-center min-h-[44px] min-w-[44px] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
      >
        <IconRSS :class="iconClass" />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import IconRSS from "~/components/icon/IconRSS.vue";

const props = withDefaults(
  defineProps<{
    isHero?: boolean;
  }>(),
  { isHero: false }
);

const iconClass = computed(() =>
  props.isHero
    ? "w-6 h-6 fill-secondary-600 dark:fill-secondary-400 hover:fill-primary-600 dark:hover:fill-primary-400 transition-colors"
    : "h-8 w-8 mr-2 fill-secondary-700 dark:fill-secondary-300 hover:fill-primary-600 dark:hover:fill-primary-400 transition-colors"
);
</script>

<style scoped>
li {
  display: inline-block;
}
</style>
