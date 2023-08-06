<template>
  <div class="bg-gray-100">
    <header class="container flex justify-between mx-auto px-5 pt-5">
      <div class="text-2xl font-bold mb-4">
        <NuxtLink to="/">
          <img src="/logo.svg" class="logo">
        </NuxtLink>
      </div>
      <div class="text-xl mt-1">
        <NuxtLink to="/blog">
          Blog
        </NuxtLink>
        <NuxtLink to="/library" class="ml-4">
          Library
        </NuxtLink>
        <NuxtLink to="/about" class="ml-4">
          About
        </NuxtLink>
        <button v-on:click="$emit('toggle-dark-mode')" class="ml-4">
          Toggle Dark Mode
        </button>
      </div>
    </header>
  </div>
</template>
