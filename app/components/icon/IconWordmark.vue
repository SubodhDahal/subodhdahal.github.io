<template>
  <!--
    Typographic wordmark — the typographic counterpart to the SD monogram.
    Uses the site's identity serif (Newsreader) in italic 600 plus the
    signature 4px rose-500 rule beneath the name.

    The monogram remains the binding mark for the header; this wordmark
    is the typographic mark for surfaces that need a name (OG image,
    footer credit, about page, email signature, etc.).
  -->
  <svg
    viewBox="0 0 520 140"
    xmlns="http://www.w3.org/2000/svg"
    class="wordmark"
    role="img"
    aria-label="Subodh Dahal"
  >
    <title>Subodh Dahal</title>
    <desc>Typographic wordmark set in Newsreader italic 600, with the 4px rose-500 rule beneath.</desc>
    <text
      x="32"
      y="92"
      class="wordmark-text"
      fill="currentColor"
    >Subodh Dahal</text>
    <rect
      x="32"
      y="108"
      width="80"
      height="4"
      class="wordmark-rule"
    />
  </svg>
</template>

<style scoped>
.wordmark-text {
  font-family: 'Newsreader', Georgia, serif;
  font-style: italic;
  font-weight: 600;
  font-size: 64px;
  letter-spacing: -0.01em;
}
.wordmark-rule {
  fill: #F43F5E;
}
</style>
