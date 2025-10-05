// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-nocheck
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://app.rybbit.io/api/script.js",
          async: true,
          defer: true,
          "data-site-id": "dbed437cc8b1",
        },
      ],
    },
  },

  site: {
    url: "https://subodhdahal.com",
    name: "Subodh Dahal",
    description: "Personal website and blog of Subodh Dahal",
    defaultLocale: "en",
  },

  experimental: {
    clientNodeCompat: true,
    // Keep your existing experimental flags
    routeRules: true,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
  ],

  image: {
    provider: "ipx",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          format: "webp",
          width: 80,
          height: 80,
        },
      },
      blog: {
        modifiers: {
          format: "webp",
          width: 800,
          height: 400,
        },
      },
    },
    domains: ["subodhdahal.com"],
    format: ["webp", "jpg", "png"],
  },

  experimental: {
    // Enable route rules to work with sitemap
    routeRules: true,
  },

  routeRules: {
    "/404": { robots: false },
  },

  robots: {
    rules: [
      {
        UserAgent: "*",
        Allow: ["/"],
        Disallow: ["/404", "/api/*"],
      },
      {
        UserAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "Google-Extended",
          "anthropic-ai",
          "Omgilibot",
          "Omgili",
          "FacebookBot",
        ],
        Disallow: ["/"],
      },
    ],
    sitemap: "https://subodhdahal.com/sitemap.xml",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    xsl: false,
    cacheMaxAgeSeconds: 3600,
    defaults: {
      changefreq: "daily",
      priority: 0.8,
    },
  },

  schemaOrg: {
    meta: {
      host: "https://subodhdahal.com",
    },
  },

  ogImage: {
    runtimeBrowser: true,
  },

  css: ["~/assets/css/main.css"],

  content: {
    markdown: {
      anchorLinks: false,
      highlight: {
        theme: "github-dark",
      },
    },
  },

  nitro: {
    preset: "static", // Use static for GitHub Pages
    prerender: {
      routes: ["/rss.xml", "/atom.xml"],
    },
  },

  colorMode: {
    classSuffix: "",
    preference: "system", // default value of $colorMode.preference
    fallback: "light",
  },

  compatibilityDate: "2025-08-25",
});
