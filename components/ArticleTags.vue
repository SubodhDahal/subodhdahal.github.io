<template>
  <div class="tags">
    <span v-for="tag in tags" :key="tag" class="text-blue-700 text-xs bg-blue-200 font-bold px-3 py-1 rounded-xl mr-2">
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
