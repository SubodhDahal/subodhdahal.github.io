<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

import type { ViewerItem } from '~/composables/usePhotoViewer'

const props = defineProps<{
  items: ViewerItem[]
  /** Index of the photo in front, or null when the viewer is closed. */
  index: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'step', delta: 1 | -1): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const photo = computed(() => (props.index === null ? null : props.items[props.index]))
const total = computed(() => props.items.length)
const pad = (n: number) => String(n).padStart(2, '0')

watch(
  () => props.index,
  async (index) => {
    await nextTick()
    const dialog = dialogRef.value
    if (!dialog) return
    if (index === null) {
      if (dialog.open) dialog.close()
      return
    }
    if (!dialog.open) dialog.showModal()
    // Warm the neighbours so stepping through feels instant.
    for (const n of [index - 1, index + 1]) {
      const p = props.items[n]
      if (p) new Image().src = p.src
    }
  },
  { flush: 'sync' },
)

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    emit('step', 1)
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    emit('step', -1)
  }
}

// Esc: let the page run its own closing transition instead of the
// dialog snapping shut.
const onCancel = (event: Event) => {
  event.preventDefault()
  emit('close')
}

// Click on the bare backdrop area (not the print or a control) closes.
const onClick = (event: MouseEvent) => {
  if (event.target === dialogRef.value) emit('close')
}

// Horizontal swipe steps through the sequence on touch screens.
let touchStartX: number | null = null
const onPointerDown = (event: PointerEvent) => {
  if (event.pointerType === 'touch') touchStartX = event.clientX
}
const onPointerUp = (event: PointerEvent) => {
  if (touchStartX === null) return
  const dx = event.clientX - touchStartX
  touchStartX = null
  if (Math.abs(dx) > 48) emit('step', dx < 0 ? 1 : -1)
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="viewer"
    :aria-label="photo ? [photo.title, photo.caption].filter(Boolean).join(', ') : 'Photo viewer'"
    @keydown="onKeydown"
    @cancel="onCancel"
    @click="onClick"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <template v-if="photo && index !== null">
      <button
        type="button"
        class="viewer__btn viewer__close"
        aria-label="Close"
        @click="emit('close')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <figure class="viewer__figure">
        <div class="viewer__mat">
          <img
            :key="photo.src"
            :src="photo.src"
            :alt="photo.alt"
            :width="photo.width"
            :height="photo.height"
            class="viewer__img"
            style="view-transition-name: print-forward"
          />
        </div>
        <figcaption class="viewer__caption">
          <span class="viewer__count">{{ pad(index + 1) }} / {{ pad(total) }}</span>
          <span class="viewer__title">{{ photo.title }}</span>
          <span v-if="photo.caption" class="viewer__place">{{ photo.caption }}</span>
        </figcaption>
      </figure>

      <div class="viewer__nav">
        <button
          type="button"
          class="viewer__btn"
          aria-label="Previous photo"
          :disabled="index === 0"
          @click="emit('step', -1)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          class="viewer__btn"
          aria-label="Next photo"
          :disabled="index === total - 1"
          @click="emit('step', 1)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </template>
  </dialog>
</template>

<style scoped>
/* The viewer is the wall itself, brought close: same tone, the print
   alone in the middle in its mat. Fills the viewport. */
.viewer {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 3.5rem 1rem 1.25rem;
  border: 0;
  background: var(--color-secondary-100);
  color: var(--color-secondary-800);
  display: none;
  grid-template-rows: auto auto;
  align-content: center;
  justify-items: center;
  gap: 1rem;
  overscroll-behavior: contain;
}

.viewer[open] {
  display: grid;
}

.viewer::backdrop {
  background: transparent;
}

.viewer:focus {
  outline: none;
}

.viewer__figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: 0;
  max-height: 100%;
}

.viewer__mat {
  background: #fff;
  padding: clamp(0.5rem, 1.6vw, 1rem);
  border: 1px solid var(--color-secondary-200);
  border-radius: 2px;
  box-shadow:
    0 1px 2px rgb(17 24 39 / 0.06),
    0 24px 48px -24px rgb(17 24 39 / 0.35);
  min-height: 0;
  line-height: 0;
}

.viewer__img {
  display: block;
  width: auto;
  height: auto;
  max-width: min(1200px, calc(100vw - 2rem - 2 * clamp(0.5rem, 1.6vw, 1rem)));
  max-height: calc(100dvh - 15rem);
  object-fit: contain;
}

.viewer__caption {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  column-gap: 0.75rem;
  row-gap: 0.125rem;
  text-align: center;
}

.viewer__count {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  font-variant-numeric: tabular-nums;
  color: var(--color-secondary-500);
}

.viewer__title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-secondary-900);
}

.viewer__place {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-secondary-600);
}

.viewer__nav {
  display: flex;
  gap: 0.5rem;
}

.viewer__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 1px solid var(--color-secondary-300);
  background: #fff;
  color: var(--color-secondary-800);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.viewer__btn svg {
  width: 20px;
  height: 20px;
}

.viewer__btn:hover:not(:disabled) {
  border-color: var(--color-primary-500);
  color: var(--color-primary-600);
}

.viewer__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-secondary-100), 0 0 0 4px var(--color-primary-500);
}

.viewer__btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.viewer__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

/* Wide screens: the arrows move to the edges so the print owns the centre. */
@media (min-width: 768px) {
  .viewer {
    padding: 2rem 5.5rem 1.5rem;
    grid-template-rows: auto;
  }
  .viewer__img {
    max-width: min(1200px, calc(100vw - 11rem - 2 * clamp(0.5rem, 1.6vw, 1rem)));
    max-height: calc(100dvh - 9rem);
  }
  .viewer__nav {
    position: absolute;
    inset: 0 1.25rem;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }
  .viewer__nav .viewer__btn {
    pointer-events: auto;
  }
  .viewer__close {
    top: 1.25rem;
    right: 1.25rem;
  }
}

@starting-style {
  .viewer[open] {
    opacity: 0;
  }
}
.viewer[open] {
  transition: opacity 0.25s ease-out;
}
</style>

<style>
html:has(.viewer[open]) {
  overflow: hidden;
}

html.dark .viewer {
  background: var(--color-secondary-950);
  color: var(--color-secondary-100);
}

html.dark .viewer__mat {
  background: var(--color-secondary-800);
  border-color: var(--color-secondary-700);
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.4),
    0 24px 48px -24px rgb(0 0 0 / 0.8);
}

html.dark .viewer__count {
  color: var(--color-secondary-400);
}

html.dark .viewer__title {
  color: var(--color-secondary-50);
}

html.dark .viewer__place {
  color: var(--color-secondary-300);
}

html.dark .viewer__btn {
  background: var(--color-secondary-800);
  border-color: var(--color-secondary-600);
  color: var(--color-secondary-100);
}

html.dark .viewer__btn:hover:not(:disabled) {
  border-color: var(--color-primary-400);
  color: var(--color-primary-300);
}

html.dark .viewer__btn:focus-visible {
  box-shadow: 0 0 0 2px var(--color-secondary-950), 0 0 0 4px var(--color-primary-400);
}

/* The print travels from the wall into the viewer. */
::view-transition-group(print-forward) {
  animation-duration: 0.45s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
