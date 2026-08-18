<template>
    <div class="nuxt-content bg-white dark:bg-secondary-900">
        <Breadcrumbs :current-page="article?.title" v-if="article" />
        <div v-if="article" class="cover container py-2">
            <div class="md:flex items-start gap-12">
                <div class="flex-1">
                    <div class="flex flex-wrap items-baseline gap-3 mb-4">
                        <h1
                            class="font-serif text-2xl md:text-3xl font-semibold text-secondary-900 dark:text-white"
                        >
                            {{ article.title }}
                        </h1>
                        <span class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500">
                            {{ formatDate(article.postDate) }}
                        </span>
                    </div>
                    <p
                        class="text-lg md:text-xl mb-4 text-secondary-600 dark:text-secondary-300"
                    >
                        {{ article.description }}
                    </p>
                    <div class="mt-2">
                        <ArticleTags :tags="article.tags" />
                    </div>
                </div>
                <div class="flex-1 mt-8 md:mt-0">
                    <nuxt-img
                        :src="article.image"
                        :alt="article.alt"
                        preset="blog"
                        class="rounded-lg border border-secondary-200 dark:border-secondary-700 w-full object-cover max-h-[500px]"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>

        <div class="container">
            <div class="lg:flex lg:gap-12">
                <details class="lg:hidden mb-6">
                    <summary class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 cursor-pointer">
                        Table of Contents
                    </summary>
                    <TableOfContents :article="article" class="mt-2" />
                </details>

                <article class="flex-1 max-w-3xl mx-auto lg:mx-0">
                    <ContentRenderer
                        v-if="article"
                        :value="article"
                        class="blog-page pb-5"
                    >
                        <template #empty>
                            <p>No content found.</p>
                        </template>
                    </ContentRenderer>

                    <BlogPrevNext :current-path="withTrailingSlash(path)" />
                </article>

                <aside class="hidden lg:block w-64 flex-shrink-0">
                    <TableOfContents :article="article" class="lg:sticky lg:top-24" />
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BlogCollectionItem } from "@nuxt/content";
import TableOfContents from "~/components/TableOfContents.vue";

// Fetch article data
const article = ref<BlogCollectionItem | null>(null);
// @nuxt/content stores paths without a trailing slash, but the URL (and
// useRoute().path) may include one. Strip it so the DB query matches; display
// and link paths get their trailing slash back via withTrailingSlash below.
const { path: routePath, params } = useRoute();
const path = routePath.replace(/\/+$/, '') || routePath;
const uniqueKey = `article-${params.slug || path}`;
const { data } = await useAsyncData(uniqueKey, () =>
  queryCollection("blog").where("path", "=", path).first(),
);
article.value = unref(data);

// Format date helper
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
}

const title = computed(() => article.value?.title || "");
const description = computed(() => article.value?.description || "");
const image = computed(() => article.value?.image || "");
const postDate = computed(() => new Date(article.value?.postDate || "").toISOString());
const tags = computed(() => article.value?.tags || []);
const url = computed(() => `https://subodhdahal.com${withTrailingSlash(path)}`);

// SEO Meta
useHead({
    title: title,
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
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    articlePublishedTime: postDate,
    articleModifiedTime: postDate,
    articleTag: tags,
});

// Schema.org
useSchemaOrg([
    defineArticle({
        headline: title.value,
        description: description.value,
        image: image.value,
        datePublished: postDate.value,
        dateModified: postDate.value,
        articleSection: tags.value,
        author: {
            "@type": "Person",
            name: "Subodh Dahal",
            url: "https://subodhdahal.com"
        },
    })
]);

// OG Image
if (image.value) {
    defineOgImage("SimpleBlog", {
        title: title.value,
        image: image.value,
    });
}
</script>

<style scoped>
/* All styles are now handled by Tailwind classes */
</style>
