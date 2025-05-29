import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/*.md",
      type: "page",
      // Define custom schema for docs collection
      schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        postDate: z.date(),
        // : z.string(),
      }),
    }),
  },
});
