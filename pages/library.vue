<template>
    <div class="container my-10">
        <div class="max-w-3xl mx-auto text-center mb-12">
            <h1 class="font-serif text-4xl font-bold mb-4 dark:text-gray-50">
                Library
            </h1>
            <p class="text-gray-600 dark:text-gray-300 text-lg">
                Some of the books that I have read in the past few years and
                recommend, in no particular order.
            </p>
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
                        class="relative pb-[150%] overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl"
                    >
                        <img
                            :src="imageUrl(book.image)"
                            :alt="book.title"
                            class="absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:scale-105 rounded-lg bg-gray-50 dark:bg-gray-800"
                        />
                    </div>
                    <div class="mt-4">
                        <h2
                            class="text-lg font-bold font-serif dark:text-gray-50 line-clamp-2"
                        >
                            {{ book.title }}
                        </h2>
                        <p
                            class="text-gray-600 dark:text-gray-300 text-sm mt-1"
                        >
                            {{ book.author }}
                        </p>
                        <p
                            class="text-gray-400 dark:text-gray-400 text-xs mt-2"
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
const path: string = "/library";

const { data } = await useAsyncData('library', () =>
    queryCollection('library').path('/library').first()
);

useHead({
    title,
    meta: createSEOMeta({ title, description, image, url: path }),
    link: [
        {
            rel: "canonical",
            href: `https://subodhdahal.com${path}`,
        },
    ],
});

const imageUrl = (image: string) => `/images/library/${image}`;
</script>

<style lang="scss" scoped></style>
