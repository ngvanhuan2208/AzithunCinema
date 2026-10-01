import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: { NEXT_PUBLIC_MSW_ENABLED: 'true' },
    },
    {
      command: 'pnpm exec next start -p 3001',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
