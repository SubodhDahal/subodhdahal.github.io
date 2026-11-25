<template>
  <div class="nuxt-content travels-page">
    <div class="relative min-h-screen md:h-screen overflow-hidden">
      <div
        class="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-lg"
      >
        <h1 class="text-white text-travel-heading text-center">
          <span class="block text-5xl md:text-9xl">My travels</span>
          <span class="block text-5xl md:text-9xl">in</span>
          <span class="block font-bold text-2023">2023</span>
        </h1>
        <div
          class="text-white uppercase border-t-4 border-white text-xl md:text-4xl py-6 mt-5"
        >
          A visual journey
        </div>
        <button
          type="button"
          aria-label="Scroll to article content"
          @click="scrollToContent"
          class="mt-4 text-white text-4xl animate-pulse-soft inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-white"
            aria-hidden="true"
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 absolute inset-0" aria-hidden="true">
        <img
          v-for="(image, index) in images"
          :key="image"
          :src="image"
          alt=""
          loading="lazy"
          class="object-cover h-full w-full opacity-0 animate-fade-in"
          :style="{ animationDelay: `${index * 0.2}s` }"
        />
      </div>
    </div>

    <div class="container mx-auto mt-10 md:mt-15" id="main-content">
      <div class="top-0 flex flex-col md:items-end py-3 float-right md:sticky md:top-0 w-full md:w-1/5">
        <TableOfContents :article="article" :showChildren="false" />
      </div>
      <article
        ref="articleRef"
        class="md:w-4/6 mx-auto"
        @click="onArticleClick"
        @keydown="onArticleKeydown"
      >
        <ContentRenderer
          v-if="article"
          :value="article"
          class="prose max-w-none dark:text-secondary-200"
        >
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>

        <BlogPrevNext :current-path="path" />
      </article>
    </div>

    <PhotoViewer
      :items="viewerItems"
      :index="openIndex"
      @close="close"
      @step="step"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { BlogCollectionItem } from "@nuxt/content";

import PhotoViewer from "~/components/PhotoViewer.vue";
import { usePhotoViewer, type ViewerItem } from "~/composables/usePhotoViewer";

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

// Fetch article data
const article = ref<BlogCollectionItem | null>(null);
// @nuxt/content stores paths without a trailing slash, but the URL (and
// useRoute().path) may include one. Strip it so the DB query matches; display
// and link paths get their trailing slash back via withTrailingSlash below.
const { path: routePath } = useRoute();
const path = routePath.replace(/\/+$/, "") || routePath;
const uniqueKey = `article-${path}`;
const { data } = await useAsyncData(uniqueKey, () =>
  queryCollection("blog").where("path", "=", path).first(),
);
article.value = unref(data);

// ---- Photo viewer ---------------------------------------------------------
// Every photo in the article opens in the same viewer as /photography/.
// Its alt text is the title; the section headings it sits under become
// the place line, e.g. "Kathmandu valley, Nepal".

const articleRef = ref<HTMLElement | null>(null);
const photoEls = ref<HTMLImageElement[]>([]);
const viewerItems = ref<ViewerItem[]>([]);
const { openIndex, open, close, step } = usePhotoViewer(
  (i) => photoEls.value[i],
  () => photoEls.value.length,
);

// Drop the flag emoji the headings carry ("Nepal 🇳🇵" → "Nepal").
const headingText = (el: Element) =>
  (el.textContent ?? "").replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "").trim();

onMounted(() => {
  const root = articleRef.value;
  if (!root) return;
  let country = "";
  let place = "";
  const imgs: HTMLImageElement[] = [];
  const items: ViewerItem[] = [];
  for (const el of root.querySelectorAll("h2, h3, img")) {
    if (el.tagName === "H2") {
      country = headingText(el);
      place = "";
    } else if (el.tagName === "H3") {
      place = headingText(el);
    } else {
      const img = el as HTMLImageElement;
      if (!img.closest(".prose")) continue;
      const caption = [place, country].filter(Boolean).join(", ");
      img.classList.add("zoomable");
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `${img.alt}${caption ? `, ${caption}` : ""}. View larger`);
      imgs.push(img);
      items.push({ src: img.getAttribute("src") ?? img.src, alt: img.alt, title: img.alt, caption });
    }
  }
  photoEls.value = imgs;
  viewerItems.value = items;
});

