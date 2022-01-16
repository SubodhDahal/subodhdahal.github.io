<template>
  <div v-if="prev || next" class="flex justify-between my-10">
    <NuxtLink
      v-if="prev"
      :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
      class="font-bold text-primary hover:underline"
    >
      &larr; {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="{ name: 'blog-slug', params: { slug: next.slug } }"
      class="font-bold hover:underline"
    >
      {{ next.title }} &rarr;
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  }
}
</script>
