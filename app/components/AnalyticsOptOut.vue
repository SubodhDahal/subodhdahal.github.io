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
        on: 'Die Reichweitenmessung ist für diesen Browser aktiv.',
        off: 'Die Reichweitenmessung ist für diesen Browser deaktiviert.',
        optOut: 'Reichweitenmessung deaktivieren',
        optIn: 'Reichweitenmessung wieder erlauben',
      }
    : {
        on: 'Analytics is on for this browser.',
        off: 'Analytics is off for this browser.',
        optOut: 'Turn analytics off',
        optIn: 'Turn analytics back on',
      },
)
</script>

<template>
  <ClientOnly>
    <div
      class="not-prose my-6 flex flex-wrap items-center gap-4 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800 p-4 font-sans text-sm text-secondary-700 dark:text-secondary-200"
    >
      <span role="status">{{ optedOut ? text.off : text.on }}</span>
      <button
        type="button"
        class="rounded border border-primary-500 px-3 py-1.5 font-medium text-primary-700 dark:text-primary-300 transition-colors hover:bg-primary-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        @click="toggle"
      >
        {{ optedOut ? text.optIn : text.optOut }}
      </button>
    </div>
  </ClientOnly>
</template>
