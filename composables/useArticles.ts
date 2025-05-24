import type { ParsedContent } from '@nuxt/content'
import { ref, watch } from 'vue'

interface Article extends Omit<ParsedContent, 'body'> {
  url?: string
  _path?: string
  title: string
  description?: string
  image?: string
  tags?: string[]
  postDate: string
}

interface UseArticlesOptions {
  tags?: string[]
  quantity?: number
  content?: string
  page?: number
  pageSize?: number
  currentArticle?: string
  relatedTo?: string[]
}

export function useArticles(options: UseArticlesOptions = {}) {
  const {
    tags = [],
    quantity = 100,
    content = 'blog',
    page = 1,
    pageSize = 10,
    currentArticle,
    relatedTo
  } = options

  const articles = ref<Article[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getArticles(tags: string[] = [], quantity: number = 100, content: string): Promise<Article[]> {
    try {
      const query = queryContent(content)
        .where({
          published: { $ne: false },
          ...(tags.length > 0 && { tags: { $contains: tags } })
        })
        .without('body')
        .sort({ postDate: -1 })
        .limit(quantity)

      const { data } = await useAsyncData(`articles-${tags.join('-')}`, () => query.find())
      return data.value as Article[] || []
    } catch (e) {
      console.error('Error fetching articles:', e)
      error.value = 'Failed to fetch articles'
      return []
    }
  }

  const fetchArticles = async () => {
    isLoading.value = true
    error.value = null
    try {
      articles.value = await getArticles(tags, quantity, content)
    } catch (e) {
      error.value = 'Failed to fetch articles'
    } finally {
      isLoading.value = false
    }
  }

  // Watch for tag changes
  watch(() => tags, async (newTags) => {
    await fetchArticles()
  }, { deep: true })

  // Initial fetch
  fetchArticles()

  // Get paginated articles
  async function getPaginatedArticles() {
    const start = (page - 1) * pageSize
    const articles = await getArticles(tags, quantity, content)
    const totalPages = Math.ceil(articles.length / pageSize)
    return {
      articles: articles.slice(start, start + pageSize),
      totalPages,
      currentPage: page
    }
  }

  // Get adjacent (prev/next) articles
  async function getAdjacentArticles(currentPath: string) {
    const allArticles = await getArticles([], Infinity, content)
    const currentIndex = allArticles.findIndex(article => article._path === currentPath)

    return {
      prev: currentIndex > 0 ? allArticles[currentIndex - 1] : null,
      next: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
    }
  }

  // Get related articles
  async function getRelatedArticles(sourceTags: string[], excludePath: string) {
    if (!sourceTags?.length) return []

    const allArticles = await getArticles([], quantity, content)
    return allArticles
      .filter(article =>
        article._path !== excludePath &&
        article.tags?.some(tag => sourceTags.includes(tag))
      )
      .sort((a, b) => {
        // Sort by number of matching tags
        const aMatches = a.tags?.filter(tag => sourceTags.includes(tag)).length || 0
        const bMatches = b.tags?.filter(tag => sourceTags.includes(tag)).length || 0
        return bMatches - aMatches
      })
      .slice(0, 3) // Limit to 3 related articles
  }

  return {
    articles,
    isLoading,
    error,
    fetchArticles,
    getPaginatedArticles,
    getAdjacentArticles,
    getRelatedArticles
  }
}
