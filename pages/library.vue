<template>
  <div class="container blog-page my-10">
    <div class="prose max-w-none dark:text-gray-50 text-center">
      <h1 class="mb-1 dark:text-gray-50">Library</h1>
      <p class="mb-5">
        Some of the books that I have read in the past few years and recommend, in no particular order.
      </p>
    </div>

    <div class="mt-10 mx-10">
      <div class="grid md:grid-cols-5 md:gap-20 gap-10">
        <ContentDoc v-slot="{ doc }">
          <div v-for="book of doc.books" :key="book.title">
            <div class="h-60">
              <img :src="imageUrl(book.image)" class="h-full object-cover border border-gray-200 shadow-xl rounded-lg" />
            </div>
            <div class="mt-3">
              <h2 class="text-lg font-bold dark:text-gray-50">
                {{ book.title }}
              </h2>
              <p class="text-gray-600 dark:text-gray-100 text-sm">
                {{ book.author }}
              </p>
              <p class="text-gray-400 dark:text-gray-200 text-xs mt-1">
                {{ book.genres.join(', ') }}
              </p>
            </div>
          </div>
        </ContentDoc>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title: string = 'Library'
const description: string = 'Books that I have read and recommend'
const image: string = ''
const path: string = '/library'

useHead({
  title,
  meta: createSEOMeta({ title, description, image, url: path }),
  link: [
    {
      rel: 'canonical',
      href: `https://subodhdahal.com${path}`,
    },
  ],
})

const imageUrl = (image: string) => `/images/library/${image}`
</script>

<style lang="scss" scoped>

</style>