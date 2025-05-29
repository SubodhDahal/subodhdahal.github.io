<template>
    <div class="nuxt-content bg-white dark:bg-secondary-900">
        <Breadcrumbs :current-page="article?.title" v-if="article" />
        <div v-if="article" class="cover container py-2">
            <div class="md:flex items-center gap-12">
                <div class="flex-1">
                    <h1
                        class="font-serif text-4xl md:text-5xl font-bold mb-4 text-secondary-900 dark:text-white"
                    >
                        {{ article.title }}
                    </h1>
                    <p
                        class="text-lg md:text-xl mb-4 text-secondary-600 dark:text-secondary-300"
                    >
                        {{ article.description }}
                    </p>
                    <ArticleTags :tags="article.tags" class="my-6" />
                    <div
                        class="text-secondary-500 dark:text-secondary-400 text-sm"
                    >
                        Posted on {{ formatDate(article.postDate) }}
                    </div>
                </div>
                <div class="flex-1 mt-8 md:mt-0">
                    <nuxt-img
                        :src="article.image"
                        :alt="article.alt"
                        preset="blog"
                        class="rounded-lg shadow-lg w-full object-cover max-h-[500px]"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>

        <div class="container">
            <article class="max-w-3xl mx-auto">
                <!-- TOC -->
                <!-- TODO: Add to the right -->
                <!-- <nav>
        <ul>
          <li v-for="link of article.toc" :key="link.id" :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }">
            <NuxtLink :to="`#${link.id}`">
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
      </nav> -->
                <ContentRenderer
                    v-if="article"
                    :value="article"
                    class="blog-page pb-5"
                >
                    <template #empty>
                        <p>No content found.</p>
                    </template>
                </ContentRenderer>

                <BlogPrevNext :current-path="path" />
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createSEOMeta } from "@/utils/seo";
import type { BlogCollectionItem } from "@nuxt/content";

// Fetch article data
const article = ref<BlogCollectionItem | null>(null);
const { path } = useRoute();
const { data } = await useAsyncData("article", () =>
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

// Head meta tags
const title = computed(() => article.value?.title || "");
const description = computed(() => article.value?.description || "");
const image = computed(() => article.value?.image || "");
const postDate = computed(() => article.value?.postDate || "");
const tags = computed(() => article.value?.tags || []);

useHead({
    title: computed(() => title.value),
    meta: computed(() =>
        createSEOMeta({
            title: title.value,
            description: description.value,
            image: image.value,
            url: path,
            type: 'article',
            postDate: postDate.value,
            keywords: tags.value,
            updatedAt: article.value?.postDate,
        }),
    ),
    link: [
        {
            rel: "canonical",
            href: `https://subodhdahal.com${path}`,
        },
    ],
});
</script>

<style scoped>
/* All styles are now handled by Tailwind classes */
</style>
