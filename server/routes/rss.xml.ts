import { createBaseFeed, addPostsToFeed } from "../utils/feed";
import { getBlogPosts } from "../utils/blog";

export default defineEventHandler(async (event) => {
  const baseUrl = "https://subodhdahal.com";
  const blogPosts = await getBlogPosts(event);

  const feed = createBaseFeed(baseUrl);
  addPostsToFeed(feed, blogPosts, baseUrl);

  console.log("RSS feed generated successfully", feed);

  setResponseHeader(
    event,
    "content-type",
    "application/rss+xml; charset=utf-8",
  );
  return feed.rss2();
});
