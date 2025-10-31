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
  <div v-if="prev || next" class="flex flex-col sm:flex-row gap-4 justify-between p-4 sm:p-6 my-8 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
    <div v-if="prev" class="prev flex-1">
      <NuxtLink :to="prev.path" class="group block">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Previous Article</div>
        <div class="flex items-center text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <span class="flex-shrink-0 mr-2">&larr;</span>
          <span class="line-clamp-2">{{ prev.title }}</span>
        </div>
      </NuxtLink>
    </div>
    <div v-if="next" class="next flex-1">
      <NuxtLink :to="next.path" class="group block">
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-1 text-left sm:text-right">Next Article</div>
        <div class="flex items-center justify-start sm:justify-end text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <span class="line-clamp-2 text-left sm:text-right">{{ next.title }}</span>
          <span class="flex-shrink-0 ml-2">&rarr;</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
