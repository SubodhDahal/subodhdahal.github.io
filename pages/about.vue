<template>
  <div class="container blog-page my-10">
    <div class="prose max-w-none dark:text-gray-50">
      <p>The "About" page has been moved to the homepage.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push('/')
})
</script>

<style lang="scss" scoped>

</style>