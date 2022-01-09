<template>
  <div>
    <div class="container-wrap mx-auto my-5">
      <TheHeader />
    </div>

    <div class="cover md:flex flex-row">
      <div class="cover-text grid content-center w-full md:w-1/2">
        <div class="ml-auto px-5 w-full md:pl-10 lg:pl-5 lg:w-3/5 2xl:w-2/5">
          <h1 class="text-4xl mb-2">
            {{ article.title }}
          </h1>
          <p>{{ article.description }}</p>
          <p>{{ formatDate(article.createdAt) }}</p>
        </div>
      </div>
      <div class="cover-image w-full md:w-1/2">
        <img :src="article.image" :alt="article.alt" class="cover-image__img">
      </div>
    </div>

    <div class="container-wrap mx-auto my-20">
      <article class="w-4/6 mx-auto">
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

        <nuxt-content :document="article" />

        <prev-next :prev="prev" :next="next" />
      </article>
    </div>
  </div>
</template>

<script>
import { createSEOMeta } from '../../utils/seo'

export default {
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next
    }
  },
  head () {
    const url = this.article.slug
    const { title, description, image } = this.article

    return {
      title: `${title} - Subodh Dahal`,
      meta: createSEOMeta({ title, description, image, url })
    }
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<style>
  .cover h1 {
    font-family: 'Source Serif Pro', serif;
  }
  .nuxt-content h1{
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 25px;
  }
  .nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
  .cover-image__img {
    max-height: 500px;
  }
</style>
