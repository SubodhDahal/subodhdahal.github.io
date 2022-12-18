<template>
  <div class="bg-gray-100">
    <header class="container flex justify-between mx-auto px-5 pt-5">
      <div class="text-2xl font-bold mb-4">
        <NuxtLink to="/">
          <img src="/logo.svg" class="logo">
        </NuxtLink>
      </div>
      <div class="text-xl mt-1 uppercase">
        <NuxtLink to="/blog">
          Blog
        </NuxtLink>
      </div>
    </header>
  </div>
</template>

<style scoped>
  header {
    font-family: 'Source Serif Pro', serif;
    font-weight: bold;
  }
  header .logo {
    height: 40px;
  }
</style>
