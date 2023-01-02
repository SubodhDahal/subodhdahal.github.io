<script setup lang="ts">
import type { PrevNext } from '~/types'
defineProps<{
  prev: PrevNext
  next: PrevNext
}>()
</script>

<template>
  <div
    class="flex gap-4 justify-between p-4 my-6 border border-slate-200 rounded-lg"
  >
    <div class="prev">
      <NuxtLink v-if="prev" :to="prev._path">
        <span> &larr; {{ prev.title }} </span>
      </NuxtLink>
    </div>
    <div class="next">
      <NuxtLink v-if="next" :to="next._path">
        <span> {{ next.title }} &rarr; </span>
      </NuxtLink>
    </div>
  </div>
</template>
