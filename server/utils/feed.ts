import { Feed } from "feed";
import type { BlogPostPreview } from "~/types";

const DEFAULT_TITLE = "Subodh Dahal";
const DEFAULT_DESCRIPTION = "Personal website and blog of Subodh Dahal";

export function createBaseFeed(baseUrl: string) {
  if (!baseUrl) {
    throw new Error("Base URL is required to create a feed");
  }

  try {
    return new Feed({
      title: DEFAULT_TITLE,
      id: baseUrl,
      link: baseUrl,
      description: DEFAULT_DESCRIPTION,
      language: "en",
      copyright: `Copyright ${new Date().getFullYear()} Subodh Dahal`,
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
  } catch (error) {
    console.error("Error creating feed:", error);
    throw error;
  }
}

export function addPostsToFeed(
  feed: Feed,
  posts: BlogPostPreview[],
  baseUrl: string,
) {
  if (!feed || !Array.isArray(posts) || !baseUrl) {
    throw new Error("Feed, posts array, and base URL are required");
  }

  try {
    for (const post of posts) {
      if (!post.title || !post.path) {
        console.warn("Skipping invalid post:", post);
        continue;
      }

      feed.addItem({
        title: post.title,
        id: `${baseUrl}${post.path}`,
        link: `${baseUrl}${post.path}`,
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
  } catch (error) {
    console.error("Error adding posts to feed:", error);
    throw error;
  }
}
