<script setup lang="ts">
const props = defineProps<{ lang: 'de' | 'en' }>()

const optedOut = ref(false)
onMounted(() => {
  optedOut.value = analyticsOptedOut()
})

function toggle() {
  setAnalyticsOptOut(!optedOut.value)
  // Reload so an already-running analytics script stops, or starts again.
  window.location.reload()
}

const text = computed(() =>
  props.lang === 'de'
    ? {
        on: 'Die Reichweitenmessung ist in diesem Browser aktiv.',
        off: 'Die Reichweitenmessung ist in diesem Browser abgeschaltet.',
        optOut: 'Abschalten',
        optIn: 'Wieder einschalten',
      }
    : {
        on: 'Analytics is on in this browser.',
        off: 'Analytics is off in this browser.',
        optOut: 'Turn off',
        optIn: 'Turn back on',
      },
)

const panel =
  'not-prose my-6 flex min-h-[4.75rem] flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-lg border border-secondary-200 bg-secondary-50 px-5 py-4 font-sans text-base text-secondary-700 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-200'
</script>

<template>
  <ClientOnly>
    <div :class="panel">
      <p role="status" class="m-0">{{ optedOut ? text.off : text.on }}</p>
      <button
        type="button"
        class="min-h-[44px] rounded-lg border border-secondary-200 bg-white px-4 text-sm font-medium text-secondary-800 transition-colors hover:border-secondary-400 active:translate-y-px dark:border-secondary-600 dark:bg-secondary-900 dark:text-secondary-100 dark:hover:border-secondary-400"
        @click="toggle"
      >
        {{ optedOut ? text.optIn : text.optOut }}
      </button>
    </div>
    <!-- Same footprint before hydration, so the text below doesn't jump. -->
    <template #fallback>
      <div :class="panel" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>