const indexOfTarget = (target: EventTarget | null) =>
  target instanceof HTMLImageElement ? photoEls.value.indexOf(target) : -1;

const onArticleClick = (event: MouseEvent) => {
  const i = indexOfTarget(event.target);
  if (i >= 0) open(i);
};

const onArticleKeydown = (event: KeyboardEvent) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const i = indexOfTarget(event.target);
  if (i < 0) return;
  event.preventDefault();
  open(i);
};

function scrollToContent() {
  const content = document.getElementById("main-content");
  if (content) {
    content.scrollIntoView({ behavior: "smooth" });
  }
}

// Head meta tags
const title = computed(() => article.value?.title || "");
const description = computed(() => article.value?.seo?.description || article.value?.description || "");
const image = computed(() => article.value?.image || "");
const url = computed(() => `https://subodhdahal.com${withTrailingSlash(path)}`);
const postDate = computed(() => article.value?.postDate ? new Date(article.value.postDate).toISOString() : '');

useHead({
  title,
  link: [
    {
      rel: "canonical",
      href: url,
    },
  ],
});

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: url,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  ogType: 'article',
  articlePublishedTime: postDate,
});

useSchemaOrg([
  defineArticle({
    mainEntityOfPage: url.value,
    headline: title.value,
    description: description.value,
    image: image.value,
    datePublished: postDate.value,
    dateModified: postDate.value,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: "Home", item: "https://subodhdahal.com/" },
      { name: "Blog", item: "https://subodhdahal.com/blog/" },
      { name: title.value || "Article", item: url.value },
    ],
  }),
]);

if (image.value) {
  defineOgImage("SimpleBlog", {
    title: title.value,
    image: image.value,
  });
}
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
/* Soft pulse for the chevron — defined globally in main.css as
   .animate-pulse-soft + @keyframes pulseSoft to keep motion centralised
   and reduced-motion-aware. */
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
.travels-page {
  font-size: 18px;
  line-height: 1.6; /* Added line height for better readability */
}
.dark .travels-page h1,
.dark .travels-page h2,
.dark .travels-page h3,
.dark .travels-page a {
  color: #d7d7d7;
}
.travels-page h1,
.travels-page h2,
.travels-page h3 {
  font-family: "Newsreader", Georgia, serif;
  font-weight: 700;
  line-height: 1.3; /* Added line height for better readability */
  letter-spacing: 0.02em; /* Added letter spacing for better readability */
}

.travels-page h1 {
  font-size: 32px; /* Increased font size for better hierarchy */
}

.travels-page h2 {
  font-size: 28px; /* Increased font size for better hierarchy */
  margin-bottom: 0.5em; /* Reduced space below the heading */
  margin-top: 1em; /* Reduced space above the heading */
}

.travels-page h3 {
  font-size: 24px; /* Increased font size for better hierarchy */
  margin-bottom: 0.5em; /* Reduced space below the heading */
  margin-top: 1em; /* Reduced space above the heading */
}

.travels-page img {
  margin-top: 1em;
  margin-bottom: 1em;
}

/* The viewer sits inside .travels-page; keep the article's image margins
   off its photo. */
.travels-page .viewer img {
  margin: 0;
}

/* Article photos open in the photo viewer. */
.travels-page img.zoomable {
  cursor: zoom-in;
  transition: opacity 0.2s ease;
}
.travels-page img.zoomable:hover {
  opacity: 0.9;
}
.travels-page img.zoomable:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 3px;
}
.dark .travels-page img.zoomable:focus-visible {
  outline-color: var(--color-primary-400);
}
</style>
