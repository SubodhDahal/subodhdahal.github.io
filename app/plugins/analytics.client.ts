// Loads Rybbit pageview analytics in production builds only, so local dev
// doesn't skew stats, and never for visitors who opted out (see /privacy/).
export default defineNuxtPlugin(() => {
  if (import.meta.dev || analyticsOptedOut()) return

  const script = document.createElement('script')
  script.src = 'https://app.rybbit.io/api/script.js'
  script.defer = true
  script.dataset.siteId = 'dbed437cc8b1'
  document.head.appendChild(script)
})
