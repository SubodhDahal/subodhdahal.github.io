// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxt/content',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  content: {
    highlight: {
      theme: 'github-dark'
    },
  },
})
