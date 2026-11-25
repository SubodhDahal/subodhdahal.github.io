<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, shallowRef, watch } from 'vue'
import draggable from 'vuedraggable'
import JSZip from 'jszip'
import SlideCanvas from './SlideCanvas.vue'
import Viewer from './Viewer.vue'
import PaddingControl from './PaddingControl.vue'
import { computeLayout, type ExportWidth } from '~/lib/carousel/layout'
import { encodeSlide, formatBytes, loadBitmap, slideFileName, type Format } from '~/lib/carousel/render'

interface Slide { id: number; name: string; bitmap: ImageBitmap }

const MAX_SLIDES = 20
const MAX_BYTES = 8 * 1024 * 1024

const slides = shallowRef<Slide[]>([])
const padPct = ref(5)
const allow34 = ref(false)
const exportWidth = ref<ExportWidth>('original')
const ratio = ref<string>('auto')
const format = ref<Format>('jpeg')
const notice = ref('')
const viewerAt = ref<number | null>(null)
const busy = ref(false)
const over = ref(false)
const saved = ref('')
let overDepth = 0
let savedTimer: number | undefined
const sizes = reactive<Record<number, number>>({})
let nextId = 1

const layout = computed(() => computeLayout(slides.value.map((s) => s.bitmap), {
  padPct: padPct.value, allow34: allow34.value, exportWidth: exportWidth.value,
  ratio: ratio.value === 'auto' ? null : Number(ratio.value),
}))

async function addFiles(files: FileList | File[]) {
  const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
  const skipped = files.length - list.length
  const room = MAX_SLIDES - slides.value.length
  const added: Slide[] = []
  const failed: string[] = []
  for (const f of list.slice(0, Math.max(room, 0))) {
    try { added.push({ id: nextId++, name: f.name, bitmap: await loadBitmap(f) }) }
    catch { failed.push(f.name) }
  }
  slides.value = [...slides.value, ...added]
  const msgs: string[] = []
  if (list.length > room) msgs.push(`Instagram allows ${MAX_SLIDES} slides; ${list.length - Math.max(room, 0)} ignored.`)
  if (skipped) msgs.push(`${skipped} non-image file(s) skipped.`)
  if (failed.length) msgs.push(`Couldn't decode: ${failed.join(', ')}.`)
  notice.value = msgs.join(' ')
}
function onPick(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) addFiles(input.files)
  input.value = ''
}
const hasFiles = (e: DragEvent) => !!e.dataTransfer?.types.includes('Files')
function onEnter(e: DragEvent) { if (hasFiles(e)) { overDepth++; over.value = true } }
function onLeave(e: DragEvent) { if (hasFiles(e) && --overDepth <= 0) { overDepth = 0; over.value = false } }
function onDrop(e: DragEvent) {
  overDepth = 0; over.value = false
  if (e.dataTransfer?.files.length) addFiles(e.dataTransfer.files)
}
function remove(id: number) {
  slides.value = slides.value.filter((s) => s.id !== id)
  delete sizes[id]
}
function clearAll() {
  clearTimeout(timer)
  run++ // cancel any in-flight size estimate before the bitmaps are closed
  slides.value.forEach((s) => s.bitmap.close())
  slides.value = []
  Object.keys(sizes).forEach((k) => delete sizes[+k])
  notice.value = ''
}

// Debounced file-size estimates for the badges
let timer: number | undefined
let run = 0
watch([slides, layout, format], () => {
  clearTimeout(timer)
  timer = window.setTimeout(async () => {
    const me = ++run
    const l = layout.value
    if (!l) return
    for (const s of slides.value) {
      if (me !== run) return // slides were cleared (bitmaps closed) while we were encoding
      const blob = await encodeSlide(s.bitmap, l, format.value)
      if (me !== run) return
      sizes[s.id] = blob.size
    }
  }, 350)
})
onBeforeUnmount(() => { clearTimeout(timer); clearTimeout(savedTimer) })

