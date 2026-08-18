<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = withDefaults(defineProps<{
  article: any
  showChildren?: boolean
}>(), {
  showChildren: true,
})

const router = useRouter()
const activeId = ref('')

const tocLinks = computed<TocLink[]>(() => {
  const links = props.article?.body?.toc?.links ?? []
  if (!props.showChildren) return links

  const flat: TocLink[] = []
  const walk = (items: TocLink[]) => {
    for (const item of items) {
      flat.push(item)
      if (item.children?.length) walk(item.children)
    }
  }
  walk(links)
  return flat
})

const onClick = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    router.push({ hash: `#${id}` })
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
      }
    })
  }, {
    rootMargin: '-15% 0px -70% 0px',
    threshold: 0,
  })

  tocLinks.value.forEach((link) => {
    const el = document.getElementById(link.id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <nav class="max-h-[calc(100vh-7rem)] overflow-y-auto">
    <h4 class="font-sans font-medium text-xs uppercase tracking-[0.06em] text-secondary-500 mb-3">
      Table of Contents
    </h4>
    <ul class="space-y-1">
      <li
        v-for="link in tocLinks"
        :key="link.id"
        :class="[
          link.depth === 3 ? 'ml-3 text-xs' : 'text-sm',
          activeId === link.id ? 'border-l-2 border-primary-500' : 'border-l-2 border-transparent',
        ]"
      >
        <a
          :href="`#${link.id}`"
          class="block py-1 pl-3 transition-all duration-150 hover:translate-x-px"
          :class="activeId === link.id
            ? 'text-secondary-900 dark:text-secondary-50'
            : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300'
          "
          @click.prevent="onClick(link.id)"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
