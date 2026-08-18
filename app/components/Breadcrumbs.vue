<template>
  <nav aria-label="Breadcrumb" class="container py-4">
    <ol class="flex text-sm text-secondary-600 dark:text-secondary-300" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <NuxtLink to="/" class="hover:text-primary-600" itemprop="item">
          <span itemprop="name">Home</span>
        </NuxtLink>
        <meta itemprop="position" content="1" />
      </li>
      <li class="flex items-center" aria-hidden="true">
        <span aria-hidden="true" class="h-4 w-px bg-secondary-200 dark:bg-secondary-700 mx-2 self-center"></span>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <NuxtLink to="/blog/" class="hover:text-primary-600" itemprop="item">
          <span itemprop="name">Blog</span>
        </NuxtLink>
        <meta itemprop="position" content="2" />
      </li>
      <template v-if="currentPage">
        <li class="flex items-center" aria-hidden="true">
          <span aria-hidden="true" class="h-4 w-px bg-secondary-200 dark:bg-secondary-700 mx-2 self-center"></span>
        </li>
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="truncate">
          <span itemprop="name">{{ currentPage }}</span>
          <meta itemprop="position" content="3" />
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  currentPage?: string
}>()
</script>
