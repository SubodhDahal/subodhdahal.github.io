<script setup>
import { parseURL } from "ufo";
import { computed } from "vue";
import { useSiteConfig } from "#site-config/app/composables";
const props = defineProps({
  colorMode: { type: String, required: false, default: "light" },
  title: { type: String, required: false, default: "title" },
  website: { type: String, required: false },
  image: { type: String, required: false }
});
const website = computed(() => {
  return props.website || parseURL(useSiteConfig().url).host;
});
</script>

<template>
  <div class="h-full w-full flex relative overflow-hidden bg-neutral-50 dark:bg-neutral-900">
    <!-- Accent bar -->
    <div class="absolute left-0 top-0 bottom-0 w-3 bg-primary-500" />

    <!-- Subtle pattern -->
    <div
      class="absolute inset-0"
      style="opacity: 0.015; display: block; backgroundImage: radial-gradient(rgb(156 163 175) 1px, transparent 1px); backgroundSize: 24px 24px;"
    />

    <!-- Decorative circles -->
    <div
      class="absolute rounded-full bg-primary-500"
      style="top: -100px; right: -50px; width: 300px; height: 300px; opacity: 0.04;"
    />
    <div
      class="absolute rounded-full bg-primary-500"
      style="bottom: -50px; right: 200px; width: 200px; height: 200px; opacity: 0.03;"
    />

    <div class="flex w-full h-full relative" style="padding: 56px 48px;">
      <!-- Left column: wordmark + title + website -->
      <div class="flex flex-col justify-between flex-1 h-full min-w-0" style="padding-right: 48px;">
        <span style="display: block; font-family: 'Newsreader', Georgia, serif; font-style: italic; font-weight: 600; font-size: 44px; line-height: 1; color: #1F2937; letter-spacing: -0.01em; margin-bottom: 8px;">Subodh Dahal</span>
        <div style="display: block; width: 64px; height: 4px; background-color: #F43F5E; margin-bottom: 24px;" />
        <h1
          class="font-bold text-neutral-800 dark:text-neutral-100 leading-[1.1] tracking-tight"
          style="display: block; font-size: 48px; line-clamp: 4; text-overflow: ellipsis; text-wrap: balance;"
        >
          {{ title }}
        </h1>
        <div class="flex items-center" style="display: flex; align-items: center; gap: 12px;">
          <div class="rounded-full bg-primary-500" style="width: 12px; height: 12px;" />
          <p
            class="font-bold text-neutral-500 dark:text-neutral-400"
            style="display: block; font-size: 24px; line-clamp: 1; text-overflow: ellipsis;"
          >
            {{ website }}
          </p>
        </div>
      </div>

      <!-- Right column: featured image (optional) -->
      <div
        v-if="image"
        class="h-full flex items-center"
        style="width: 440px; flex-shrink: 0;"
      >
        <div
          :style="{
            display: 'block',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '440px',
            borderRadius: '12px',
            border: '4px solid #ffffff'
          }"
        />
      </div>
    </div>
  </div>
</template>
