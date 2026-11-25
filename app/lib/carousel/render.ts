import type { Layout } from './layout'

export type Format = 'jpeg' | 'png'

/** Draw a bitmap centered on a white canvas, optionally at a reduced preview size. */
export function drawSlide(
  canvas: HTMLCanvasElement,
  bitmap: ImageBitmap,
  layout: Layout,
  targetWidth?: number,
) {
  const k = targetWidth ? targetWidth / layout.width : 1
  const cw = Math.max(1, Math.round(layout.width * k))
  const ch = Math.max(1, Math.round(layout.height * k))
  if (canvas.width !== cw) canvas.width = cw
  if (canvas.height !== ch) canvas.height = ch
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, cw, ch)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  // Fit into the shared content box so equal aspect ratios fit identically,
  // whatever the source pixel dimensions.
  const fit = Math.min(layout.contentWidth / bitmap.width, layout.contentHeight / bitmap.height)
  const s = layout.scale * k * fit
  const dw = bitmap.width * s
  const dh = bitmap.height * s
  ctx.drawImage(bitmap, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
}

export function encodeSlide(
  bitmap: ImageBitmap,
  layout: Layout,
  format: Format,
  quality = 0.95,
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  drawSlide(canvas, bitmap, layout)
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Encoding failed'))),
      format === 'jpeg' ? 'image/jpeg' : 'image/png',
      quality,
    ),
  )
}

export async function loadBitmap(file: File): Promise<ImageBitmap> {
  // 'from-image' applies EXIF orientation
  return createImageBitmap(file, { imageOrientation: 'from-image' })
}

export function slideFileName(index: number, original: string, format: Format) {
  const base = original.replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '_')
  const n = String(index + 1).padStart(2, '0')
  return `${n}-${base}.${format === 'jpeg' ? 'jpg' : 'png'}`
}

export function formatBytes(n: number) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`
}
