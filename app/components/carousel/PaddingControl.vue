<script setup lang="ts">
const PAD_MIN = 0
const PAD_MAX = 20
const PAD_STEP = 0.5

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

function bump(dir: 1 | -1) {
  emit('update:modelValue', Math.min(PAD_MAX, Math.max(PAD_MIN, props.modelValue + dir * PAD_STEP)))
}
</script>

<template>
  <div class="padctl" role="group" aria-label="Padding">
    <span class="padctl-head">Padding <b>{{ modelValue }}%</b></span>
    <div class="padctl-row">
      <button type="button" class="step" aria-label="Decrease padding" :disabled="modelValue <= PAD_MIN" @click="bump(-1)">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3.5 8h9" /></svg>
      </button>
      <input
        type="range" aria-label="Padding" :min="PAD_MIN" :max="PAD_MAX" :step="PAD_STEP" :value="modelValue"
        @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      />
      <button type="button" class="step" aria-label="Increase padding" :disabled="modelValue >= PAD_MAX" @click="bump(1)">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3.5 8h9M8 3.5v9" /></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.padctl { display: flex; flex-direction: column; gap: .3rem; font-size: .85rem; color: var(--pad-muted, var(--muted)); }
.padctl-head { display: flex; justify-content: space-between; gap: .5rem; }
.padctl-head b { color: var(--pad-fg, var(--fg)); font-variant-numeric: tabular-nums; }
.padctl-row { display: flex; align-items: center; gap: .6rem; }
.padctl-row input { flex: 1; min-width: 0; margin: 0; }
.step { flex: none; display: grid; place-items: center; width: 2.4rem; height: 2.4rem; padding: 0; border-radius: 99px; position: relative;
  background: var(--pad-btn, var(--card)); border-color: var(--pad-line, var(--line)); color: var(--pad-fg, var(--fg)); }
.step:hover:not(:disabled) { border-color: var(--pad-fg, var(--muted)); }
.step svg { width: 14px; height: 14px; }
@media (pointer: coarse) { .step::after { content: ""; position: absolute; inset: -4px; } } /* 44px hit area */
</style>
