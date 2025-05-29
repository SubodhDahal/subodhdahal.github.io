// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Subodh Dahal' },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxt/content',
    '@nuxtjs/color-mode'
  ],

  image: {
    provider: 'ipx',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 80,
          height: 80
        }
      },
      blog: {
        modifiers: {
          format: 'webp',
          width: 800,
          height: 400
        }
      }
    },
    domains: ['subodhdahal.com'],
    format: ['webp', 'jpg', 'png']
  },

  experimental: {
    // Enable route rules to work with sitemap
    routeRules: true
  },

  routeRules: {
    '/404': { robots: false }
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ],
    xsl: false,
  },

  css: [
    '~/assets/css/main.css',
  ],

  content: {
    markdown: {
      anchorLinks: false,
      highlight: {
        theme: 'github-dark'
      }
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light',
  },

  compatibilityDate: '2025-01-12',
})
