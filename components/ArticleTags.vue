<template>
  <div class="tags">
    <span v-for="tag in tags" :key="tag" class="text-blue-500 text-xs font-bold mr-3">
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

<style>

</style>
