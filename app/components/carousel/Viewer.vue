<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Layout } from '~/lib/carousel/layout'
import SlideCanvas from './SlideCanvas.vue'
import PaddingControl from './PaddingControl.vue'

const props = defineProps<{
  slides: { id: number; bitmap: ImageBitmap }[]
  layout: Layout
  start: number
  padPct: number
}>()
const emit = defineEmits<{ close: []; 'update:padPct': [value: number] }>()

const round = 'grid size-11 cursor-pointer place-items-center rounded-full border-0 text-white'
const nav = 'flex-none bg-white/15 hover:not-disabled:bg-white/30 disabled:cursor-default disabled:opacity-25 max-sm:hidden'

const track = ref<HTMLElement>()
const current = ref(props.start)

function go(i: number) {
  const n = Math.max(0, Math.min(props.slides.length - 1, i))
  track.value?.scrollTo({ left: n * track.value.clientWidth, behavior: 'smooth' })
}
function onScroll() {
  if (!track.value) return
  current.value = Math.round(track.value.scrollLeft / track.value.clientWidth)
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') go(current.value + 1)
  if (e.key === 'ArrowLeft') go(current.value - 1)
}
let prevOverflow = ''
onMounted(async () => {
  window.addEventListener('keydown', onKey)
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  track.value?.scrollTo({ left: props.start * track.value.clientWidth })
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = prevOverflow
})
</script>

<template>
  <div class="overlay fixed inset-0 z-50 flex items-center justify-center gap-4 bg-black/92 pb-[104px]" role="dialog" aria-modal="true" aria-label="Carousel preview" @click.self="emit('close')">
    <button :class="[round, 'absolute top-2.5 right-3 bg-transparent hover:bg-white/15']" aria-label="Close preview" @click="emit('close')">
      <svg class="size-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>
    </button>
    <button :class="[round, nav]" :disabled="current === 0" aria-label="Previous slide" @click="go(current - 1)">
      <svg class="size-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg>
    </button>
    <div class="phone w-[min(820px,94vw,calc((100vh_-_170px)_*_var(--ratio)))] overflow-hidden rounded-xl bg-black" :style="{ '--ratio': layout.width / layout.height }">
      <div ref="track" class="track flex snap-x snap-mandatory items-center overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" @scroll.passive="onScroll">
        <div v-for="s in slides" :key="s.id" class="flex-[0_0_100%] snap-center">
          <SlideCanvas :bitmap="s.bitmap" :layout="layout" :width="1600" />
        </div>
      </div>
      <div class="dots flex justify-center gap-[5px] p-2.5">
        <span v-for="(s, i) in slides" :key="s.id" class="size-1.5 rounded-full" :class="i === current ? 'on bg-primary-500' : 'bg-neutral-500'" />
      </div>
    </div>
    <PaddingControl
      class="absolute bottom-3.5 left-1/2 w-[min(400px,92vw)] -translate-x-1/2 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 pt-2.5 pb-3"
      on-dark :model-value="padPct" @update:model-value="emit('update:padPct', $event)" @click.stop
    />
    <button :class="[round, nav]" :disabled="current === slides.length - 1" aria-label="Next slide" @click="go(current + 1)">
      <svg class="size-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
    </button>
  </div>
</template>
