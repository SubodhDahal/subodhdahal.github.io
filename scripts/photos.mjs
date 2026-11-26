#!/usr/bin/env node
// Prepare photos for the /photography/ page.
//
//   node scripts/photos.mjs <photo> [<photo> ...]
//
// For every source photo this writes two preview files to
// public/images/photography/:
//
//   <slug>-600.webp   the print on the wall
//   <slug>-1200.webp  the print brought forward in the viewer
//
// Each file is capped at its long edge (never upscaled), converted to sRGB
// and stripped of all metadata (EXIF, GPS, camera serials, ICC profiles).
// The 1200px file is also marked with a small "© Subodh Dahal" in the
// bottom-right corner; the 600px wall thumbnail stays clean. The full
// resolution original never leaves your machine.
//
// New photos are appended to content/photography.json with empty caption
// fields; fill in title, place, year and alt there. Re-running the script on
// a photo that is already listed refreshes its files and dimensions and keeps
// everything you wrote. The order in the JSON is the order on the wall.
//
//   node scripts/photos.mjs --in-place <image> [<image> ...]
//
// Marks images that are already published elsewhere on the site (blog post
// photos, for example) where they are: same path, same format, capped at
// 1200px, metadata stripped, mark added. Nothing is added to the JSON.
// Already-marked files are skipped, so it is safe to re-run on a folder.
//
// Requires ImageMagick 7 (`magick`) on PATH.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, extname, join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const OUT_DIR = join(ROOT, 'public/images/photography')
const MANIFEST = join(ROOT, 'content/photography.json')
// Which sizes carry the corner mark: only the larger, viewer-sized file.
const SIZES = [
  { size: 600, mark: false },
  { size: 1200, mark: true },
]
const QUALITY = 80
const MARK = '© Subodh Dahal'

const args = process.argv.slice(2)
const inPlace = args.includes('--in-place')
const sources = args.filter((a) => a !== '--in-place')
if (sources.length === 0) {
  console.error('Usage: node scripts/photos.mjs [--in-place] <photo> [<photo> ...]')
  process.exit(1)
}

const magick = (args) => execFileSync('magick', args, { encoding: 'utf8' })

// Prefer the site's own sans for the mark; fall back to ImageMagick's default.
let font = null
try {
  font = execFileSync('fc-match', ['-f', '%{file}', 'IBM Plex Sans:style=Medium'], {
    encoding: 'utf8',
  }).trim() || null
} catch {}

// The conversion target: a minimal ICC v4 sRGB profile, built here so the
// script needs no profile installed on the machine.
const srgbProfile = () => {
  const int32 = (...values) => {
    const buf = Buffer.alloc(values.length * 4)
    values.forEach((v, i) => buf.writeInt32BE(v, i * 4))
    return buf
  }
  const fixed = (...values) => int32(...values.map((v) => Math.round(v * 65536)))
  const tag = (type, ...parts) => Buffer.concat([Buffer.from(type), int32(0), ...parts])
  const text = (value) => {
    const utf16 = Buffer.from(value, 'utf16le').swap16()
    return tag('mluc', int32(1, 12), Buffer.from('enUS'), int32(utf16.length, 28), utf16)
  }
  const xyz = (...values) => tag('XYZ ', fixed(...values))
  // The sRGB transfer curve as parametric type 3: g, a, b, c, d.
  const curve = tag('para', int32(3 << 16), fixed(2.4, 1 / 1.055, 0.055 / 1.055, 1 / 12.92, 0.04045))
  const d50 = [0.9642, 1, 0.8249]
  const tags = [
    ['desc', text('sRGB')],
    ['cprt', text('No copyright')],
    ['wtpt', xyz(...d50)],
    // Bradford adaptation from D65 to D50, then the adapted primaries.
    ['chad', tag('sf32', fixed(1.04788, 0.02292, -0.05022, 0.02959, 0.99048, -0.01707, -0.00925, 0.01508, 0.75168))],
    ['rXYZ', xyz(0.43607, 0.22249, 0.01392)],
    ['gXYZ', xyz(0.38515, 0.71687, 0.0971)],
    ['bXYZ', xyz(0.14307, 0.06061, 0.7141)],
    ['rTRC', curve],
    ['gTRC', curve],
    ['bTRC', curve],
  ]
  const table = [int32(tags.length)]
  const body = []
  let offset = 128 + 4 + tags.length * 12
  for (const [name, data] of tags) {
    const padded = Buffer.concat([data, Buffer.alloc((4 - (data.length % 4)) % 4)])
    table.push(Buffer.from(name), int32(offset, data.length))
    body.push(padded)
    offset += padded.length
  }
  const header = Buffer.alloc(128)
  header.writeUInt32BE(offset, 0)
  header.writeUInt32BE(0x04300000, 8)
  header.write('mntrRGB XYZ ', 12)
  header.write('acsp', 36)
  fixed(...d50).copy(header, 68)
  return Buffer.concat([header, ...table, ...body])
}

