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
                        <span v-if="article.updated" class="font-sans font-normal text-xs text-secondary-400 dark:text-secondary-500">
                            · Updated {{ formatDate(article.updated) }}
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
                    <p v-if="topic" class="mt-3 font-sans text-sm text-secondary-600 dark:text-secondary-300">
                        Part of
                        <NuxtLink :to="topicPath" class="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200">{{ topic.title }}</NuxtLink>
                    </p>
                </div>
                <div class="flex-1 mt-8 md:mt-0">
                    <nuxt-img
                        :src="article.image"
                        :alt="article.alt"
                        preset="blog"
                        width="800"
                        height="400"
                        class="rounded-lg border border-secondary-200 dark:border-secondary-700 w-full object-cover max-h-[500px]"
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

            <!-- Related posts: the signature section-rule under the heading, the
                 card's hover translate + slate-border intensification, and the
                 rose title on hover. All carried from the system; no new
                 colors, no new geometry. -->
            <section v-if="relatedArticles.length" class="my-16">
                <div class="relative mb-10">
                    <h2 class="text-3xl font-serif font-bold text-center text-secondary-800 dark:text-secondary-100">
                        {{ topic ? `More in ${topic.title}` : 'Related posts' }}
                    </h2>
                    <div class="absolute w-24 h-1 bg-primary-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NuxtLink
                        v-for="rel in relatedArticles"
                        :key="rel.path"
                        :to="rel.path"
                        class="group block p-6 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600 hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-secondary-900"
                    >
                        <h3 class="font-serif font-semibold text-lg leading-snug text-secondary-700 dark:text-secondary-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-2">
                            {{ rel.title }}
                        </h3>
                        <p
                            v-if="rel.description"
                            class="font-sans text-base leading-relaxed text-secondary-600 dark:text-secondary-300 line-clamp-2 mb-3"
                        >
                            {{ rel.description }}
                        </p>
                        <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                            <ArticleTags v-if="rel.tags?.length" :tags="rel.tags" />
                            <time
                                v-if="rel.postDate"
                                class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 ml-auto"
                            >
                                {{ formatDate(rel.postDate) }}
                            </time>
                        </div>
                    </NuxtLink>
                </div>
                <p v-if="topic" class="mt-8 text-center font-sans text-sm">
                    <NuxtLink :to="topicPath" class="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200">
                        All posts in {{ topic.title }}
                    </NuxtLink>
                </p>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BlogCollectionItem } from "@nuxt/content";
import { watch } from "vue";
import type { BlogPostPreview } from "~/types";
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

// Related posts (top 3 by tag overlap, excluding the current article)
const { getRelatedArticles } = useArticles();
const relatedArticles = ref<BlogPostPreview[]>([]);
watch(
    () => article.value?.path,
    async (newPath) => {
        if (newPath && article.value?.tags) {
            relatedArticles.value = await getRelatedArticles(article.value.tags, newPath, article.value.topic);
        }
    },
    { immediate: true },
);

// Topic hub this post belongs to (content/topics/<slug>.md)
const { data: topic } = await useAsyncData(`topic-of-${uniqueKey}`, () =>
  article.value?.topic
    ? queryCollection("topics").path(`/topics/${article.value.topic}`).first()
    : Promise.resolve(null),
);
const topicPath = computed(() => (article.value?.topic ? `/topics/${article.value.topic}/` : ""));

// Format date helper
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
}

// Optional `seo.title` / `seo.description` frontmatter lets a post keep a
// conversational headline on the page while giving search a keyword-led one.
const title = computed(() => article.value?.seo?.title || article.value?.title || "");
const description = computed(() => article.value?.seo?.description || article.value?.description || "");
const image = computed(() => article.value?.image || "");
const postDate = computed(() => new Date(article.value?.postDate || "").toISOString());
const updated = computed(() => article.value?.updated ? new Date(article.value.updated).toISOString() : postDate.value);
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
    articleModifiedTime: updated,
    articleTag: tags,
});

// Schema.org
useSchemaOrg([
    defineBreadcrumb({
        itemListElement: [
            { name: "Home", item: "https://subodhdahal.com/" },
            { name: "Blog", item: "https://subodhdahal.com/blog/" },
            { name: title.value || "Article", item: url.value },
        ],
    }),
    defineArticle({
        mainEntityOfPage: url.value,
        headline: title.value,
        description: description.value,
        image: image.value,
        datePublished: postDate.value,
        dateModified: updated.value,
        articleSection: tags.value,
        // Omitting author links it to the site-wide Person (#identity)
        // instead of emitting a second, disconnected Person node.
        keywords: tags.value,
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
