<template>
  <div class="blog-page">
    <h1 class="font-bold text-4xl text-center mb-10">
      Blog Articles
    </h1>
    <ul class="flex flex-wrap">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 mb-6 article-card"
      >
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="md:flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
        >
          <img
            v-if="article.image"
            class="w-full md:w-auto h-48 mx-auto xxlmin:w-1/2 xxlmax:w-full object-cover"
            :src="article.image"
          >

          <div class="p-0 pt-4 md:p-6 md:pt-0 xxlmin:w-1/2 xxlmax:w-full">
            <h2 class="article-title font-bold">
              {{ article.title }}
            </h2>
            <p class="text-gray-600">
              {{ article.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    articles: []
  }),
  async fetch () {
    this.articles = await this.$content('articles')
      .only(['title', 'description', 'image', 'slug', 'author'])
      .sortBy('postDate', 'desc')
      .fetch()
  }
}
</script>

<style>
.blog-page h1, .blog-page h2 {
  font-family: 'Source Serif Pro', serif;
  font-weight: bold;
}
</style>
