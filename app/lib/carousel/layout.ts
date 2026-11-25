export type ExportWidth = 'original' | 1080 | 1440

export interface LayoutOptions {
  padPct: number // 0-20, percent of the content box, added on every side
  allow34: boolean // allow 3:4 (app-only) instead of 4:5 as tallest ratio
  exportWidth: ExportWidth
  /** Fixed output aspect ratio (w/h) within Instagram's range; null/undefined picks the best fit for the images. */
  ratio?: number | null
}

export interface Layout {
  /** Final canvas size in px */
  width: number
  height: number
  /** Uniform factor from base canvas px to final canvas px (1 = no export scaling) */
  scale: number
  /** Box (base px) every image is fitted into, centered; excludes padding */
  contentWidth: number
  contentHeight: number
  /** Canvas size before export scaling */
  baseWidth: number
  baseHeight: number
  /** True if padding was added just to satisfy Instagram's ratio limits */
  clamped: 'tall' | 'wide' | null
}

/** Instagram Graph API scales anything wider than this down (IG User Media reference). */
export const MAX_WIDTH = 1440
export const MAX_RATIO = 1.91 // widest (w/h)
const EPS = 1e-9 // float guard so exact ratios (e.g. 2640/3300) don't round up
export const minRatio = (allow34: boolean) => (allow34 ? 3 / 4 : 4 / 5) // tallest

/**
 * Auto mode: the ratio in Instagram's range that leaves the least empty space
 * across the set. An image's coverage of a ratio-R box is min(R/r, r/R), so the
 * sum is piecewise convex in log R and peaks at one of the image ratios (or a
 * range edge). Ties go to the ratio closest to square.
 */
function bestRatio(sizes: { width: number; height: number }[], lo: number): number {
  const rs = sizes.map((s) => s.width / s.height)
  const clamp = (r: number) => Math.min(MAX_RATIO, Math.max(lo, r))
  const candidates = [...new Set([...rs.map(clamp), lo, MAX_RATIO])]
  const score = (R: number) => rs.reduce((t, r) => t + Math.min(R / r, r / R), 0)
  let best = candidates[0]
  for (const c of candidates) {
    const d = score(c) - score(best)
    if (d > 1e-9 || (Math.abs(d) <= 1e-9 && Math.abs(Math.log(c)) < Math.abs(Math.log(best)))) best = c
  }
  return best
}

export function computeLayout(
  sizes: { width: number; height: number }[],
  opts: LayoutOptions,
): Layout | null {
  if (!sizes.length) return null
  const pad = opts.padPct / 100
  const fixed = opts.ratio ?? null
  // A fixed 3:4 is explicitly app-only, so it relaxes the limit on its own.
  const lo = fixed ? Math.min(minRatio(opts.allow34), fixed) : minRatio(opts.allow34)
  const R = fixed ?? bestRatio(sizes, lo)

  // The shared content box has ratio R and is the smallest one that holds every
  // image at native size; images fit into it by their own aspect ratio.
  const contentWidth = Math.max(...sizes.map((s) => Math.max(s.width, s.height * R)))
  const contentHeight = contentWidth / R
  const w = contentWidth * (1 + 2 * pad)
  const h = contentHeight * (1 + 2 * pad)

  // Round one side, then ceil the other so rounding can never push the ratio
  // outside Instagram's range (ceil height for wide, ceil width for tall).
  let baseWidth: number
  let baseHeight: number
  if (R >= 1) {
    baseWidth = Math.round(w)
    baseHeight = Math.ceil(baseWidth / R - EPS)
  } else {
    baseHeight = Math.round(h)
    baseWidth = Math.ceil(baseHeight * R - EPS)
  }

  // True when an image is beyond the range, so extra padding was needed.
  const ratios = sizes.map((s) => s.width / s.height)
  const clamped: Layout['clamped'] = fixed ? null
    : R <= lo && ratios.some((r) => r < lo) ? 'tall'
    : R >= MAX_RATIO && ratios.some((r) => r > MAX_RATIO) ? 'wide' : null

  // 'original' keeps pixels as-is, but never beyond what Instagram accepts.
  const target = opts.exportWidth === 'original' && baseWidth > MAX_WIDTH ? MAX_WIDTH : opts.exportWidth
  if (target === 'original') {
    return { width: baseWidth, height: baseHeight, scale: 1, contentWidth, contentHeight, baseWidth, baseHeight, clamped }
  }
  const width = target
  const scale = width / baseWidth
  // Keep the rounded export height inside the allowed range for this width.
  const hMax = Math.floor(width / lo + EPS)
  const hMin = Math.ceil(width / MAX_RATIO - EPS)
  const height = Math.min(hMax, Math.max(hMin, Math.round(baseHeight * scale)))
  return { width, height, scale, contentWidth, contentHeight, baseWidth, baseHeight, clamped }
}
