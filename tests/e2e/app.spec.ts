import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import {
  canvasInfo, controls, jpegSize, makeExifJpeg, makeJpeg, pngSize,
  readZip, upload,
} from './helpers'

test.beforeEach(async ({ page }) => {
  page.on('pageerror', (e) => { throw e })
  await page.goto('/tools/instagram-carousel/')
})

async function mixedSet(page: import('@playwright/test').Page) {
  return [
    await makeJpeg(page, 1600, 1200, '#e66', 'landscape.jpg'),
    await makeJpeg(page, 900, 1400, '#6c6', 'portrait.jpg'),
    await makeJpeg(page, 800, 800, '#68e', 'square.jpg'),
  ]
}

test.describe('canvas and preview', () => {
  test('canvas picks the best-fit ratio, and slider updates it instantly', async ({ page }) => {
    await upload(page, [
      await makeJpeg(page, 800, 700, '#e66', 'landscape.jpg'),
      await makeJpeg(page, 450, 700, '#6c6', 'portrait.jpg'),
      await makeJpeg(page, 400, 400, '#68e', 'square.jpg'),
    ])
    await expect(canvasInfo(page)).toContainText('880 × 880')
    await controls(page).padding.fill('15')
    await expect(canvasInfo(page)).toContainText('1040 × 1040')
    await controls(page).padding.fill('0')
    await expect(canvasInfo(page)).toContainText('800 × 800')
  })

  test('every thumbnail uses the same canvas size', async ({ page }) => {
    await upload(page, await mixedSet(page))
    const dims = await page.locator('.thumb canvas').evaluateAll((a) => a.map((c) => `${(c as HTMLCanvasElement).width}x${(c as HTMLCanvasElement).height}`))
    expect(new Set(dims).size).toBe(1)
  })

  test('3:4 toggle relaxes the tall clamp', async ({ page }) => {
    await upload(page, [await makeJpeg(page, 300, 900, '#6c6', 'tall.jpg')])
    await expect(canvasInfo(page)).toContainText('792 × 990')
    await expect(canvasInfo(page)).toContainText('4:5')
    await controls(page).allow34.check()
    await expect(canvasInfo(page)).toContainText('743 × 990')
    await expect(canvasInfo(page)).toContainText('3:4')
    await controls(page).allow34.uncheck()
    await expect(canvasInfo(page)).toContainText('792 × 990')
  })

  test('aspect ratio select forces the canvas ratio', async ({ page }) => {
    await upload(page, [await makeJpeg(page, 800, 700, '#e66', 'a.jpg')])
    await expect(canvasInfo(page)).toContainText('880 × 770')
    await page.getByLabel('Aspect ratio').selectOption('1')
    await expect(canvasInfo(page)).toContainText('880 × 880')
    await page.getByLabel('Aspect ratio').selectOption('0.8')
    await expect(canvasInfo(page)).toContainText('880 × 1100')
    await page.getByLabel('Aspect ratio').selectOption('auto')
    await expect(canvasInfo(page)).toContainText('880 × 770')
  })

  test('drag-to-reorder changes slide order', async ({ page }) => {
    await upload(page, await mixedSet(page))
    const cards = page.locator('.card')
    await cards.nth(2).dragTo(cards.nth(0))
    await expect(page.locator('.card .name')).toHaveText(['square.jpg', 'landscape.jpg', 'portrait.jpg'])
  })

  test('swipe viewer opens, navigates with keys, and closes', async ({ page }) => {
    await upload(page, await mixedSet(page))
    await page.locator('.card .thumb').first().click()
    await expect(page.locator('.overlay')).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('.dots span').nth(1)).toHaveClass(/on/)
    await page.keyboard.press('Escape')
    await expect(page.locator('.overlay')).toHaveCount(0)
  })

  test('remove and clear', async ({ page }) => {
    await upload(page, await mixedSet(page))
    await page.locator('.card .x').first().click()
    await expect(page.locator('.card')).toHaveCount(2)
    await page.getByRole('button', { name: 'Clear' }).click()
    await expect(page.locator('.card')).toHaveCount(0)
  })
})

