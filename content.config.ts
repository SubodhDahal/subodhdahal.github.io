import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import {
  defineOgImageSchema,
  defineRobotsSchema,
  defineSchemaOrgSchema,
  defineSitemapSchema,
} from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        postDate: z.date(),
        updated: z.date().optional(),
        description: z.string(),
        url: z.string().optional(),
        image: z.string(),
        alt: z.string(),
        ogImage: z.string().optional(),
        tags: z.array(z.string()),
        // Slug of a content/topics/*.md hub; groups posts into clusters.
        topic: z.string().optional(),
        published: z.boolean().optional(),
        seo: z.object({
          title: z.string().optional(),
          description: z.string().optional()
        }).optional(),
        // @nuxtjs/seo v5 composed schemas (replaces deprecated asSeoCollection)
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      })
    }),
    // Topic hubs (/topics/<slug>/): intro copy + metadata; the post list is
    // built from blog posts whose `topic` matches the file name.
    topics: defineCollection({
      source: 'topics/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number().int().optional(),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      })
    }),
    library: defineCollection({
      type: 'page',
      source: 'library.json',
      schema: z.object({
        books: z.array(z.object({
          title: z.string(),
          author: z.string(),
          image: z.string(),
          year: z.number().int().optional(),
          genres: z.array(z.string()),
          description: z.string(),
          // Long-form "why it stayed with me" note. Multi-paragraph
          // supported via blank-line (\n\n) separation; the template
          // renders one <p> per paragraph.
          recommendation: z.string(),
          quote: z.string().optional(),
          quoteAttribution: z.string().optional(),
          // Up to a handful of pull quotes per book.
          quotes: z.array(z.object({
            text: z.string(),
            attribution: z.string().optional(),
          })).optional(),
        })),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      })
    }),
    // /photography/: preview-sized, marked photos written by
    // scripts/photos.mjs. Array order is the hanging order on the wall.
    photography: defineCollection({
      type: 'page',
      source: 'photography.json',
      schema: z.object({
        photos: z.array(z.object({
          slug: z.string(),
          width: z.number().int(),
          height: z.number().int(),
          title: z.string(),
          place: z.string(),
          year: z.number().int().optional(),
          alt: z.string(),
          // How large the print hangs: feature prints anchor the wall,
          // small ones fill around them.
          size: z.enum(['small', 'standard', 'feature']).default('standard'),
        })),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      })
    })
  }
})
