<template>
  <div>
    <TheHeader />

    <div class="container blog-page">
      <BlogPosts class="mt-10" />
      <h3 class="my-10 font-bold text-2xl uppercase text-center">
        Topics
      </h3>
      <ul class="flex flex-wrap mb-4 text-center">
        <li
          v-for="tag of tags"
          :key="tag.slug"
          class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center"
        >
          <NuxtLink :to="`/blog/tag/${tag.slug}`" class="">
            <p
              class="font-bold text-gray-600 uppercase tracking-wider font-medium text-ss"
            >
              {{ tag.name }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const tags = await $content('tags')
      .only(['name', 'description', 'image', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return { tags }
  },
  head () {
    const title = 'Blog posts - Subodh Dahal'
    return {
      title,
      meta: createSEOMeta({
        title,
        description: 'Blog posts',
        image: '',
        url: '/blog'
      })
    }
  }
}
</script>

<style>
  .blog-page h1, .blog-page h2, .blog-page h3 {
    font-family: 'Source Serif Pro', serif;
    font-weight: bold;
  }
  .article-title {
    @apply text-3xl mb-3;
  }
</style>
