import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        date: z.string(),
        postDate: z.date(),
        description: z.string(),
        url: z.string().optional(),
        image: z.string(),
        alt: z.string(),
        ogImage: z.string().optional(),
        provider: z.string(),
        tags: z.array(z.string()),
        published: z.boolean().optional(),
        seo: z.object({
          title: z.string().optional(),
          description: z.string().optional()
        }).optional()
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
          genres: z.array(z.string())
        }))
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.md',
      schema: z.object({})
    })
  }
})
