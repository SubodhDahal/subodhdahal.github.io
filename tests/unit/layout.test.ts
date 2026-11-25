import { describe, expect, test } from 'vitest'
import { computeLayout } from '~/lib/carousel/layout'

const o = { padPct: 5, allow34: false, exportWidth: 'original' as const }

describe('computeLayout', () => {
  test('returns null with no images', () => {
    expect(computeLayout([], o)).toBeNull()
  })

  test('canvas takes the ratio of a single image plus padding', () => {
    const l = computeLayout([{ width: 1000, height: 800 }], o)!
    expect([l.width, l.height, l.clamped]).toEqual([1100, 880, null])
  })

  test('auto picks the ratio with the least empty space across the set', () => {
    // 4:3 + 4:5: either ratio is a tie on coverage, the one nearer square wins (4:5)
    const l = computeLayout([{ width: 1600, height: 1200 }, { width: 1200, height: 1500 }], { ...o, padPct: 0 })!
    expect([l.baseWidth, l.baseHeight]).toEqual([1600, 2000])
    // mostly-landscape set stays landscape instead of drifting to a square union
    const wide = computeLayout([
      { width: 1600, height: 1200 }, { width: 1600, height: 1200 }, { width: 1200, height: 1500 },
    ], { ...o, padPct: 0 })!
    expect(wide.baseWidth / wide.baseHeight).toBeCloseTo(4 / 3, 2)
  })

  test('0% padding matches the max dimensions exactly', () => {
    const l = computeLayout([{ width: 1000, height: 900 }], { ...o, padPct: 0 })!
    expect([l.width, l.height]).toEqual([1000, 900])
  })

  test('clamps too-tall canvases to 4:5 by widening', () => {
    const l = computeLayout([{ width: 300, height: 900 }], o)!
    expect([l.width, l.height, l.clamped]).toEqual([792, 990, 'tall'])
  })

  test('allow34 relaxes the tall limit to 3:4', () => {
    const l = computeLayout([{ width: 300, height: 900 }], { ...o, allow34: true })!
    expect([l.width, l.height]).toEqual([743, 990])
  })

  test('clamps too-wide canvases to 1.91:1 by adding height', () => {
    const l = computeLayout([{ width: 1200, height: 300 }], o)!
    expect(l.clamped).toBe('wide')
    expect(l.width / l.height).toBeCloseTo(1.91, 2)
    expect(l.height).toBeGreaterThan(330) // taller than 300 * 1.1
  })

  test('export width scales the whole canvas uniformly', () => {
    const l = computeLayout([{ width: 4000, height: 1000 }], { ...o, exportWidth: 1080 })!
    expect([l.width, l.height]).toEqual([1080, 566])
    expect(l.scale).toBeCloseTo(1080 / l.baseWidth, 6)
  })

  test('never ends up outside the allowed ratio range', () => {
    const sizes = [[100, 5000], [5000, 100], [1080, 1080], [3, 7], [7, 3], [1234, 4321], [4321, 1234]]
    for (const allow34 of [false, true]) {
      for (const exportWidth of ['original', 1080, 1440] as const) {
        for (const [w, h] of sizes) {
          for (const padPct of [0, 5, 13.5, 20]) {
            const l = computeLayout([{ width: w, height: h }], { padPct, allow34, exportWidth })!
            const lo = allow34 ? 0.75 : 0.8
            // strict: no tolerance, Instagram's API rejects anything outside the range
            expect(l.width / l.height, JSON.stringify({ w, h, padPct, allow34, exportWidth, l })).toBeGreaterThanOrEqual(lo)
            expect(l.width / l.height, JSON.stringify({ w, h, padPct, allow34, exportWidth, l })).toBeLessThanOrEqual(1.91)
          }
        }
      }
    }
  })
})

describe('fixed aspect ratio', () => {
  test('grows the short side to reach the requested ratio', () => {
    const sq = computeLayout([{ width: 1000, height: 600 }], { ...o, padPct: 0, ratio: 1 })!
    expect([sq.width, sq.height, sq.clamped]).toEqual([1000, 1000, null])
    const tall = computeLayout([{ width: 600, height: 1000 }], { ...o, padPct: 0, ratio: 0.8 })!
    expect([tall.width, tall.height]).toEqual([800, 1000])
  })

  test('portrait image fills a 4:5 canvas instead of floating in a wide box', () => {
    const l = computeLayout([{ width: 1600, height: 1200 }, { width: 1200, height: 1500 }], { ...o, padPct: 0, ratio: 0.8 })!
    expect([l.baseWidth, l.baseHeight]).toEqual([1600, 2000]) // export is then capped at 1440 wide
    expect([l.contentWidth, l.contentHeight]).toEqual([1600, 2000])
    // the 4:5 portrait is scaled up to fill the box exactly, no side bars
    expect(Math.min(l.contentWidth / 1200, l.contentHeight / 1500) * 1200).toBeCloseTo(1600, 6)
  })

  test('is exact and in range for every preset and export width', () => {
    for (const ratio of [0.75, 0.8, 1, 1.91]) {
      for (const exportWidth of ['original', 1080, 1440] as const) {
        for (const [w, h] of [[1600, 1200], [900, 1400], [4000, 300], [300, 4000]]) {
          const l = computeLayout([{ width: w, height: h }], { ...o, ratio, exportWidth })!
          const r = l.width / l.height
          expect(r, JSON.stringify({ ratio, exportWidth, w, h, l })).toBeGreaterThanOrEqual(Math.min(0.8, ratio))
          expect(r).toBeLessThanOrEqual(1.91)
          expect(Math.abs(r - ratio)).toBeLessThan(0.01)
          expect(l.contentWidth).toBeGreaterThanOrEqual(w)
          expect(l.contentHeight).toBeGreaterThanOrEqual(h - 1e-6)
        }
      }
    }
  })
})

test('exposes the content box so same-ratio images fit identically', () => {
  const l = computeLayout([{ width: 4000, height: 3000 }, { width: 800, height: 600 }], o)!
  expect([l.contentWidth, l.contentHeight]).toEqual([4000, 3000])
})

test('original export is capped at Instagram\'s 1440px max width', () => {
  const l = computeLayout([{ width: 6000, height: 4000 }], o)!
  expect(l.width).toBe(1440)
  expect(l.width / l.height).toBeGreaterThanOrEqual(0.8)
  expect(l.width / l.height).toBeLessThanOrEqual(1.91)
  const small = computeLayout([{ width: 1000, height: 800 }], o)!
  expect(small.width).toBe(1100)
})
