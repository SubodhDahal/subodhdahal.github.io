<script setup lang="ts">
import type { Sections } from '~/types'

interface Props {
  section: Sections
}

const props = defineProps<Props>()

const flatten = (tags: Array<any>, key = 'tags') => {
  const _tags = tags
    .map((tag) => {
      let _tag = tag
      if (tag.tags) {
        const flattened = flatten(tag[key])
        _tag = flattened
      }
      return _tag
    })
    .flat(1)

  return _tags
}

const { data: tags } = await useAsyncData('tags', () => queryContent(props.section)
  .only(["tags"])
  .where({ published: { $ne: false } })
  .find())

const articleTags = [...new Set(flatten(tags.value, 'tags'))]

const tagToggleStates = reactive({...articleTags.reduce((acc, tag) => ({...acc, [tag]: false}), {})})
const emit = defineEmits(['tagsSelected'])

function toggleTag (tag) {
  tagToggleStates[tag] = !tagToggleStates[tag]
  const selectedTags = Object.keys(tagToggleStates).filter(tag => tagToggleStates[tag])
  emit('tagsSelected', selectedTags)
}

const sortedArticleTags = articleTags.sort()
</script>

<template>
  <ul
    aria-label="topics" class="max-w-4xl flex justify-left md:justify-center items-center gap-2 my-4 mx-0 md:mx-auto border border-transparent rounded-lg overflow-x-scroll md:overflow-visible flex-nowrap md:flex-wrap font-normal md:text-sm sm:text-xl text-white uppercase"
  >
    <li
      v-for="(tag, i) in sortedArticleTags"
      :key="tag+i" class="flex gap-2 justify-center flex-nowrap "
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
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-blue-500;
}
</style>
