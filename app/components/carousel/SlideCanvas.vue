<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Layout } from '~/lib/carousel/layout'
import { drawSlide } from '~/lib/carousel/render'

const props = defineProps<{ bitmap: ImageBitmap; layout: Layout; width: number }>()
const el = ref<HTMLCanvasElement>()
const draw = () => el.value && drawSlide(el.value, props.bitmap, props.layout, props.width)
onMounted(draw)
watch(() => [props.bitmap, props.layout, props.width], draw)
</script>

<template>
  <canvas ref="el" class="slide-canvas" />
</template>

<style scoped>
.slide-canvas {
  display: block;
  width: 100%;
  height: auto;
  background: #fff;
}
</style>
