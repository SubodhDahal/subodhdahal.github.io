<template>
  <div>
    <div class="container-wrap mx-auto my-5">
      <TheHeader />
    </div>

    <div class="cover md:flex flex-row">
      <div class="cover-text grid content-center w-full md:w-1/2">
        <div class="ml-auto px-5 w-full md:pl-10 lg:pl-5 lg:w-3/5 2xl:w-2/5">
          <h1 class="text-5xl mb-2">
            {{ article.title }}
          </h1>
          <p class="mb-2">
            {{ article.description }}
          </p>
          <small>Posted on {{ formatDate(article.postedAt) }}</small>
        </div>
      </div>
      <div class="cover-image w-full md:w-1/2">
        <nuxt-picture :src="article.image" :alt="article.alt" class="cover-image__img" />
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

<style >
  .cover h1 {
    font-family: 'Source Serif Pro', serif;
    line-height: 1.2;
  }
  .cover p {
    font-size: 18px;
  }
  .cover-image__img img {
    max-height: 500px;
  }
  .nuxt-content {
    font-size: 18px;
  }
  .nuxt-content h1, h2 {
    font-family: 'Source Serif Pro', serif;
    font-weight: bold;
  }
  .nuxt-content h1 {
    font-size: 28px;
  }
  .nuxt-content h2 {
    font-size: 25px;
  }
  .nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
  }
  .nuxt-content p, .nuxt-content ul {
    margin-bottom: 20px;
    line-height: 1.7em;
  }
  .nuxt-content figure.image {
    width: 500px;
    margin: 0 auto 20px auto;
    text-align: center;
  }
  .nuxt-content figure.image.w-full {
    width: 100%;
  }
  .nuxt-content figure.image figcaption {
    background-color: #222;
    color: #fff;
    font: italic 13px sans-serif;
    padding: 4px;
  }
  .nuxt-content figure.quote {
    font-family: 'Source Serif Pro', serif;
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 20px 0.7em 10px;
    quotes: "\201C""\201D""\2018""\2019";
  }
  .nuxt-content figure.quote:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }
  .nuxt-content figure.quote blockquote {
    margin-left: 40px;
  }
  .nuxt-content figure.quote p {
    display: inline;
  }
  .nuxt-content figure.quote figcaption {
    text-align: right;
  }
</style>
