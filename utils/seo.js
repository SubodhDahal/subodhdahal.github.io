export const createSEOMeta = data => [
  { name: 'description', content: data.description },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: 'Subodh Dahal' },
  { hid: 'og:type', property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: `https://subodhdahal.com/${data.url}`
  },
  {
    property: 'og:title',
    content: data.title,
  },
  {
    property: 'og:description',
    content: data.description,
  },
  {
    property: 'og:image',
    content: data.ogImage || data.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: `https://subodhdahal.com/${data.url}`
  },
  {
    name: 'twitter:title',
    content: data.title,
  },
  {
    name: 'twitter:description',
    content: data.description,
  },
  {
    name: 'twitter:image',
    content: data.ogImage || data.image,
  },
]
