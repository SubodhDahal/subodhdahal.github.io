<script setup>
const description =
  "Subodh Dahal -  Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer";
const ogTitle =
  "Subodh Dahal's musings on software engineering, automation, photography and more";
const mySite = "https://subodhdahal.com";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  charset: "utf-8",
  title: ogTitle,
  titleTemplate: (title) =>
    title !== ogTitle ? `${title} · Subodh Dahal` : title,
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/manifest.json" },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: "/fonts/Newsreader/Newsreader-700-normal.woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: "/fonts/IBM_Plex_Sans/IBMPlexSans-400-normal.woff2",
      crossorigin: "anonymous",
    },
    { rel: "canonical", href: mySite },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "Subodh Dahal (RSS)",
      href: "/rss.xml",
    },
    {
      rel: "alternate",
      type: "application/atom+xml",
      title: "Subodh Dahal (Atom)",
      href: "/atom.xml",
    },
  ],
  meta: [
    { name: "theme-color", content: "#F43F5E", media: "(prefers-color-scheme: light)" },
    { name: "theme-color", content: "#0f1115", media: "(prefers-color-scheme: dark)" },
    { name: "color-scheme", content: "light dark" },
  ],
});

useSeoMeta({
  title: ogTitle,
  description: description,
  ogTitle: ogTitle,
  ogDescription: description,
  ogUrl: mySite,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: ogTitle,
  twitterDescription: description,
});

defineOgImage("SimpleBlog", {
  title: "Subodh Dahal's musings on software engineering, automation, photography and more",
});

useSchemaOrg([
  defineWebSite({
    name: "Subodh Dahal",
    url: mySite,
    description: description,
  }),
  definePerson({
    name: "Subodh Dahal",
    url: mySite,
    image: "/images/me.jpg",
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/subodhdahal",
      "https://linkedin.com/in/subodhdahal",
    ],
  }),
]);
</script>

<template>
  <div>
    <TheHeader />
    <NuxtPage />
    <TheFooter />
  </div>
</template>
