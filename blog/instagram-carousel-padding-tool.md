---
title: "A browser tool that puts every carousel photo on the same white mat, like a gallery print"
description: "Instagram can keep each photo's original aspect ratio in a carousel, but I prefer a white canvas with even borders. I built a page that pads every image onto one shared canvas, entirely in the browser."
canonical_url: "https://subodhdahal.com/blog/instagram-carousel-padding-tool/"
---

> Index of every page on this site: [llms.txt](https://subodhdahal.com/llms.txt)

I use Instagram to post pictures from my hikes and trips, and nearly every one is nature or scenery. I like posting four or five at once as a carousel, but those photos come out in different aspect ratios. A wide mountain view sits next to a tall shot of a tree, and I wanted the whole set to look good when someone swipes through it in the app.

I wanted every slide on the same white canvas with a border around the photo, like a print in a gallery frame.

So I made a page for it: an [Instagram carousel white border tool](https://subodhdahal.com/tools/instagram-carousel/). You drop images in, it pads each one onto a shared canvas, and you download the result. Everything runs in your browser, so your photos are never uploaded.

## Why I don't use Instagram's Mixed option

Instagram's phone app has a **Mixed** option in the crop menu that keeps each photo's own aspect ratio. The space around the wide photos isn't necessarily white, because Instagram fills it with a background that follows the app's theme. I can't control that background or how much space each photo gets, and I'd rather have white, which looks better to me.

## Padding one wide photo and three tall ones to 4:5

I tested it with four photos from a walk in November: one wide 4:3 photo and three 4:5 tall ones. The page picked a 4:5 canvas of 1440 × 1800 pixels. The wide photo got white space above and below, and the tall ones got a thin border.

<figure className="image">

![Instagram Carousel Tools showing four autumn photos on identical white canvases, the first one wide, with white space above and below](https://subodhdahal.com/images/instagram-carousel-tool/carousel-tool-four-photos-loaded.png)
  <figcaption>

The first photo is the wide one. The slides share one canvas size.

</figcaption>
</figure>

The padding slider goes from 0 to 20%. Around 10% it starts to look matted. The ratio defaults to Auto, which picks the best fit for the set, and I can force 4:5, 1:1 or 1.91:1 instead. A click on any slide opens a swipe preview, and the padding slider stays in reach.

<figure className="image">

![Preview viewer showing the wide autumn photo centered on a white 4:5 slide with navigation arrows and dots](https://subodhdahal.com/images/instagram-carousel-tool/carousel-tool-preview-viewer.png)
  <figcaption>

The preview with padding at 10%.

</figcaption>
</figure>

I export at 1080 wide as JPEG, and the tool gives me a ZIP. It also supports 1440 wide and PNG. It stops at 20 slides, which is Instagram's cap, and warns when a file goes above 8 MB. My test photos came out between 670 KB and 1 MB each.

## The layout math and canvas drawing behind the tool

The tool is a Nuxt page with a few Vue components and two small TypeScript files. One does the layout math and the other draws onto a `<canvas>`.

If you haven't used it, `<canvas>` is an HTML element that gives you a blank grid of pixels that JavaScript can paint into. I picked it because the browser already does the hard parts: it decodes the photos, resizes them with smoothing when you draw them, and encodes the result as JPEG or PNG through `canvas.toBlob`. So the tool doesn't need an image library or a server, which is why nothing gets uploaded. The previews on the page are canvases too, painted by the same code.

```mermaidThe whole tool, from dropping photos in to downloading slides.
flowchart TD
  accTitle: How the carousel tool turns photos into slides
  accDescr: Drop in photos, decode each photo and fix EXIF rotation, pick the aspect ratio with the least empty space, size one box that fits every photo and add padding, draw each photo centered on a white canvas, encode each slide as JPEG or PNG, then download one slide or a ZIP.
  A["Drop in photos"] --> B["Decode each photo, fix EXIF rotation"]
  B --> C["Pick the aspect ratio with the least empty space"]
  C --> D["Size one box that fits every photo, add padding"]
  D --> E["Draw each photo centered on a white canvas"]
  E --> F["Encode each slide as JPEG or PNG"]
  F --> G["Download one slide or a ZIP"]
```

Picking the aspect ratio and sizing the canvas is where most of the code goes, so here is a closer look at those steps:

```mermaidInside the layout step: choosing the aspect ratio and sizing the canvas.
flowchart TD
  accTitle: How the tool picks the aspect ratio and sizes the canvas
  accDescr: If a ratio is forced, the tool uses it. Otherwise it builds candidates from each photo's ratio, clamped to Instagram's range, plus both range limits, scores each candidate, and picks the highest score, breaking ties toward square. It then sizes the smallest box at that ratio that fits every photo, adds padding, rounds the canvas to whole pixels while ignoring floating-point error, and either keeps the original size capped at 1440 wide or scales to 1080 or 1440 and clamps the height.
  A{"Ratio forced?"} -- yes --> R["Use that ratio"]
  A -- no --> B["Candidates: each photo's ratio,<br/>clamped to 4:5 to 1.91:1, plus both limits"]
  B --> C["Score each: sum of min(R/r, r/R)"]
  C --> D["Highest score wins<br/>(tie goes to closest to square)"]
  D --> R
  R --> E["Box = smallest at ratio R<br/>that fits every photo natively"]
  E --> F["Add padding on every side"]
  F --> G["Round to whole pixels,<br/>ignoring float error"]
  G --> H{"Export width?"}
  H -- Original --> I["Keep size, cap at 1440 wide"]
  H -- 1080 / 1440 --> J["Scale, clamp height to Instagram's range"]
```

### Scoring a few candidates instead of every ratio

The point of the tool is that every slide shares one canvas, so Auto mode needs one ratio for the whole set. A photo with ratio `r` in a box with ratio `R` fills `min(R/r, r/R)` of it. The total over all photos can only peak at one of the photos' own ratios or at a range limit, so the tool only scores those.

For my test set, 4:5 scores 3.6 (the three tall photos fill 100% of it, the wide one 60%) and 4:3 scores 2.8.

Because every photo fits into the same box, photos with the same aspect ratio end up in the same spot, even if one is 6000 pixels wide and the other 2000.

### The floating-point rounding guard

Rounding was the fiddly part. The code rounds one side of the canvas up so it's never too small for the photos. But JavaScript can't store most fractions exactly, so a value that should be whole sometimes comes out a hair above it. For an 878 × 800 photo with no padding, the height works out to `878 / (878 / 800)`, which JavaScript computes as `800.0000000000001`. Rounding that up gives 801, so the canvas is one pixel taller than the photo and a half-pixel strip of white shows along the top and bottom edges.

So the code subtracts `1e-9` before rounding up. That's far bigger than the floating-point error and far smaller than any real fraction of a pixel, so the height comes out as 800.

### Drawing and exporting

Decoding with `createImageBitmap(file, { imageOrientation: 'from-image' })` applies the EXIF rotation, so phone photos don't come out sideways. The thumbnails and the export use the same `drawSlide` function, so what you see in the grid matches the file you download. [JSZip](https://stuk.github.io/jszip/) builds the ZIP.

The file size under each slide comes from encoding it for real, 350 ms after you stop moving the slider, so the 8 MB warning uses real sizes instead of estimates. The layout and drawing code is in [`app/lib/carousel/`](https://github.com/SubodhDahal/subodhdahal.github.io/tree/master/app/lib/carousel).

## What's missing

The padding is always white. I haven't decided whether other colors are worth adding. If something breaks on your photos or you want a feature, please [open an issue on GitHub](https://github.com/SubodhDahal/subodhdahal.github.io/issues/new).

## Sitemap

See the full [sitemap](https://subodhdahal.com/sitemap.md) for all pages.
