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
        <button v-on:click="toggleDarkMode" class="ml-4 btn-dark-mode" aria-label="Toggle dark mode">
          {{ darkModeEnabled ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
        </button>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkModeEnabled: localStorage.getItem('darkMode') === 'true',
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkModeEnabled = !this.darkModeEnabled;
      this.$emit('toggle-dark-mode');
    },
  },
};
</script>
