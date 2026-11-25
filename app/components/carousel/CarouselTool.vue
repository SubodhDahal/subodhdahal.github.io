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
</script>

<template>
  <div class="carousel-tool" @dragover.prevent @dragenter.prevent="onEnter" @dragleave="onLeave" @drop.prevent="onDrop">
    <label class="drop" :class="{ empty: !slides.length, over }">
      <svg v-if="!slides.length" class="mech" viewBox="0 0 96 72" fill="none" aria-hidden="true">
        <rect class="mech-canvas" x="14" y="2" width="68" height="68" rx="3" />
        <rect class="mech-photo" x="22" y="20" width="52" height="32" rx="1.5" />
      </svg>
      <input type="file" accept="image/*" multiple @change="onPick" />
      <template v-if="over"><strong>Drop to add</strong></template>
      <template v-else><strong>Choose images</strong> or drop them here</template>
      <small>{{ slides.length }}/{{ MAX_SLIDES }}</small>
    </label>
    <p v-if="notice" class="notice">{{ notice }}</p>

    <template v-if="layout">
      <section class="controls">
        <PaddingControl v-model="padPct" class="grow" />
        <label class="ctl">
          Aspect ratio
          <select v-model="ratio">
            <option value="auto">Auto (fit images)</option>
            <option value="0.8">4:5 portrait</option>
            <option value="1">1:1 square</option>
            <option value="1.91">1.91:1 landscape</option>
            <option value="0.75">3:4 (app only)</option>
          </select>
        </label>
        <label class="ctl">
          Export width
          <select v-model="exportWidth">
            <option value="original">Original</option>
            <option :value="1080">1080 (best for Instagram)</option>
            <option :value="1440">1440</option>
          </select>
        </label>
        <label class="ctl">
          Format
          <select v-model="format">
            <option value="jpeg">JPEG 95%</option>
            <option value="png">PNG (text/graphics)</option>
          </select>
        </label>
        <label class="ctl check"><input v-model="allow34" type="checkbox" /> Allow 3:4 (app only)</label>
      </section>

      <p class="info">
        Canvas <b>{{ layout.width }} × {{ layout.height }}</b> ({{ ratioLabel }})
        <span v-if="layout.clamped && ratio === 'auto'"> · extra {{ layout.clamped === 'tall' ? 'side' : 'top/bottom' }} padding added to fit Instagram's {{ allow34 ? '3:4' : '4:5' }}–1.91:1 range</span>
      </p>
      <p v-if="overLimit" class="warn">Some files exceed Instagram's 8 MB limit. Use JPEG or a smaller export width.</p>

      <draggable v-model="slides" item-key="id" class="grid" :animation="150" ghost-class="ghost">
        <template #item="{ element, index }">
          <figure class="card" :style="{ '--i': Math.min(index, 8) }">
            <span class="num">{{ index + 1 }}</span>
            <button class="x" :aria-label="`Remove ${element.name}`" @click="remove(element.id)">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" /></svg>
            </button>
            <div class="thumb" @click="viewerAt = index">
              <SlideCanvas :bitmap="element.bitmap" :layout="layout" :width="480" />
            </div>
            <figcaption>
              <span class="name" :title="element.name">{{ element.name }}</span>
              <span class="meta">
                <span class="line">{{ element.bitmap.width }}×{{ element.bitmap.height }} · {{ aspectLabel(element.bitmap.width, element.bitmap.height) }}</span>
                <span class="line" :class="{ bad: (sizes[element.id] ?? 0) > MAX_BYTES }">{{ sizes[element.id] ? formatBytes(sizes[element.id]) : '…' }}</span>
              </span>
              <button class="link" :aria-label="`Download ${element.name}`" @click="downloadOne(index)">Download</button>
            </figcaption>
          </figure>
        </template>
      </draggable>
      <p class="hint">Drag to reorder. The first slide sets the frame on Instagram. Click a slide to preview swiping.</p>

      <div class="actions">
        <button class="primary" :disabled="busy" @click="downloadZip">{{ busy ? 'Building…' : 'Download all as ZIP' }}</button>
        <button @click="viewerAt = 0">Preview carousel</button>
        <button @click="clearAll">Clear</button>
        <span class="saved" role="status" aria-live="polite">
          <template v-if="saved">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
            {{ saved }}
          </template>
        </span>
      </div>
    </template>

    <Viewer v-if="viewerAt !== null && layout" :slides="slides" :layout="layout" :start="viewerAt" v-model:pad-pct="padPct" @close="viewerAt = null" />
  </div>
</template>