function save(blob: Blob, name: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 2000)
}
async function downloadOne(i: number) {
  const l = layout.value; if (!l) return
  const s = slides.value[i]
  save(await encodeSlide(s.bitmap, l, format.value), slideFileName(i, s.name, format.value))
}
async function downloadZip() {
  const l = layout.value; if (!l) return
  busy.value = true
  try {
    const zip = new JSZip()
    for (const [i, s] of slides.value.entries()) {
      zip.file(slideFileName(i, s.name, format.value), await encodeSlide(s.bitmap, l, format.value))
    }
    save(await zip.generateAsync({ type: 'blob' }), 'carousel.zip')
    saved.value = `Saved ${slides.value.length} ${slides.value.length === 1 ? 'slide' : 'slides'} · ${l.width}×${l.height}`
    clearTimeout(savedTimer)
    savedTimer = window.setTimeout(() => { saved.value = '' }, 3000)
  } finally { busy.value = false }
}

const COMMON: [number, number][] = [[1, 1], [5, 4], [4, 3], [3, 2], [16, 9], [4, 5], [3, 4], [2, 3], [9, 16]]
function aspectLabel(w: number, h: number) {
  const r = w / h
  const hit = COMMON.find(([a, b]) => Math.abs(r - a / b) / (a / b) < 0.005)
  if (hit) return `${hit[0]}:${hit[1]}`
  return r >= 1 ? `${r.toFixed(2)}:1` : `1:${(1 / r).toFixed(2)}`
}

const ratioLabel = computed(() => {
  const l = layout.value; if (!l) return ''
  return aspectLabel(l.width, l.height)
})
const overLimit = computed(() => slides.value.some((s) => (sizes[s.id] ?? 0) > MAX_BYTES))

// Shared utility strings for the repeated control styles
const btn = 'min-h-10 cursor-pointer rounded-lg border border-secondary-200 bg-white px-3 py-1.5 transition-colors hover:not-disabled:border-secondary-400 active:not-disabled:translate-y-px disabled:cursor-default disabled:opacity-60 dark:border-secondary-700 dark:bg-secondary-800 dark:hover:not-disabled:border-secondary-500'
const btnPrimary = 'min-h-10 cursor-pointer rounded-lg border border-primary-600 bg-primary-600 px-3 py-1.5 font-semibold text-white transition hover:not-disabled:brightness-110 active:not-disabled:translate-y-px disabled:cursor-default disabled:opacity-60'
const field = 'flex flex-col gap-1 text-sm text-secondary-500 dark:text-secondary-400'
const select = 'min-h-10 w-full cursor-pointer rounded-lg border border-secondary-200 bg-white px-3 py-1.5 text-sm text-secondary-800 transition-colors hover:border-secondary-400 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:border-secondary-500'
const callout = 'mt-3 flex items-start gap-2 rounded-lg border border-orange-800/35 bg-orange-800/8 px-3 py-2.5 text-sm leading-snug text-pretty text-orange-800 dark:border-orange-400/35 dark:bg-orange-400/8 dark:text-orange-400 [&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:flex-none'
const readoutItem = 'flex flex-col gap-0.5 border-secondary-200 px-3.5 first:pl-0 first:border-l-0 border-l sm:px-5 dark:border-secondary-700'
const readoutLabel = 'text-xs tracking-wider text-secondary-500 uppercase dark:text-secondary-400'
const readoutValue = 'text-base font-semibold tabular-nums sm:text-lg'
</script>

