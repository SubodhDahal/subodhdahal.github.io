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
  <div v-if="prev || next" class="flex gap-4 justify-between p-4 my-6 border border-slate-200 rounded-lg">
    <div class="prev">
      <NuxtLink v-if="prev" :to="prev.path">
        <span> &larr; {{ prev.title }} </span>
      </NuxtLink>
    </div>
    <div class="next">
      <NuxtLink v-if="next" :to="next.path">
        <span> {{ next.title }} &rarr; </span>
      </NuxtLink>
    </div>
  </div>
</template>