<style>
.carousel-tool {
/* Site tokens (see app/assets/css/main.css); dark mode follows the site's .dark class */
& {
  --fg: var(--color-secondary-800); --card: #fff; --line: var(--color-secondary-200); --muted: var(--color-secondary-500);
  --accent: var(--color-primary-500);       /* borders, hover cues, active dot */
  --accent-fill: var(--color-primary-600);  /* filled button (white text >= 4.5:1) */
  --link: var(--color-primary-700);
  --warn: #b3380a; --bad: #dc2626;
  font-family: var(--font-sans);
  color: var(--fg);
}
:where(.dark) & {
  --fg: var(--color-secondary-50); --card: var(--color-secondary-800); --line: var(--color-secondary-700); --muted: var(--color-secondary-400);
  --link: var(--color-primary-300); --accent-fill: var(--color-primary-600); --warn: #fb923c; --bad: #f87171;
}
*, *::before, *::after { box-sizing: border-box; }
::selection { background: color-mix(in srgb, var(--accent) 35%, transparent); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
padding-bottom: 4rem;

.drop { display:flex; gap:.6rem; align-items:center; justify-content:center; flex-wrap:wrap; border:2px dashed var(--line); border-radius:12px; padding:1rem; cursor:pointer; transition: border-color .15s; }
.drop.empty { padding: 4rem 1rem; }
.drop:hover, .drop:focus-within { border-color: var(--accent); }
.drop:has(input:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }
.drop input { position:absolute; width:1px; height:1px; opacity:0; overflow:hidden; clip-path: inset(50%); }
.drop small { color: var(--muted); }
.drop.over { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
.mech { flex: 0 0 100%; width: 96px; height: 72px; margin: 0 auto .3rem; }
.mech-canvas { fill: #fff; stroke: var(--line); stroke-width: 1.5; }
.mech-photo { fill: var(--muted); opacity: .55; transform-origin: 48px 36px; transform: scale(.7); transition: transform .5s cubic-bezier(.16,1,.3,1); }
.drop:hover .mech-photo, .drop.over .mech-photo, .drop:focus-within .mech-photo { transform: scale(1); }
.notice, .warn { color:var(--warn); font-size:.9rem; }

.controls { display:flex; flex-wrap:wrap; gap:1rem 1.5rem; margin:1.2rem 0 .6rem; align-items:flex-end; }
.ctl { display:flex; flex-direction:column; gap:.3rem; font-size:.85rem; color:var(--muted); }
.ctl.grow, .padctl.grow { flex:1 1 280px; }
.ctl-head { display:flex; justify-content:space-between; gap:.5rem; }
.ctl.check { flex-direction:row; align-items:center; gap:.5rem; color:var(--fg); min-height:2.4rem; cursor:pointer; }
.ctl b { color:var(--fg); font-variant-numeric: tabular-nums; }
input[type=range], input[type=checkbox] { accent-color: var(--accent-fill); }
input[type=range] { width:100%; margin:.35rem 0; }
input[type=checkbox] { width:1.1rem; height:1.1rem; margin:0; flex:none; }
select, button { font:inherit; padding:.45rem .7rem; min-height:2.4rem; border:1px solid var(--line); border-radius:8px; background:var(--card); color:var(--fg); cursor:pointer; transition: border-color .15s, background-color .15s, filter .15s; }
select:hover, button:hover:not(:disabled) { border-color: var(--muted); }
button.primary { background:var(--accent-fill); border-color:var(--accent-fill); color:#fff; font-weight:600; }
button.primary:hover:not(:disabled) { filter: brightness(1.08); border-color: var(--accent-fill); }
button:active:not(:disabled) { transform: translateY(1px); }
button:disabled { opacity:.6; cursor:default; }

.info { font-size:.9rem; color:var(--muted); margin:.4rem 0; }
.info b { color:var(--fg); font-variant-numeric: tabular-nums; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:1rem; margin:1rem 0 .4rem; }
.card { position:relative; margin:0; background:var(--card); border:1px solid var(--line); border-radius:10px; overflow:hidden; cursor:grab; min-width:0; }
.card.ghost { opacity:.4; }
@keyframes settle { from { opacity:0; transform: translateY(6px) scale(.98); } }
.card { animation: settle .35s cubic-bezier(.16,1,.3,1) both; animation-delay: calc(var(--i, 0) * 40ms); }
.thumb { cursor:zoom-in; border-bottom:1px solid var(--line); }
.num { position:absolute; top:6px; left:6px; background:rgba(0,0,0,.7); color:#fff; font-size:.75rem; line-height:1.4; border-radius:99px; padding:1px 8px; z-index:1; font-variant-numeric: tabular-nums; }
.x { position:absolute; top:4px; right:4px; z-index:1; display:grid; place-items:center; width:28px; height:28px; min-height:0; padding:0; border-radius:99px; background:rgba(0,0,0,.7); color:#fff; border:0; }
.x::after { content:""; position:absolute; inset:-8px; } /* 44px hit area */
.x:hover:not(:disabled) { background:rgba(0,0,0,.9); }
.x svg { width:12px; height:12px; }
figcaption { display:flex; flex-direction:column; gap:.15rem; padding:.5rem .6rem .6rem; font-size:.8rem; }
.name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.meta { color:var(--muted); font-variant-numeric: tabular-nums; }
.meta .line { display:block; }
.bad { color:var(--bad); font-weight:600; }
.link { align-self:flex-start; min-height:0; padding:.35rem 0; border:0; background:none; color:var(--link); text-underline-offset:.2em; }
.link:hover:not(:disabled) { text-decoration:underline; border-color:transparent; }
.hint { font-size:.8rem; color:var(--muted); }
.actions { display:flex; gap:.6rem; flex-wrap:wrap; align-items:center; margin-top:1rem; }
.saved { display:inline-flex; align-items:center; gap:.35rem; font-size:.85rem; color:var(--muted); font-variant-numeric: tabular-nums; }
.saved svg { width:14px; height:14px; color:var(--link); }
@media (prefers-reduced-motion: reduce) {
  .card { animation: none; }
  .mech-photo { transition: none; }
}

@media (max-width: 600px) {
  .controls { display:grid; grid-template-columns: 1fr 1fr; gap:.8rem 1rem; align-items:end; }
  .ctl.grow, .padctl.grow, .ctl.check { grid-column: 1 / -1; }
  .ctl select { width:100%; }
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap:.6rem; }
  .actions button { flex: 1 1 auto; }
  .actions .primary { flex-basis: 100%; }
  .saved { flex-basis: 100%; }
}
@media (pointer: coarse) {
  .link { padding: .6rem 0; }
}

}
</style>
