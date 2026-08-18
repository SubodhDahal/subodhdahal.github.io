
<template>
  <div>
    <label for="article-search" class="sr-only">Search articles</label>
    <input
      id="article-search"
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
      aria-label="Search articles"
      class="block w-full pl-10 pr-3 py-2 truncate leading-5 placeholder-secondary-500 border border-secondary-300 text-secondary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-secondary-900 dark:text-secondary-100 dark:border-secondary-700 dark:placeholder-secondary-500"
    >
    <ul
      v-if="articles.length"
      class="z-10 absolute w-auto flex-1 bg-white dark:bg-secondary-900 rounded-md border border-secondary-300 dark:border-secondary-700 overflow-hidden"
    >
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="flex px-4 py-2 items-center leading-5 transition ease-in-out duration-150 text-primary-700 dark:text-primary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800"
        >
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchQuery: '',
      articles: []
    }
  },
  watch: {
    async searchQuery (searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .limit(6)
        .search(searchQuery)
        .fetch()
    }
  }
}
</script>
