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
  <div class="overlay" role="dialog" aria-modal="true" aria-label="Carousel preview" @click.self="emit('close')">
    <button class="close" aria-label="Close preview" @click="emit('close')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>
    </button>
    <button class="nav prev" :disabled="current === 0" aria-label="Previous slide" @click="go(current - 1)">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg>
    </button>
    <div class="phone" :style="{ '--ratio': layout.width / layout.height }">
      <div ref="track" class="track" @scroll.passive="onScroll">
        <div v-for="s in slides" :key="s.id" class="page">
          <SlideCanvas :bitmap="s.bitmap" :layout="layout" :width="1600" />
        </div>
      </div>
      <div class="dots">
        <span v-for="(s, i) in slides" :key="s.id" :class="{ on: i === current }" />
      </div>
    </div>
    <PaddingControl class="pad" :model-value="padPct" @update:model-value="emit('update:padPct', $event)" @click.stop />
    <button class="nav next" :disabled="current === slides.length - 1" aria-label="Next slide" @click="go(current + 1)">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
    </button>
  </div>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,.92); display: flex; align-items: center; justify-content: center; z-index: 50; gap: 1rem; padding-bottom: 104px; }
.phone { width: min(820px, 94vw, calc((100vh - 170px) * var(--ratio))); background: #000; border-radius: 12px; overflow: hidden; }
.track { display: flex; overscroll-behavior-x: contain; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; align-items: center;  }
.track::-webkit-scrollbar { display: none; }
.page { flex: 0 0 100%; scroll-snap-align: center; }
.pad { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); width: min(400px, 92vw); padding: .6rem 1rem .7rem;
  background: rgba(28,28,28,.92); border: 1px solid #333; border-radius: 12px;
  --pad-fg: #eee; --pad-muted: #999; --pad-line: #444; --pad-btn: #262626; }
.dots { display: flex; gap: 5px; justify-content: center; padding: 10px; }
.dots span { width: 6px; height: 6px; border-radius: 50%; background: #777; }
.dots span.on { background: #3897f0; }
.close { position: absolute; top: 10px; right: 12px; display: grid; place-items: center; width: 44px; height: 44px; background: none; border: 0; border-radius: 50%; color: #fff; cursor: pointer; }
.close svg { width: 20px; height: 20px; }
.close:hover { background: rgba(255,255,255,.15); }
.nav { display: grid; place-items: center; background: rgba(255,255,255,.15); color: #fff; border: 0; border-radius: 50%; width: 44px; height: 44px; cursor: pointer; flex: none; }
.nav svg { width: 20px; height: 20px; }
.nav:hover:not(:disabled) { background: rgba(255,255,255,.28); }
.nav:disabled { opacity: .25; cursor: default; }
@media (max-width: 600px) { .nav { display: none; } }
</style>

