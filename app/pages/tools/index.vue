<script setup lang="ts">
const title = 'Tools'
const description = 'Small browser-based tools I built for myself.'
useSeoMeta({ title, description })
</script>

<template>
  <main class="md:container mx-auto px-5 py-8">
    <h1>Tools</h1>
    <ul>
      <li>
        <NuxtLink to="/tools/instagram-carousel/">Instagram Carousel Tools</NuxtLink>
      </li>
    </ul>
  </main>
</template>
