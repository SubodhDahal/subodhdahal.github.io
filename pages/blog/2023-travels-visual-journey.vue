<template>
  <div class="nuxt-content">
    <div class="relative h-screen overflow-hidden">
      <div
        class="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-lg"
      >
        <div class="text-white text-5xl md:text-9xl text-travel-heading">
          My travels
        </div>
        <div class="text-white text-5xl md:text-9xl text-travel-heading">
          in
        </div>
        <div class="text-white font-bold text-2023">2023</div>
        <div
          class="text-white uppercase border-t-4 border-white text-xl md:text-4xl py-6 mt-5"
        >
          A visual journey
        </div>
        <button
          @click="scrollToContent"
          class="mt-4 text-white text-4xl animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 absolute inset-0">
        <img
          v-for="(image, index) in images"
          :key="image"
          :src="image"
          alt="Image"
          class="object-cover h-full w-full opacity-0 animate-fade-in"
          :style="{ animationDelay: `${index * 0.2}s` }"
        />
      </div>
    </div>

    <div class="container mx-auto mt-10 md:mt-15" id="main-content">
      <div class="top-0 flex flex-col md:items-end py-3 float-right md:sticky md:top-0 w-full md:w-1/5">
        <TableOfContents :article="article" :showChildren="false" />
      </div>
      <article class="md:w-4/6 mx-auto">
        <ContentRenderer
          :value="article"
          class="prose max-w-none dark:text-gray-200"
        >
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>

        <BlogPrevNext :prev="prev" :next="next" />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost, PrevNext } from "~/types";
 

import { ref } from "vue";

const images = ref([
  "/images/2023-visual-journey/nepal-11.jpg",
  "/images/2023-visual-journey/apr-9.jpg",
  "/images/2023-visual-journey/nepal-3.jpg",
  "/images/2023-visual-journey/may-nice-7.jpg",
  "/images/2023-visual-journey/aug-wuerzburg-2.jpg",
  "/images/2023-visual-journey/nepal-2.jpg",
  "/images/2023-visual-journey/nepal-3.jpg",
  "/images/2023-visual-journey/may-schwaebisch-hall-1.jpg",
  "/images/2023-visual-journey/nepal-5.jpg",
  "/images/2023-visual-journey/june-kiel-2.jpg",
  "/images/2023-visual-journey/sep-amsterdam-3.jpg",
  "/images/2023-visual-journey/apr-8.jpg",
]);

const { path } = useRoute();
const { data: article } = await useAsyncData(path.replace(/\/$/, ""), () =>
  queryContent<BlogPost>("blog").where({ _path: path }).findOne()
);

const { data } = await useAsyncData("prev-next", () =>
  queryContent<PrevNext>("blog")
    .where({ published: { $ne: false }, featured: { $ne: true } })
    .sort({ date: -1 })
    .only(["_path", "title"])
    .findSurround(path)
);
const [prev, next] = data.value || [];

function scrollToContent() {
  const content = document.getElementById("main-content");
  if (content) {
    content.scrollIntoView({ behavior: "smooth" });
  }
}

const title: string = article.value?.title || "";
const description: string = article.value?.description || "";
const image: string = article.value?.image || "";
// const ogImage: string = article.value?.ogImage || ''

useMeta({
  title,
  description,
  image,
  canonical: `https://subodhdahal.com${path}`, 
  openGraph: {
    type: 'article',
    url: `https://subodhdahal.com${path}`, 
    title,
    description,
    image
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SubodhDahal',
    title,
    description,
    image
  }
});
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce {
  animation: bounce 2s infinite;
}
.animate-fade-in {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
.text-travel-heading {
  font-family: "Samble Tracie", cursive;
  line-height: 1.2;
}
.text-2023 {
  font-family: Impact, "Arial Narrow Bold", sans-serif;
  font-size: 9rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
}
@media screen and (max-width: 640px) {
  .text-2023 {
    font-size: 5rem;
  }
}
.nuxt-content {
  font-size: 18px;
  line-height: 1.6; /* Added line height for better readability */
}
.dark .nuxt-content h1,
.dark .nuxt-content h2,
.dark .nuxt-content h3,
.dark .nuxt-content a {
  color: #d7d7d7;
}
.nuxt-content h1,
.nuxt-content h2,
.nuxt-content h3 {
  font-family: "Source Serif Pro", serif;
  font-weight: bold;
  line-height: 1.3; /* Added line height for better readability */
  letter-spacing: 0.02em; /* Added letter spacing for better readability */
}

.nuxt-content h1 {
  font-size: 32px; /* Increased font size for better hierarchy */
}

.nuxt-content h2 {
  font-size: 28px; /* Increased font size for better hierarchy */
  margin-bottom: 0.5em; /* Reduced space below the heading */
  margin-top: 1em; /* Reduced space above the heading */
}

.nuxt-content h3 {
  font-size: 24px; /* Increased font size for better hierarchy */
  margin-bottom: 0.5em; /* Reduced space below the heading */
  margin-top: 1em; /* Reduced space above the heading */
}

.nuxt-content img {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
