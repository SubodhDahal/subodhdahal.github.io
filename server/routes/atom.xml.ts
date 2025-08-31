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
