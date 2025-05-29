import type { ContentNavigationItem, BlogCollectionItem } from '@nuxt/content'

export type Sections = 'blog'

export type BlogPostPreview = Pick<BlogCollectionItem, "title" | "postDate" | "description" | "url" | "tags" | "path">

export interface PaginationResult {
  articles: BlogPostPreview[]
  totalPages: number
  currentPage: number
}

export interface AdjacentArticles {
  prev: BlogPostPreview | null
  next: BlogPostPreview | null
}

export interface UseArticlesOptions {
  quantity?: number
  content?: string
  page?: number
  pageSize?: number
  currentArticle?: string
  relatedTo?: string[]
}

export type PrevNext = ContentNavigationItem

export interface Navigation {
  url: string
  link: string
}
