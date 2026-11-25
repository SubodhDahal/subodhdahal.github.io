import { expect, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { inflateRawSync } from 'node:zlib'

export interface TestFile { name: string; mimeType: string; buffer: Buffer }

/** Solid-colour JPEG generated in the browser. */
export async function makeJpeg(page: Page, w: number, h: number, color: string, name: string): Promise<TestFile> {
  const data = await page.evaluate(async ({ w, h, color }) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h
    const g = c.getContext('2d')!; g.fillStyle = color; g.fillRect(0, 0, w, h)
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/jpeg', 0.9))
    return Array.from(new Uint8Array(await blob.arrayBuffer()))
  }, { w, h, color })
  return { name, mimeType: 'image/jpeg', buffer: Buffer.from(data) }
}

/** Random-noise JPEG: barely compressible, so exports get huge. */
export async function makeNoiseJpeg(page: Page, size: number, name: string): Promise<TestFile> {
  const data = await page.evaluate(async (size) => {
    const c = document.createElement('canvas'); c.width = size; c.height = size
    const g = c.getContext('2d')!; const id = g.createImageData(size, size)
    for (let i = 0; i < id.data.length; i += 65536) crypto.getRandomValues(id.data.subarray(i, Math.min(i + 65536, id.data.length)))
    for (let i = 3; i < id.data.length; i += 4) id.data[i] = 255
    g.putImageData(id, 0, 0)
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/jpeg', 0.5))
    return Array.from(new Uint8Array(await blob.arrayBuffer()))
  }, size)
  return { name, mimeType: 'image/jpeg', buffer: Buffer.from(data) }
}

/** 400x200 JPEG, left half red / right half blue, with EXIF orientation set (default 6 = rotate 90° CW). */
export async function makeExifJpeg(page: Page, name: string, orientation = 6): Promise<TestFile> {
  const data = await page.evaluate(async (orientation) => {
    const c = document.createElement('canvas'); c.width = 400; c.height = 200
    const g = c.getContext('2d')!
    g.fillStyle = '#f00'; g.fillRect(0, 0, 200, 200); g.fillStyle = '#00f'; g.fillRect(200, 0, 200, 200)
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), 'image/jpeg', 0.95))
    const jpg = new Uint8Array(await blob.arrayBuffer())
    const exif = new Uint8Array([
      0xff, 0xe1, 0x00, 0x22, 0x45, 0x78, 0x69, 0x66, 0, 0, // APP1 "Exif"
      0x4d, 0x4d, 0x00, 0x2a, 0, 0, 0, 8, // TIFF header (big-endian)
      0, 1, 0x01, 0x12, 0, 3, 0, 0, 0, 1, 0, orientation, 0, 0, // 1 entry: Orientation
      0, 0, 0, 0,
    ])
    const out = new Uint8Array(jpg.length + exif.length)
    out.set(jpg.slice(0, 2), 0); out.set(exif, 2); out.set(jpg.slice(2), 2 + exif.length)
    return Array.from(out)
  }, orientation)
  return { name, mimeType: 'image/jpeg', buffer: Buffer.from(data) }
}

export async function upload(page: Page, files: TestFile[]) {
  await page.setInputFiles('input[type=file]', files)
  await expect(page.locator('.card')).toHaveCount(files.length)
  // Cards animate in; dragging mid-animation makes Sortable measure moving positions.
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'))
}

/** Controls, by their label text. */
export const controls = (page: Page) => ({
  padding: page.getByRole('slider', { name: 'Padding' }),
  exportWidth: page.getByLabel('Export width'),
  format: page.getByLabel('Format'),
  allow34: page.getByLabel('Allow 3:4'),
})

export const canvasInfo = (page: Page) => page.locator('.info')

/** Wait for the debounced size badge to change from `prev` and finish loading. */
export async function settledMeta(page: Page, prev = ''): Promise<string> {
  await page.waitForFunction((p) => {
    const t = document.querySelector('.meta')?.textContent ?? ''
    return !t.includes('…') && t !== p
  }, prev, { timeout: 60_000 })
  return page.locator('.meta').first().innerText()
}

export function jpegSize(buf: Buffer): { width: number; height: number } {
  let k = 2
  while (k < buf.length) {
    const m = buf[k + 1]
    if (m === 0xc0 || m === 0xc2) return { height: buf.readUInt16BE(k + 5), width: buf.readUInt16BE(k + 7) }
    k += 2 + buf.readUInt16BE(k + 2)
  }
  throw new Error('No SOF marker found')
}

export function pngSize(buf: Buffer): { width: number; height: number } {
  expect(buf.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

/** Minimal ZIP reader (stored/deflated entries) so tests need no extra dependency. */
export function readZip(path: string): Record<string, Buffer> {
  const buf = readFileSync(path)
  const out: Record<string, Buffer> = {}
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]))
  const count = buf.readUInt16LE(eocd + 10)
  let p = buf.readUInt32LE(eocd + 16)
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10)
    const csize = buf.readUInt32LE(p + 20)
    const nameLen = buf.readUInt16LE(p + 28)
    const extraLen = buf.readUInt16LE(p + 30)
    const commentLen = buf.readUInt16LE(p + 32)
    const lho = buf.readUInt32LE(p + 42)
    const name = buf.subarray(p + 46, p + 46 + nameLen).toString()
    const dataStart = lho + 30 + buf.readUInt16LE(lho + 26) + buf.readUInt16LE(lho + 28)
    const raw = buf.subarray(dataStart, dataStart + csize)
    out[name] = method === 0 ? raw : inflateRawSync(raw)
    p += 46 + nameLen + extraLen + commentLen
  }
  return out
}
