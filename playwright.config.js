import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  outputDir: './.cache/playwright',
  reporter: 'list',
  workers: 1,
  timeout: 90_000,
  webServer: process.env.TEST_URL ? undefined : {
    command: 'npm run dev -- --host 127.0.0.1 --strictPort',
    url: 'http://127.0.0.1:5173/',
    reuseExistingServer: true,
  },
  use: { baseURL: process.env.TEST_URL || 'http://127.0.0.1:5173/', viewport: { width: 1280, height: 900 } },
  projects: [
    { name: 'Chrome', use: { channel: 'chrome' } },
    { name: 'Edge', use: { channel: 'msedge' } },
  ],
});
