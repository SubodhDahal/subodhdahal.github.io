<template>
    <div class="container my-10">
        <div class="relative mb-8">
            <h1 class="text-3xl font-serif font-bold text-center text-secondary-800 dark:text-secondary-100">
                Library
            </h1>
            <div class="absolute w-24 h-1 bg-primary-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </div>

        <div class="px-4">
            <div
                class="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12"
            >
                <div
                    v-for="book of data?.books"
                    :key="book.title"
                    class="group transition-all duration-200 hover:-translate-y-1"
                >
                    <div
                        class="relative pb-[150%] overflow-hidden rounded-lg border border-secondary-200 dark:border-secondary-700 transition-colors duration-300 group-hover:border-secondary-300 dark:group-hover:border-secondary-600"
                    >
                        <img
                            :src="imageUrl(book.image)"
                            :alt="`Cover of ${book.title} by ${book.author}`"
                            loading="lazy"
                            class="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02] bg-secondary-50 dark:bg-secondary-800"
                        />
                    </div>
                    <div class="mt-4">
                        <h2
                            class="text-lg font-bold font-serif dark:text-secondary-50 line-clamp-2"
                        >
                            {{ book.title }}
                        </h2>
                        <p
                            class="text-secondary-600 dark:text-secondary-300 text-sm mt-1"
                        >
                            {{ book.author }}
                        </p>
                        <p
                            class="text-secondary-500 dark:text-secondary-400 text-xs mt-2"
                        >
                            {{ book.genres.join(", ") }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const title: string = "Library";
const description: string = "Books that I have read and recommend";
const image: string = "";
const path: string = "/library/";

const { data } = await useAsyncData('library', () =>
    queryCollection('library').path('/library').first()
);

useHead({
    title,
    link: [
        {
            rel: "canonical",
            href: `https://subodhdahal.com${path}`,
        },
    ],
});

useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image || undefined,
    ogUrl: `https://subodhdahal.com${path}`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image || undefined
});

const imageUrl = (image: string) => `/images/library/${image}`;
</script>

<style lang="scss" scoped></style>
