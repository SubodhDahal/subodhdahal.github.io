<script setup lang="ts">
// Overrides @nuxtjs/mdc's ProsePre so ```mermaid fences render as diagrams.
// Every other language keeps the default <pre> output.
const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array, default: () => [] },
  meta: { type: String, default: null },
  class: { type: String, default: null },
})
</script>

<template>
  <!-- Text after the language becomes the caption: ```mermaid What this shows -->
  <MermaidDiagram v-if="props.language === 'mermaid'" :code="props.code" :caption="props.meta?.trim() || undefined" />
  <pre v-else :class="props.class"><slot /></pre>
</template>

<style>
pre code .line{display:block}
</style>
