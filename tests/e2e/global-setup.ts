import { chromium } from '@playwright/test'

const URL = 'http://localhost:5199/tools/instagram-carousel/'

/**
 * A request that reaches `nuxt dev` while it is still starting can hang forever
 * (seen on CI), while the next one succeeds. Give up on each attempt quickly and
 * ask again.
 */
async function waitForPage(timeout = 240_000) {
  const deadline = Date.now() + timeout
  while (Date.now() < deadline) {
    try {
      const response = await fetch(URL, { signal: AbortSignal.timeout(10_000) })
      if (response.ok) return
    } catch {
      // Timed out or refused: try again.
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  throw new Error(`Timed out waiting ${timeout}ms for ${URL}`)
}

/**
 * Nuxt dev compiles lazily and Vite re-optimizes dependencies the first time the
 * page loads in a browser, which reloads the page under parallel tests. Load the
 * page once up front so every test starts against a warm server.
 */
export default async function globalSetup() {
  await waitForPage()
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 120_000 })
  await page.waitForSelector('input[type=file]', { state: 'attached' })
  await page.waitForTimeout(3000)
  await browser.close()
}
