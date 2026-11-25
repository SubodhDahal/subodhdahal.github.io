import { chromium } from '@playwright/test'

/**
 * Nuxt dev compiles lazily and Vite re-optimizes dependencies the first time the
 * page loads in a browser, which reloads the page under parallel tests. Load the
 * page once up front so every test starts against a warm server.
 */
export default async function globalSetup() {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:5199/tools/instagram-carousel/', { waitUntil: 'networkidle', timeout: 120_000 })
  await page.waitForSelector('input[type=file]', { state: 'attached' })
  await page.waitForTimeout(3000)
  await browser.close()
}
