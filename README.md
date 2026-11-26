```
 _____       _               _ _    ______      _           _
/  ___|     | |             | | |   |  _  \    | |         | |
\ `--. _   _| |__   ___   __| | |__ | | | |__ _| |__   __ _| |  ___ ___  _ __ ___
 `--. \ | | | '_ \ / _ \ / _` | '_ \| | | / _` | '_ \ / _` | | / __/ _ \| '_ ` _ \
/\__/ / |_| | |_) | (_) | (_| | | | | |/ / (_| | | | | (_| | || (_| (_) | | | | | |
\____/ \__,_|_.__/ \___/ \__,_|_| |_|___/ \__,_|_| |_|\__,_|_(_)___\___/|_| |_| |_|
```
Source code for [subodhdahal.com](https://subodhdahal.com).

Created using  [Nuxt.js](https://nuxtjs.org).

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Photography page

The `/photography/` page shows small, marked previews, never full-size files. Prepare new photos with the export script (requires ImageMagick 7, `magick`):

```bash
node scripts/photos.mjs path/to/photo.jpg [more photos...]
```

For each photo, it writes `<slug>-600.webp` (the wall) and `<slug>-1200.webp` (the viewer) to `public/images/photography/`. The slug comes from the file name. Each file is capped at that long edge (never upscaled), converted to sRGB, and stripped of all metadata (EXIF, GPS, camera serials). The 1200px file also gets a small `© Subodh Dahal` mark in the bottom-right corner; the 600px wall thumbnail stays clean. Originals are left untouched.

New photos are appended to `content/photography.json` with empty fields. Fill them in:

```json
{
  "slug": "everest-dawn",
  "width": 1200,
  "height": 800,
  "title": "Everest at dawn",
  "place": "Khumbu, Nepal",
  "year": 2025,
  "alt": "First light on Everest's summit above a dark ridge",
  "size": "feature"
}
```

- Array order is the hanging order on the wall.
- `size` is `small`, `standard` or `feature` and sets how large the print hangs.
- `year` is optional.
- `alt` describes the photo for screen readers.

Re-running the script on a photo that's already listed refreshes its files and dimensions and keeps the captions. To remove a photo, delete its entry from the JSON and its two `.webp` files.

To protect photos already published elsewhere on the site, such as blog post images, mark them where they are:

```bash
node scripts/photos.mjs --in-place public/images/some-post/*.jpg
```

This overwrites each file at the same path and in the same format. Each file is capped at 1200px, stripped of metadata and marked. Nothing is added to the JSON, so posts that reference the files keep working. Files that are already marked are skipped, so it's safe to re-run it on a whole folder.
