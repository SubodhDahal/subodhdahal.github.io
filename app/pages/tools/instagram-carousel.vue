<script setup lang="ts">
const title = 'Instagram Carousel Tools'
const description =
  "Pad every image onto one shared canvas so Instagram doesn't crop or resize your carousel. Runs in your browser; your images are never uploaded."

useSeoMeta({ title, description })
</script>

<template>
  <main class="md:container mx-auto px-5 py-8">
    <ClientOnly>
      <CarouselTool />
      <template #fallback>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </template>
    </ClientOnly>
  </main>
</template>
