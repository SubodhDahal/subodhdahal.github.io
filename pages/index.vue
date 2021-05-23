<template>
  <div class="bg-gray-300">
    <div class="container">
      <div class="md:flex w-full mb-4">
        <div class="w-full md:w-3/5 self-center">
          <h1 class="text-5xl md:text-7xl mb-7 text-gray-700 leading-snug">
            Hi! <br>
            I'm Subodh Dahal
          </h1>
          <h2 class="text-2xl md:text-5xl text-gray-600 leading-snug">
            Software Engineer, Automation Enthusiast,<br> Hobbyist Photographer & Avid Ponderer
          </h2>
          <h3 class="mt-8 mb-2 text-xl md:text-3xl text-gray-500">
            From 🇳🇵, based in 🇩🇪
          </h3>
          <social-links class="mt-8" />
        </div>
        <object class="w-40 md:w-2/5 mx-auto mt-8 md:mt-0" type="image/svg+xml" data="/avatar_animated.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
