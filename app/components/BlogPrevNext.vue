<script setup lang="ts">
import type { PrevNext } from '~/types'

interface Props {
  currentPath: string
  content?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: 'blog'
})

const { getAdjacentArticles } = useArticles({ content: props.content })
const { prev, next } = await getAdjacentArticles(props.currentPath)
</script>

<template>
  <div v-if="prev || next" class="flex flex-col sm:flex-row justify-between my-8 border-t border-secondary-200 dark:border-secondary-700">
    <div v-if="prev" class="prev flex-1 py-4 sm:py-6">
      <NuxtLink :to="prev.path" class="group block">
        <div class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 mb-1">Previous Article</div>
        <div class="flex items-center transition-colors">
          <span class="flex-shrink-0 mr-2 text-base font-serif font-semibold text-secondary-700 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400" aria-hidden="true">&larr;</span>
          <span class="line-clamp-2 text-base font-serif font-semibold text-secondary-700 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">{{ prev.title }}</span>
        </div>
      </NuxtLink>
    </div>
    <div v-if="next" class="next flex-1 py-4 sm:py-6" :class="{ 'border-t sm:border-t-0 sm:border-l border-secondary-200 dark:border-secondary-700': prev }">
      <NuxtLink :to="next.path" class="group block">
        <div class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 mb-1 text-left sm:text-right">Next Article</div>
        <div class="flex items-center justify-start sm:justify-end transition-colors">
          <span class="line-clamp-2 text-left sm:text-right text-base font-serif font-semibold text-secondary-700 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">{{ next.title }}</span>
          <span class="flex-shrink-0 ml-2 text-base font-serif font-semibold text-secondary-700 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400" aria-hidden="true">&rarr;</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
