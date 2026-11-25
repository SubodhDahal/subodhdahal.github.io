<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'

const props = defineProps<{ code: string; caption?: string }>()

const colorMode = useColorMode()
const svg = ref('')
const failed = ref(false)
const id = `mermaid-${useId().replace(/\W/g, "")}`

async function render() {
  // Mermaid needs the DOM, so it loads lazily and only on pages with a diagram.
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: colorMode.value === 'dark' ? 'dark' : 'neutral',
    fontFamily: 'inherit',
    // The 200px default wraps short labels onto three or four lines
    flowchart: { wrappingWidth: 400 },
  })
  try {
    svg.value = (await mermaid.render(id, props.code.trim())).svg
    failed.value = false
  }
  catch (err) {
    console.error('Mermaid render failed', err)
    failed.value = true
  }
}

onMounted(render)
watch(() => [props.code, colorMode.value], render)
</script>

<template>
  <!-- .image gives the caption the same style as photo captions -->
  <figure class="image mermaid-diagram my-8">
    <!-- eslint-disable-next-line vue/no-v-html -- SVG comes from Mermaid with securityLevel 'strict' -->
    <div v-if="svg && !failed" class="not-prose flex justify-center [&_svg]:h-auto [&_svg]:max-w-full" v-html="svg" />
    <!-- Before hydration, without JS, or on a syntax error, show the source -->
    <pre v-else><code>{{ props.code }}</code></pre>
    <figcaption v-if="props.caption">{{ props.caption }}</figcaption>
  </figure>
</template>
