<script setup>
const description =
  "Subodh Dahal is an engineering manager in Stuttgart. He writes about software, self-hosting, NixOS, automation, photography and hiking in Nepal.";
const ogTitle = "Subodh Dahal: software, self-hosting, automation and photography";
const mySite = "https://subodhdahal.com";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  charset: "utf-8",
  title: ogTitle,
  // Brand suffix only when it fits: Google cuts titles at ~60 characters, and
  // a long post title is worth more in the snippet than the site name.
  titleTemplate: (title) =>
    !title || title === ogTitle || title.length > 45 ? title || ogTitle : `${title} · Subodh Dahal`,
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

defineOgImage("SimpleBlog", { title: ogTitle });

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
    jobTitle: "Engineering Manager",
    homeLocation: { "@type": "Place", name: "Stuttgart, Germany" },
    knowsAbout: ["Software engineering", "Automation", "Self-hosting", "NixOS", "Photography"],
    sameAs: [
      "https://github.com/SubodhDahal",
      "https://www.linkedin.com/in/subodhdahal",
      "https://www.xing.com/profile/Subodh_Dahal",
      "https://stackoverflow.com/users/1083422/sub0dh",
      "https://instagram.com/wanderluster_subodh",
    ],
  }),
]);
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <TheHeader />
    <div class="flex-1">
      <NuxtPage />
    </div>
    <TheFooter />
  </div>
</template>
