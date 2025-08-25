import type { BlogPostPreview } from "~/types";

export async function getBlogPosts(event: any): Promise<BlogPostPreview[]> {
  try {
    return await queryCollection(event, "blog")
      .select("title", "description", "tags", "postDate", "path", "url")
      .order("postDate", "DESC")
      .all();
  } catch (e) {
    console.error("Error fetching blog posts:", e);
    return [];
  }
}
