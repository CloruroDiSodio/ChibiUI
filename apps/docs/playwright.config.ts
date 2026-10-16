import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;
// Locally we drive the installed Chrome (no browser download); CI installs Chromium.
const useSystemChrome = !process.env.CI;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], ...(useSystemChrome ? { channel: 'chrome' } : {}) },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'], ...(useSystemChrome ? { channel: 'chrome' } : {}) },
      testMatch: /responsive\.spec\.ts/,
    },
  ],
  webServer: {
    command: `pnpm start --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
