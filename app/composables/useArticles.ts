import type { BlogPostPreview, UseArticlesOptions, PaginationResult, AdjacentArticles } from "~/types";
import { ref } from "vue";
import { withTrailingSlash } from "~/composables/utils";

export function useArticles(options: UseArticlesOptions = {}) {
  const {
    quantity = 100,
    page = 1,
    pageSize = 10,
  } = options;

  const articles = ref<BlogPostPreview[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function getArticles(quantity = 100): Promise<BlogPostPreview[]> {
    try {
      const { data } = await useAsyncData(`articles-${quantity}`, () =>
        queryCollection("blog")
           .select("title", "description", "tags", "postDate", "path", "url", "topic")
          .order("postDate", "DESC")
          .limit(quantity)
          .all(),
      );
      return (data.value || []).map((article) => ({
        ...article,
        path: withTrailingSlash(article.path),
      }));
    } catch (e) {
      console.error("Error fetching articles:", e);
      error.value = "Failed to fetch articles";
      return [];
    }
  }

  const fetchArticles = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      articles.value = await getArticles(quantity);
    } catch (e) {
      error.value = "Failed to fetch articles";
    } finally {
      isLoading.value = false;
    }
  };

  // Initial fetch
  fetchArticles();

  // Get paginated articles
  async function getPaginatedArticles(): Promise<PaginationResult> {
    const start = (page - 1) * pageSize;
    const articles = await getArticles(quantity);
    const totalPages = Math.ceil(articles.length / pageSize);
    return {
      articles: articles.slice(start, start + pageSize),
      totalPages,
      currentPage: page,
    };
  }

  // Get adjacent (prev/next) articles
  async function getAdjacentArticles(currentPath: string): Promise<AdjacentArticles> {
    const allArticles = await getArticles(10);
    const currentIndex = allArticles.findIndex(
      (article) => article.path === currentPath,
    );

    return {
      prev: currentIndex > 0 ? allArticles[currentIndex - 1] : null,
      next:
        currentIndex < allArticles.length - 1
          ? allArticles[currentIndex + 1]
          : null,
    };
  }

  // Get related articles
  // Same-topic posts first (the cluster), then by tag overlap. Tags compare
  // case-insensitively so "Homelab" and "homelab" still match.
  async function getRelatedArticles(sourceTags: string[], excludePath: string, topic?: string): Promise<BlogPostPreview[]> {
    const wanted = new Set((sourceTags ?? []).map((t) => t.toLowerCase()));
    if (!wanted.size && !topic) return [];

    // getArticles() rewrites every path with a trailing slash, but the path
    // passed in from the blog post page is the raw @nuxt/content path
    // (no slash). Normalize once so the exclude check actually matches —
    // without this the current article leaks into its own related list.
    const normalizedExclude = withTrailingSlash(excludePath);

    const allArticles = await getArticles(quantity);
    const overlap = (a: BlogPostPreview) =>
      (a.tags ?? []).filter((t: string) => wanted.has(t.toLowerCase())).length;
    const score = (a: BlogPostPreview) => (topic && a.topic === topic ? 100 : 0) + overlap(a);

    return allArticles
      .filter((a: BlogPostPreview) => a.path !== normalizedExclude && score(a) > 0)
      .sort((a: BlogPostPreview, b: BlogPostPreview) => score(b) - score(a))
      .slice(0, 3); // Limit to 3 related articles
  }

  return {
    articles,
    isLoading,
    error,
    fetchArticles,
    getPaginatedArticles,
    getAdjacentArticles,
    getRelatedArticles,
  };
}
