export function formatDate(string: string) {
  const options: Object = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(string).toLocaleDateString('en-US', options)
  return date
}

export function replaceHyphen(slug: string) {
  return String(slug).replaceAll('-', ' ')
}

export function withTrailingSlash(path: string): string {
  if (!path || path === '/') return path || '/'
  // Don't touch hash-only, query-only, file URLs, or external URLs
  if (/^#/.test(path) || /^https?:\/\//.test(path) || /\.[a-z0-9]+(\?.*)?(#.*)?$/i.test(path)) return path
  // Strip query/hash for slash decision
  const [pathname, suffix] = path.split(/(?=[?#])/)
  return pathname!.endsWith('/') ? path : `${pathname}/${suffix ?? ''}`
}
