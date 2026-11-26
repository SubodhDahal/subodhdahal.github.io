<script setup lang="ts">
// Topic hub: the intro from content/topics/<slug>.md plus every blog post
// whose `topic` frontmatter matches, newest first. One hub per cluster.
const site = 'https://subodhdahal.com'
const slug = String(useRoute().params.slug)
const path = `/topics/${slug}/`
const url = `${site}${path}`

const { data: topic } = await useAsyncData(`topic-${slug}`, () =>
  queryCollection('topics').path(`/topics/${slug}`).first(),
)
if (!topic.value) {
  throw createError({ statusCode: 404, statusMessage: 'Topic not found', fatal: true })
}

const { data: posts } = await useAsyncData(`topic-posts-${slug}`, () =>
  queryCollection('blog')
    .where('topic', '=', slug)
    .select('title', 'description', 'path', 'postDate', 'tags')
    .order('postDate', 'DESC')
    .all(),
)

const title = topic.value.title
const description = topic.value.description

useHead({ title, link: [{ rel: 'canonical', href: url }] })
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: url,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
})
defineOgImage('SimpleBlog', { title })
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage', name: title, description }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: `${site}/` },
      { name: 'Blog', item: `${site}/blog/` },
      { name: title, item: url },
    ],
  }),
  {
    '@type': 'ItemList',
    name: title,
    itemListElement: (posts.value ?? []).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site}${p.path}/`,
      name: p.title,
    })),
  },
])

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div v-if="topic" class="container my-10">
    <div class="mb-8 max-w-2xl mx-auto">
      <p class="text-center font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 dark:text-secondary-400">
        <NuxtLink to="/blog/" class="hover:text-primary-600 dark:hover:text-primary-400">Blog</NuxtLink> · Topic
      </p>
      <h1 class="mt-2 text-3xl font-serif font-bold text-center text-secondary-800 dark:text-secondary-100">
        {{ topic.title }}
      </h1>
      <div class="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
      <ContentRenderer :value="topic" class="blog-page mt-6" />
    </div>

    <ul class="flex flex-col max-w-2xl mx-auto">
      <li
        v-for="post in posts"
        :key="post.path"
        class="py-4 border-b border-secondary-200 dark:border-secondary-700 last:border-b-0 group"
      >
        <NuxtLink
          :to="`${post.path}/`"
          class="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        >
          <div class="flex justify-between items-start gap-4">
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-semibold text-secondary-700 dark:text-secondary-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-150">
                {{ post.title }}
              </h2>
              <p v-if="post.description" class="text-sm mt-1 text-secondary-600 dark:text-secondary-200">
                {{ post.description }}
              </p>
            </div>
            <time
              v-if="post.postDate"
              class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 dark:text-secondary-400 flex-shrink-0 hidden sm:block"
            >
              {{ formatDate(post.postDate) }}
            </time>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <p v-if="slug === 'hiking-photography'" class="mt-10 max-w-2xl mx-auto font-sans text-sm text-secondary-600 dark:text-secondary-300">
      Posting to Instagram? The
      <NuxtLink to="/tools/instagram-carousel/" class="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200">carousel white border tool</NuxtLink>
      puts mixed portrait and landscape photos on one canvas so nothing gets cropped.
    </p>
  </div>
</template>
