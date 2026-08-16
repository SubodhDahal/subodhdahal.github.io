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
  },

  // @nuxtjs/seo must be registered before @nuxt/content (v5 module-order requirement)
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@nuxt/image-nightly",
    "@nuxt/content",
    "@nuxtjs/color-mode",
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

  routeRules: {
    "/404": { robots: false },
  },

  robots: {
    groups: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/404", "/api/*"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "Google-Extended",
          "anthropic-ai",
          "Omgilibot",
          "Omgili",
          "FacebookBot",
        ],
        disallow: ["/"],
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

  ogImage: {
    // 15s default cliff causes flaky 408s on cold prerender — satori+resvg of
    // a 1200x600 image is seconds, not minutes. 60s gives cold renders room.
    security: {
      renderTimeout: 60_000,
    },
    // Persist rendered PNGs to disk so subsequent prerender runs are cache hits.
    // Keyed on (options incl. title/image props, component hash, module version) —
    // invalidates exactly when a post or template changes.
    buildCache: true,
    cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
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
