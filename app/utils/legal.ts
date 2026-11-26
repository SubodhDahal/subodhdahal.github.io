// Details shown on /impressum/ and /privacy/. Keep them in one place so the
// two pages never disagree.
export const LEGAL = {
  name: 'Subodh Dahal',
  street: 'Lindenberg 3',
  city: '71229 Leonberg',
  country: 'Deutschland',
  countryEn: 'Germany',
  email: 'sbdhdahal@gmail.com',
  updated: { de: 'November 2026', en: 'November 2026' },
} as const

const OPT_OUT_KEY = 'analytics-opt-out'

// Analytics stays off if the visitor opted out on /privacy/, or their browser
// sends Global Privacy Control or Do Not Track.
export function analyticsOptedOut(): boolean {
  if (import.meta.server) return false
  try {
    if (localStorage.getItem(OPT_OUT_KEY) === '1') return true
  } catch {}
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  return nav.globalPrivacyControl === true || nav.doNotTrack === '1'
}

export function setAnalyticsOptOut(optOut: boolean) {
  try {
    if (optOut) localStorage.setItem(OPT_OUT_KEY, '1')
    else localStorage.removeItem(OPT_OUT_KEY)
  } catch {}
}
