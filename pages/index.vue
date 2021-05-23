<template>
  <div class="bg-gray-300">
    <div class="container">
      <div class="flex w-full">
        <div class="w-3/5 self-center">
          <h1 class="title">
            Hi! <br>
            I'm Subodh Dahal
          </h1>
          <h2 class="subtitle">
            Software Engineer, Automation Enthusiast,<br> Hobbyist Photographer & Avid Ponderer
          </h2>
          <h3 class="mt-2 text-4xl text-gray-600">
            From 🇳🇵, based in 🇩🇪
          </h3>
          <div class="mt-6">
            <a
              href="https://www.linkedin.com/in/subodhdahal/"
              target="_blank"
              rel="noopener noreferrer"
              class="button--grey"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SubodhDahal"
              target="_blank"
              rel="noopener noreferrer"
              class="button--grey"
            >
              GitHub
            </a>
            <a
              href="https://stackoverflow.com/users/1083422/sub0dh"
              target="_blank"
              rel="noopener noreferrer"
              class="button--grey"
            >
              StackOverflow
            </a>
          </div>
        </div>
        <object class="w-2/5" type="image/svg+xml" data="/avatar_animated.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS */
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 90px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
