export type PrintSize = 'small' | 'standard' | 'feature'

export interface Photo {
  slug: string
  width: number
  height: number
  title: string
  place: string
  year?: number
  alt: string
  size: PrintSize
}

export const photoSrc = (slug: string, size: 600 | 1200) =>
  `/images/photography/${slug}-${size}.webp`

export const photoSrcset = (slug: string) =>
  `${photoSrc(slug, 600)} 600w, ${photoSrc(slug, 1200)} 1200w`

export const plateNumber = (index: number) => String(index + 1).padStart(2, '0')

export const photoCaption = (photo: Photo) =>
  photo.year ? `${photo.place} · ${photo.year}` : photo.place

// Relative print size on the wall. Prints in one row share a centre line,
// so a feature print hangs larger than its neighbours, salon style.
const WEIGHT: Record<PrintSize, number> = { small: 0.72, standard: 1, feature: 1.45 }


// Weight a print's grow factor carries on the wall (aspect ratio × weight).
export const printGrow = (photo: Photo) =>
  (photo.width / photo.height) * WEIGHT[photo.size ?? 'standard']

// The wall at each breakpoint: a representative inner width to choose the
// row breaks at, the target image height (--h), the gap between prints, the
// mat's added width (2 × padding + 2px border), and the narrowest a print
// may hang. minGrow lifts slim small prints on narrow walls so they never
// shrink to a postage stamp. Keep in sync with the .wall rules in pages/photography.vue.
const WALLS = {
  mobile: { width: 358, height: 112, gap: 12, extra: 18, minPrint: 96, minGrow: 0.8 },
  tablet: { width: 720, height: 160, gap: 20, extra: 23, minPrint: 112, minGrow: 0.5 },
  desktop: { width: 1150, height: 208, gap: 28, extra: 31, minPrint: 128, minGrow: 0.5 },
} as const

type Wall = (typeof WALLS)[keyof typeof WALLS]

/**
 * Split the hanging sequence into rows that each justify to the wall, the
 * last row included. A small dynamic programme picks the row breaks that
 * keep every row closest to the target height, never hanging a print
 * narrower than the wall's minimum. Returns, per print, its share of its
 * row (f) and the row's print count (k).
 */
const partition = (rawGrows: number[], wall: Wall) => {
  const grows = rawGrows.map((g) => Math.max(g, wall.minGrow))
  const n = grows.length
  const prefix = [0]
  for (const g of grows) prefix.push(prefix[prefix.length - 1]! + g)

  const costOf = (i: number, j: number) => {
    const k = j - i
    const sum = prefix[j]! - prefix[i]!
    const room = wall.width - (k - 1) * wall.gap - k * wall.extra
    if (room <= 0) return Infinity
    const scale = room / (sum * wall.height)
    let cost = Math.log(scale) ** 2
    if (scale > 1.9 || scale < 0.55) cost += 50
    for (let x = i; x < j; x++) {
      if (grows[x]! * wall.height * scale + wall.extra < wall.minPrint) cost += 50
    }
    return cost
  }

  const best = new Array<number>(n + 1).fill(Infinity)
  const from = new Array<number>(n + 1).fill(0)
  best[0] = 0
  for (let j = 1; j <= n; j++) {
    for (let i = Math.max(0, j - 10); i < j; i++) {
      const c = best[i]! + costOf(i, j)
      if (c < best[j]!) {
        best[j] = c
        from[j] = i
      }
    }
  }

  const out = new Array<{ f: number; k: number }>(n)
  for (let j = n; j > 0; j = from[j]!) {
    const i = from[j]!
    const sum = prefix[j]! - prefix[i]!
    for (let x = i; x < j; x++) out[x] = { f: grows[x]! / sum, k: j - i }
  }
  return out
}

/**
 * Per-print custom properties for every breakpoint. The wall's CSS turns
 * (f, k) into an exact width at whatever width the wall really has, so
 * the rows render balanced on the server, with no re-hang after load.
 */
export const hangStyles = (photos: Photo[]) => {
  const grows = photos.map(printGrow)
  const styles = photos.map((p) => ({ '--ratio': String(p.width / p.height) }) as Record<string, string>)
  for (const [bp, wall] of Object.entries(WALLS)) {
    partition(grows, wall).forEach(({ f, k }, x) => {
      styles[x]![`--f-${bp}`] = f.toFixed(5)
      styles[x]![`--k-${bp}`] = String(k)
    })
  }
  return styles
}
