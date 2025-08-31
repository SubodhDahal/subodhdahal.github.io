---
title: "Why I added RSS feeds to my blog (and how I did it in Nuxt 3)"
description: How I built RSS and Atom feed support for my Nuxt 3 website to let readers follow my content without social media algorithms.
image: /images/rss-feed-nuxt.jpg
alt: RSS and Atom feed implementation in Nuxt 3
postDate: 2025-08-31
tags:
  - nuxt
  - web development
  - tutorial
---

## What are RSS and Atom feeds?

RSS (Really Simple Syndication) and Atom are XML-based formats that allow websites to automatically share their latest content with subscribers. Instead of visiting each site manually, when a site publishes new content, it updates its feed, and subscribers can see the updates in their feed readers.

Some popular web-based feed readers are FreshRSS, Feedly, Inoreader, NewsBlur. There are also desktop apps like Fluent Reader and mobile apps like Reeder and Readrops. I run a [FreshRSS](https://freshrss.org/) instance in my homelab and read updates through its web UI or the Readrops app on my phone.

## The rise, fall, and resurgence of RSS/Atom

In the early days, RSS was everywhere - blogs, news sites, and podcasts all used it. Most people, including me, relied on feed readers to keep up with their favorite sites. It was a simple and effective way to follow online content.

Then social platforms came along, promising to show us content based on our interests through sophisticated algorithms. When Google Reader(a prominent feed reader at that time) shut down in 2013, it marked a symbolic shift in how we consumed online content. Like many others, I switched to getting my news and content updates primarily through social media.

After seeing how social media algorithms prioritize engagement over user interests, some of us started going back to RSS. While it's not perfect, I prefer the straightforward approach of choosing what I want to read rather than having it chosen for me.

## Adding feeds to my blog

Since I started using RSS feeds again, I wanted to add support for both feed formats on my personal blog built with Nuxt 3. I went with both formats because some feed readers are picky, and honestly, since I am using a library for the main functionality, the extra few lines of code aren't a huge deal.

Here's how I added RSS and Atom feeds to my blog:

## Setting up the feed package

The first step was installing the `feed` package:

```bash
npm install feed
# or with yarn
yarn add feed
```

## Creating the feed system

### Fetching blog posts

I started by creating a function to fetch my blog posts. Here's what I put in `server/utils/blog.ts`:

```typescript
import type { BlogPostPreview } from "~/types";

export async function getBlogPosts(event: any): Promise<BlogPostPreview[]> {
  try {
    // event parameter is required for server-side content querying
    return await queryCollection(event, "blog")
      .select("title", "description", "tags", "postDate", "path", "url")
      .order("postDate", "DESC")
      .all();
  } catch (e) {
    console.error("Error fetching blog posts:", e);
    return [];
  }
}
```

It took me a while to figure this out but on the server-side, we need to also pass the `event` parameter to `queryCollection` to access the server request context. This is not needed in client-side code.

### Generating the feeds

Next, I needed functions to generate the actual feeds. Here's what I created in `server/utils/feed.ts`:

```typescript
// Import Feed library and our blog post type
import { Feed } from "feed";
import type { BlogPostPreview } from "~/types";

export type FeedFormat = "rss" | "atom";

// Default feed metadata - customize these values
const DEFAULT_TITLE = "Your Site Name";
const DEFAULT_DESCRIPTION = "Your site description";

// Creates a new Feed instance with common configuration
export function createBaseFeed(baseUrl: string) {
  if (!baseUrl) {
    throw new Error("Base URL is required to create a feed");
  }

  return new Feed({
    title: DEFAULT_TITLE,
    id: baseUrl,
    link: baseUrl,
    description: DEFAULT_DESCRIPTION,
    language: "en",
    copyright: `Copyright ${new Date().getFullYear()} Your Name`,
    // Advertise both feed formats
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
      atom: `${baseUrl}/atom.xml`,
    },
    author: {
      name: DEFAULT_TITLE,
      link: baseUrl,
    },
    updated: new Date(), // Required for Atom feeds
  });
}

// Adds blog posts to the feed with proper metadata
export function addPostsToFeed(
  feed: Feed,
  posts: BlogPostPreview[],
  baseUrl: string,
) {
  if (!feed || !Array.isArray(posts) || !baseUrl) {
    throw new Error("Feed, posts array, and base URL are required");
  }

  for (const post of posts) {
    // Skip posts without required fields
    if (!post.title || !post.path) {
      console.warn("Skipping invalid post:", post);
      continue;
    }

    // Add post to feed with full metadata
    feed.addItem({
      title: post.title,
      id: `${baseUrl}${post.path}`, // Unique identifier
      link: `${baseUrl}${post.path}`, // Full URL to post
      description: post.description || "",
      date: new Date(post.postDate || Date.now()),
      category: post.tags?.map((tag) => ({ name: tag })) || [],
      author: [
        {
          name: DEFAULT_TITLE,
          link: baseUrl,
        },
      ],
    });
  }
}

// Unified feed generation function
export async function generateFeed(
  event: any,
  baseUrl: string,
  format: FeedFormat,
): Promise<string> {
  try {
    const blogPosts = await getBlogPosts(event);
    const feed = createBaseFeed(baseUrl);
    addPostsToFeed(feed, blogPosts, baseUrl);

    return format === "rss" ? feed.rss2() : feed.atom1();
  } catch (error) {
    console.error(`Error generating ${format} feed:`, error);
    throw error;
  }
}
```

## Setting up the routes

With the utility functions in place, I created two route handlers - one for RSS and one for Atom:

In `server/routes/rss.xml.ts`:

```typescript
import { generateFeed } from "../utils/feed";

export default defineEventHandler(async (event) => {
  const baseUrl = "https://subodhdahal.com";
  const feedContent = await generateFeed(event, baseUrl, "rss");

  setResponseHeader(
    event,
    "content-type",
    "application/rss+xml; charset=utf-8",
  );
  return feedContent;
});
```

In `server/routes/atom.xml.ts`:

```typescript
import { generateFeed } from "../utils/feed";

export default defineEventHandler(async (event) => {
  const baseUrl = "https://subodhdahal.com";
  const feedContent = await generateFeed(event, baseUrl, "atom");

  setResponseHeader(
    event,
    "content-type",
    "application/atom+xml; charset=utf-8",
  );
  return feedContent;
});
```

This allows users to access my RSS feed at `/rss.xml` and my Atom feed at `/atom.xml`.

## Making the feeds discoverable

To help feed readers find my feeds automatically, I added these links to my `app.vue`:

```typescript
useHead({
  link: [
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "Your Site Name (RSS)",
      href: "/rss.xml",
    },
    {
      rel: "alternate",
      type: "application/atom+xml",
      title: "Your Site Name (Atom)",
      href: "/atom.xml",
    },
  ],
});
```

## Making feeds visible to users

I added RSS and Atom feed links in my website's footer with a recognizable RSS icon. This makes it easy for visitors to find and subscribe to my feeds through their preferred reader.

## Static site generation

Since my blog is statically generated, I needed the feeds to be created at build time. I added this to my `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ["/rss.xml", "/atom.xml"],
    },
  },
  // ... other config
});
```

## Testing the implementation

After setting everything up, I tested my feeds by:

1. Building and deploying the site
2. Checking both `/rss.xml` and `/atom.xml` URLs
3. Validating the feeds with online tools like the [W3C Feed Validator](https://validator.w3.org/feed/)
4. Subscribing to them in my own FreshRSS instance

## Conclusion

Adding RSS and Atom feeds to my Nuxt 3 blog turned out to be simpler than I expected. Now my readers can follow my updates through their preferred feed readers, just like I follow other blogs through mine.

The complete code for this implementation is available in my [GitHub repository](https://github.com/SubodhDahal/subodhdahal.github.io).