test.describe('export', () => {
  test('single JPEG download is named by position and uses the canvas size', async ({ page }, info) => {
    await upload(page, await mixedSet(page))
    await controls(page).exportWidth.selectOption('1080')
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('.card .link').first().click()])
    expect(dl.suggestedFilename()).toBe('01-landscape.jpg')
    const p = info.outputPath('one.jpg'); await dl.saveAs(p)
    expect(jpegSize(readFileSync(p))).toEqual({ width: 1080, height: 1080 })
  })

  test('ZIP contains every slide at an identical size, in current order', async ({ page }, info) => {
    await upload(page, await mixedSet(page))
    const cards = page.locator('.card')
    await cards.nth(2).dragTo(cards.nth(0))
    await controls(page).exportWidth.selectOption('1080')
    const [dl] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Download all as ZIP' }).click()])
    expect(dl.suggestedFilename()).toBe('carousel.zip')
    const p = info.outputPath('all.zip'); await dl.saveAs(p)
    const files = readZip(p)
    expect(Object.keys(files).sort()).toEqual(['01-square.jpg', '02-landscape.jpg', '03-portrait.jpg'])
    for (const buf of Object.values(files)) expect(jpegSize(buf)).toEqual({ width: 1080, height: 1080 })
  })

  test('PNG option exports valid PNGs with the 3:4 canvas size', async ({ page }, info) => {
    await upload(page, [await makeJpeg(page, 300, 900, '#6c6', 'tall.jpg')])
    await controls(page).allow34.check()
    await controls(page).format.selectOption('png')
    const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('.card .link').click()])
    expect(dl.suggestedFilename()).toBe('01-tall.png')
    const p = info.outputPath('one.png'); await dl.saveAs(p)
    expect(pngSize(readFileSync(p))).toEqual({ width: 743, height: 990 })

    const [zip] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Download all as ZIP' }).click()])
    const zp = info.outputPath('png.zip'); await zip.saveAs(zp)
    expect(Object.keys(readZip(zp))).toEqual(['01-tall.png'])
  })
})

test.describe('EXIF', () => {
  test('orientation 6 is applied: dimensions swap and pixels rotate 90° CW', async ({ page }) => {
    await upload(page, [await makeExifJpeg(page, 'rot.jpg')])
    await expect(page.locator('.meta')).toContainText('200×400')
    const px = await page.evaluate(() => {
      const c = document.querySelector('.thumb canvas') as HTMLCanvasElement
      const g = c.getContext('2d')!
      const at = (fx: number, fy: number) => Array.from(g.getImageData(Math.round(fx * c.width), Math.round(fy * c.height), 1, 1).data.slice(0, 3))
      // image occupies the middle of a 352x440 canvas: y 20..420
      return { top: at(0.5, 100 / 440), bottom: at(0.5, 360 / 440) }
    })
    expect(px.top[0]).toBeGreaterThan(200) // red on top
    expect(px.top[2]).toBeLessThan(50)
    expect(px.bottom[2]).toBeGreaterThan(200) // blue on bottom
    expect(px.bottom[0]).toBeLessThan(50)
  })
})

test.describe('upload limits', () => {
  test('caps at 20 slides and tells the user', async ({ page }) => {
    const one = await makeJpeg(page, 100, 100, '#999', 'a.jpg')
    const files = Array.from({ length: 22 }, (_, i) => ({ ...one, name: `img${String(i).padStart(2, '0')}.jpg` }))
    await page.setInputFiles('input[type=file]', files)
    await expect(page.locator('.card')).toHaveCount(20)
    await expect(page.locator('.notice')).toContainText('2 ignored')
  })

  test('skips non-image files', async ({ page }) => {
    const good = await makeJpeg(page, 100, 100, '#999', 'a.jpg')
    await page.setInputFiles('input[type=file]', [good, { name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('hi') }])
    await expect(page.locator('.card')).toHaveCount(1)
    await expect(page.locator('.notice')).toContainText('non-image')
  })
})
