<script setup lang="ts">
import { computed } from 'vue'

const PAD_MIN = 0
const PAD_MAX = 20
const PAD_STEP = 0.5

const props = defineProps<{ modelValue: number; onDark?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const stepClass = computed(() => [
  'relative grid size-10 flex-none cursor-pointer place-items-center rounded-full border p-0 transition-colors disabled:cursor-default disabled:opacity-60 pointer-coarse:after:absolute pointer-coarse:after:-inset-1 pointer-coarse:after:content-[\'\']',
  props.onDark
    ? 'border-neutral-600 bg-neutral-800 text-neutral-200 hover:not-disabled:border-neutral-300'
    : 'border-secondary-200 bg-white text-secondary-800 hover:not-disabled:border-secondary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-50',
])

function bump(dir: 1 | -1) {
  emit('update:modelValue', Math.min(PAD_MAX, Math.max(PAD_MIN, props.modelValue + dir * PAD_STEP)))
}
</script>

<template>
  <div class="padctl flex flex-col gap-1 text-sm" :class="onDark ? 'text-neutral-400' : 'text-secondary-500 dark:text-secondary-400'" role="group" aria-label="Padding">
    <span class="flex justify-between gap-2">
      Padding <b class="font-semibold tabular-nums" :class="onDark ? 'text-neutral-200' : 'text-secondary-800 dark:text-secondary-50'">{{ modelValue }}%</b>
    </span>
    <div class="flex items-center gap-2.5">
      <button type="button" :class="stepClass" aria-label="Decrease padding" :disabled="modelValue <= PAD_MIN" @click="bump(-1)">
        <svg class="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3.5 8h9" /></svg>
      </button>
      <input
        class="m-0 min-w-0 flex-1 accent-primary-600"
        type="range" aria-label="Padding" :min="PAD_MIN" :max="PAD_MAX" :step="PAD_STEP" :value="modelValue"
        @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      />
      <button type="button" :class="stepClass" aria-label="Increase padding" :disabled="modelValue >= PAD_MAX" @click="bump(1)">
        <svg class="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3.5 8h9M8 3.5v9" /></svg>
      </button>
    </div>
  </div>
</template>