const tmp = mkdtempSync(join(tmpdir(), 'photos-'))
process.on('exit', () => rmSync(tmp, { recursive: true, force: true }))
const SRGB = join(tmp, 'srgb.icc')
writeFileSync(SRGB, srgbProfile())

const slugify = (name) =>
  name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const render = (src, dest, longEdge, mark = true) => {
  // Size the mark from the output, so it reads the same at any size.
  const pointsize = Math.max(11, Math.round(longEdge * 0.016))
  const inset = Math.round(pointsize * 0.9)
  const fontArgs = font ? ['-font', font] : []
  const markArgs = [
    ...fontArgs,
    '-gravity', 'SouthEast',
    '-pointsize', String(pointsize),
    // A faint dark pass under the light one keeps the mark legible on skies
    // and snow without turning it into a badge.
    '-fill', 'rgba(0,0,0,0.16)',
    '-annotate', `+${inset - 1}+${inset - 1}`, MARK,
    '-fill', 'rgba(255,255,255,0.4)',
    '-annotate', `+${inset}+${inset}`, MARK,
  ]
  magick([
    src,
    '-auto-orient',
    // Converts from the embedded profile (Display P3 from phones, Adobe RGB
    // from cameras) before the strip drops it. Without one, nothing changes.
    '-profile', SRGB,
    '-colorspace', 'sRGB',
    '-resize', `${longEdge}x${longEdge}>`,
    ...(mark ? markArgs : []),
    '-strip',
    // Re-tagged after the strip: records the credit, and lets --in-place
    // recognise a file it has already marked.
    '-set', 'comment', MARK,
    '-quality', String(QUALITY),
    dest,
  ])
  const [w, h] = magick(['identify', '-format', '%w %h', dest]).split(' ').map(Number)
  return { width: w, height: h }
}

if (inPlace) {
  for (const src of sources) {
    if (!existsSync(src)) {
      console.error(`skip: ${src} does not exist`)
      continue
    }
    if (magick(['identify', '-format', '%c', src]).includes(MARK)) {
      console.log(`skip    ${src} (already marked)`)
      continue
    }
    const { width, height } = render(src, src, 1200)
    console.log(`marked  ${src} (${width}×${height})`)
  }
  process.exit(0)
}

mkdirSync(OUT_DIR, { recursive: true })
const manifest = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, 'utf8'))
  : { photos: [] }

for (const src of sources) {
  if (!existsSync(src)) {
    console.error(`skip: ${src} does not exist`)
    continue
  }
  const slug = slugify(basename(src, extname(src)))
  let dims
  for (const { size, mark } of SIZES) {
    dims = render(src, join(OUT_DIR, `${slug}-${size}.webp`), size, mark)
  }
  const entry = manifest.photos.find((p) => p.slug === slug)
  if (entry) {
    Object.assign(entry, dims)
    console.log(`updated ${slug} (${dims.width}×${dims.height})`)
  } else {
    manifest.photos.push({
      slug,
      ...dims,
      title: '',
      place: '',
      alt: '',
      size: 'standard',
    })
    console.log(`added   ${slug} (${dims.width}×${dims.height}): fill in title, place and alt`)
  }
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
