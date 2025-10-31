<template>
  <div class="tags">
    <span v-for="tag in tags" :key="tag" class="inline-block text-slate-600 text-xs bg-slate-100 px-2 py-0.5 rounded mr-3">
      {{ tag.toUpperCase() }}
    </span>
  </div>
</template>

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
