<script setup>
const description =
  "Subodh Dahal -  Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer";
const ogTitle =
  "Subodh Dahal's musings on software engineering, automation, photography and more";
const ogImage = "https://subodhdahal.com/twitter-card.png";
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
});

useSeoMeta({
  title: ogTitle,
  description: description,
  ogTitle: ogTitle,
  ogDescription: description,
  ogImage: ogImage,
  ogUrl: mySite,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: ogTitle,
  twitterDescription: description,
  twitterImage: ogImage,
});

useSchemaOrg({
  website: {
    name: "Subodh Dahal",
    url: mySite,
    description: description,
    image: ogImage,
  },
  person: {
    name: "Subodh Dahal",
    url: mySite,
    image: "/images/me.jpg",
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/subodhdahal",
      "https://linkedin.com/in/subodhdahal",
    ],
  },
});
</script>

<template>
  <div>
    <TheHeader />
    <NuxtPage />
    <TheFooter />
  </div>
</template>
