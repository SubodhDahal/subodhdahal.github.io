<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  quantity: number;
  content: string;
  showDescription?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  quantity: 100,
  content: "blog",
  showDescription: true,
});

const { articles, isLoading, error } = useArticles({ quantity: props.quantity });

// Intersection Observer for animations
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Observe all article cards
  document.querySelectorAll('.article-card').forEach(card => {
    observer.observe(card);
    card.classList.add('article-fade-in');
  });
});
</script>

<template>
  <div>
    <div v-if="error" class="text-red-500 text-center my-4">
      {{ error }}
    </div>

    <div v-else-if="isLoading" class="text-center my-4">
      Loading articles...
    </div>

    <ul v-else-if="articles.length" class="flex flex-col max-w-2xl mx-auto">
      <li
        v-for="article in articles"
        :key="article.url || article.path"
        class="article-card py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
      >
        <NuxtLink
          :to="article.url || article.path"
          :target="article.url ? '_blank' : '_self'"
          class="block hover:opacity-80 transition-opacity duration-150"
        >
          <div>
            <h2 class="text-lg font-semibold">
              {{ article.title }}
            </h2>
            <p
              v-if="showDescription && article.description"
              class="text-sm mt-1 text-gray-600 dark:text-white"
            >
              {{ article.description }}
            </p>
            <ArticleTags
              v-if="article.tags?.length"
              :tags="article.tags"
              class="mt-1"
            />
          </div>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-center text-gray-500">No articles found</p>
  </div>
</template>

<style scoped>
.article-fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.article-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.article-card:nth-child(1) { transition-delay: 0s; }
.article-card:nth-child(2) { transition-delay: 0.1s; }
.article-card:nth-child(3) { transition-delay: 0.2s; }
.article-card:nth-child(4) { transition-delay: 0.3s; }
.article-card:nth-child(5) { transition-delay: 0.4s; }
</style>