<template>
  <div class="carousel-tool font-sans text-secondary-800 dark:text-secondary-50" @dragover.prevent @dragenter.prevent="onEnter" @dragleave="onLeave" @drop.prevent="onDrop">
    <label
      class="drop group flex cursor-pointer flex-wrap items-center justify-center gap-2.5 rounded-xl border-2 border-dashed p-4 transition-colors has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-primary-500"
      :class="[
        slides.length ? '' : 'py-16',
        over ? 'border-primary-500 bg-primary-500/8' : 'border-secondary-200 hover:border-primary-500 focus-within:border-primary-500 dark:border-secondary-700',
      ]"
    >
      <svg v-if="!slides.length" class="mech mx-auto mb-1 h-[72px] w-24 basis-full" viewBox="0 0 96 72" fill="none" aria-hidden="true">
        <rect class="fill-white stroke-secondary-200 stroke-[1.5] dark:stroke-secondary-600" x="14" y="2" width="68" height="68" rx="3" />
        <rect
          class="origin-[48px_36px] fill-secondary-500 opacity-55 transition-transform duration-500 ease-out group-focus-within:scale-100 group-hover:scale-100 motion-reduce:transition-none"
          :class="over ? 'scale-100' : 'scale-[.7]'"
          x="22" y="20" width="52" height="32" rx="1.5"
        />
      </svg>
      <input class="sr-only" type="file" accept="image/*" multiple @change="onPick" />
      <template v-if="over"><strong>Drop to add</strong></template>
      <template v-else><strong>Choose images</strong> or drop them here</template>
      <small class="text-secondary-500 dark:text-secondary-400">{{ slides.length }}/{{ MAX_SLIDES }}</small>
    </label>
    <p v-if="notice" :class="[callout, 'notice']" role="status"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.2" /><path d="M8 7.2v3.6M8 5v.1" /></svg><span>{{ notice }}</span></p>

    <template v-if="layout">
      <section class="mt-5 grid grid-cols-2 items-end gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-4">
        <PaddingControl v-model="padPct" class="col-span-2 sm:flex-[1_1_280px]" />
        <label :class="field">
          Aspect ratio
          <select v-model="ratio" :class="select">
            <option value="auto">Auto (fit images)</option>
            <option value="0.8">4:5 portrait</option>
            <option value="1">1:1 square</option>
            <option value="1.91">1.91:1 landscape</option>
            <option value="0.75">3:4 (app only)</option>
          </select>
        </label>
        <label :class="field">
          Export width
          <select v-model="exportWidth" :class="select">
            <option value="original">Original</option>
            <option :value="1080">1080 (best for Instagram)</option>
            <option :value="1440">1440</option>
          </select>
        </label>
        <label :class="field">
          Format
          <select v-model="format" :class="select">
            <option value="jpeg">JPEG 95%</option>
            <option value="png">PNG (text/graphics)</option>
          </select>
        </label>
        <label class="col-span-2 flex min-h-10 cursor-pointer items-center gap-2 sm:col-auto">
          <input v-model="allow34" type="checkbox" class="m-0 size-[1.1rem] flex-none accent-primary-600" /> Allow 3:4 (app only)
        </label>
      </section>

      <div class="info mt-4 mb-1">
        <dl class="m-0 flex flex-wrap gap-y-2.5 border-y border-secondary-200 py-3 dark:border-secondary-700">
          <div :class="readoutItem"><dt :class="readoutLabel">Canvas</dt><dd :class="readoutValue" class="m-0">{{ layout.width }} × {{ layout.height }} px</dd></div>
          <div :class="readoutItem"><dt :class="readoutLabel">Aspect ratio</dt><dd :class="readoutValue" class="m-0">{{ ratioLabel }}</dd></div>
          <div :class="readoutItem"><dt :class="readoutLabel">Slides</dt><dd :class="readoutValue" class="m-0">{{ slides.length }}</dd></div>
        </dl>
        <p v-if="layout.clamped && ratio === 'auto'" class="mt-2.5 max-w-[70ch] text-sm text-pretty text-secondary-500 dark:text-secondary-400">
          Extra {{ layout.clamped === 'tall' ? 'side' : 'top/bottom' }} padding added to fit Instagram's {{ allow34 ? '3:4' : '4:5' }}–1.91:1 range.
        </p>
      </div>
      <p v-if="overLimit" :class="callout" role="alert"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2.2l6.2 11H1.8z" /><path d="M8 6.8v3M8 12v.1" /></svg><span>Some files exceed Instagram's 8 MB limit. Use JPEG or a smaller export width.</span></p>

      <draggable v-model="slides" item-key="id" class="grid mt-4 mb-1 grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:gap-4" :animation="150" ghost-class="opacity-40">
        <template #item="{ element, index }">
          <figure
            class="card relative m-0 min-w-0 animate-settle cursor-grab overflow-hidden rounded-[10px] border border-secondary-200 bg-white [animation-delay:calc(var(--i)*40ms)] motion-reduce:animate-none dark:border-secondary-700 dark:bg-secondary-800"
            :style="{ '--i': Math.min(index, 8) }"
          >
            <span class="num absolute top-1.5 left-1.5 z-10 rounded-full bg-black/70 px-2 text-xs leading-[1.4] text-white tabular-nums">{{ index + 1 }}</span>
            <button
              class="x absolute top-1 right-1 z-10 grid size-7 min-h-0 cursor-pointer place-items-center rounded-full border-0 bg-black/70 p-0 text-white transition-colors after:absolute after:-inset-2 after:content-[''] hover:bg-black/90"
              :aria-label="`Remove ${element.name}`" @click="remove(element.id)"
            >
              <svg class="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" /></svg>
            </button>
            <div class="thumb cursor-zoom-in border-b border-secondary-200 dark:border-secondary-700" @click="viewerAt = index">
              <SlideCanvas :bitmap="element.bitmap" :layout="layout" :width="480" />
            </div>
            <figcaption class="flex flex-col gap-0.5 px-2.5 pt-2 pb-2.5 text-xs">
              <span class="name truncate" :title="element.name">{{ element.name }}</span>
              <span class="meta flex flex-col text-secondary-500 tabular-nums dark:text-secondary-400">
                <span>{{ element.bitmap.width }}×{{ element.bitmap.height }} · {{ aspectLabel(element.bitmap.width, element.bitmap.height) }}</span>
                <span :class="(sizes[element.id] ?? 0) > MAX_BYTES ? 'font-semibold text-red-600 dark:text-red-400' : ''">{{ sizes[element.id] ? formatBytes(sizes[element.id]) : '…' }}</span>
              </span>
              <button
                class="link cursor-pointer self-start border-0 bg-transparent p-0 py-1.5 text-primary-700 underline-offset-[.2em] hover:underline pointer-coarse:py-2.5 dark:text-primary-300"
                :aria-label="`Download ${element.name}`" @click="downloadOne(index)"
              >Download</button>
            </figcaption>
          </figure>
        </template>
      </draggable>
      <p class="mt-2 max-w-[70ch] text-sm text-pretty text-secondary-500 dark:text-secondary-400">Drag to reorder. The first slide sets the frame on Instagram. Click a slide to preview swiping.</p>

      <div class="mt-4 flex flex-wrap items-center gap-2.5">
        <button :class="[btnPrimary, 'max-sm:basis-full']" :disabled="busy" @click="downloadZip">{{ busy ? 'Building…' : 'Download all as ZIP' }}</button>
        <button :class="[btn, 'max-sm:flex-auto']" @click="viewerAt = 0">Preview carousel</button>
        <button :class="[btn, 'max-sm:flex-auto']" @click="clearAll">Clear</button>
        <span class="inline-flex items-center gap-1.5 text-sm text-secondary-500 tabular-nums max-sm:basis-full dark:text-secondary-400" role="status" aria-live="polite">
          <template v-if="saved">
            <svg class="size-3.5 text-primary-700 dark:text-primary-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
            {{ saved }}
          </template>
        </span>
      </div>
    </template>

    <Viewer v-if="viewerAt !== null && layout" :slides="slides" :layout="layout" :start="viewerAt" v-model:pad-pct="padPct" @close="viewerAt = null" />
  </div>
</template>
