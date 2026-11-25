import { defineConfig } from '@playwright/test'

const PORT = 5199

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/e2e/global-setup.ts',
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    acceptDownloads: true,
    viewport: { width: 1200, height: 900 },
    launchOptions: {
      // Set CHROMIUM_PATH to use a system Chromium instead of `npx playwright install chromium`
      executablePath: process.env.CHROMIUM_PATH || undefined,
      args: ['--no-sandbox'],
    },
  },
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: `http://localhost:${PORT}/tools/instagram-carousel/`,
    reuseExistingServer: true,
    timeout: 240_000,
  },
})
