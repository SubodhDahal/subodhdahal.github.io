<template><span v-for="tag in tags" :key="tag" class="inline-block font-sans font-medium text-xs uppercase tracking-[0.06em] bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 px-2 py-0.5 rounded mr-3">{{ tag }}</span></template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>
