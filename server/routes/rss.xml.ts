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
