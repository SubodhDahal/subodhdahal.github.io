import type { BlogPostPreview, UseArticlesOptions, PaginationResult, AdjacentArticles } from "~/types";
import { ref } from "vue";

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
      const { data } = await useAsyncData(`articles-all`, () =>
        queryCollection("blog")
          .select("title", "description", "tags", "postDate", "path", "url")
          .order("postDate", "DESC")
          .limit(quantity)
          .all(),
      );
      return data.value || [];
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
    const allArticles = await getArticles(Infinity);
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
  async function getRelatedArticles(sourceTags: string[], excludePath: string): Promise<BlogPostPreview[]> {
    if (!sourceTags?.length) return [];

    const allArticles = await getArticles(quantity);
    return allArticles
      .filter(
        (article: BlogPostPreview) =>
          article.path !== excludePath &&
          Array.isArray(article.tags) &&
          article.tags.some((tag: string) => sourceTags.includes(tag)),
      )
      .sort((a: BlogPostPreview, b: BlogPostPreview) => {
        // Sort by number of matching tags
        const aMatches =
          (Array.isArray(a.tags) ? a.tags.filter((tag: string) => sourceTags.includes(tag)).length : 0);
        const bMatches =
          (Array.isArray(b.tags) ? b.tags.filter((tag: string) => sourceTags.includes(tag)).length : 0);
        return bMatches - aMatches;
      })
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
