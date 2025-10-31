<script setup lang="ts">
const props = withDefaults(defineProps<{
  // activeTocId: string
  article: any
  showChildren: boolean
}>(), {})

const router = useRouter()

const tocLinks = computed(() => props.article?.body.toc.links ?? [])

const onClick = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    router.push({ hash: `#${id}` })
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <div class="overflow-auto">
    <h4 class="text-lg font-semibold">Table of Contents</h4>
    <nav class="mt-4">
      <ul class="pl-4 space-y-2">
        <li
          v-for="{ id, text, children } in tocLinks"
          :id="`toc-${id}`"
          :key="id"
          class="cursor-pointer text-sm last:mb-0"
          @click="onClick(id)"
        >
          {{ text }}
          <ul v-if="showChildren && children" class="my-2 ml-3 space-y-1">
            <li
              v-for="{ id: childId, text: childText } in children"
              :id="`toc-${childId}`"
              :key="childId"
              class="cursor-pointer text-xs last:mb-0"
              @click.stop="onClick(childId)"
            >
              {{ childText }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
