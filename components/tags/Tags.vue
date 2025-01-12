<script setup lang="ts">
import type { Sections } from '~/types'

interface Props {
  section: Sections
}

interface TagState {
  [key: string]: boolean
}

const props = withDefaults(defineProps<Props>(), {
  section: 'blog'
})

const flatten = (items: Array<any>, key = 'tags'): string[] => {
  try {
    return items.reduce((acc: string[], item) => {
      if (!item) return acc

      const tags = item[key]
      if (!tags) return acc

      if (Array.isArray(tags)) {
        return [...acc, ...tags]
      } else if (typeof tags === 'string') {
        return [...acc, tags]
      }

      return acc
    }, [])
  } catch (error) {
    console.error('Error flattening tags:', error)
    return []
  }
}

const { data: tags, error } = await useAsyncData('tags', () =>
  queryContent(props.section)
    .only(['tags'])
    .where({ published: { $ne: false } })
    .find()
)

const articleTags = computed(() => {
  if (error.value) {
    console.error('Error fetching tags:', error.value)
    return []
  }

  const flattenedTags = flatten(tags.value || [], 'tags')
  return [...new Set(flattenedTags)].sort()
})

const tagToggleStates = reactive<TagState>(
  articleTags.value.reduce((acc, tag) => ({
    ...acc,
    [tag]: false
  }), {})
)

const emit = defineEmits<{
  (event: 'tagsSelected', tags: string[]): void
}>()

function toggleTag(tag: string): void {
  if (tag in tagToggleStates) {
    tagToggleStates[tag] = !tagToggleStates[tag]
    const selectedTags = Object.entries(tagToggleStates)
      .filter(([_, isSelected]) => isSelected)
      .map(([tag]) => tag)
    emit('tagsSelected', selectedTags)
  }
}

const replaceHyphen = (tag: string): string => {
  return tag?.replace(/-/g, ' ') ?? ''
}
</script>

<template>
  <ul
    v-if="articleTags.length"
    aria-label="topics"
    class="max-w-4xl flex justify-left md:justify-center items-center gap-2 my-4 mx-0 md:mx-auto border border-transparent rounded-lg overflow-x-scroll md:overflow-visible flex-nowrap md:flex-wrap font-normal md:text-sm sm:text-xl text-white uppercase"
  >
    <li
      v-for="tag in articleTags"
      :key="tag"
      class="flex gap-2 justify-center flex-nowrap"
    >
      <a
        href="#"
        @click.prevent="toggleTag(tag)"
        class="text-blue-700 text-xs bg-blue-200 font-bold px-3 py-1 rounded-xl mr-1 transition-all hover:bg-blue-400 whitespace-nowrap"
        :class="{ '!bg-blue-400': tagToggleStates[tag] }"
      >
        {{ replaceHyphen(tag) }}
      </a>
    </li>
  </ul>
  <p v-else class="text-center text-gray-500">No tags available</p>
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-blue-500;
}
</style>
