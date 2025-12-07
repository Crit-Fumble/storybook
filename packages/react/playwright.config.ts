import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing
 * Tests are run against Storybook stories to capture component screenshots
 */
export default defineConfig({
  testDir: './tests/visual',

  // Snapshots directory structure
  snapshotDir: './tests/visual/__snapshots__',
  snapshotPathTemplate: '{snapshotDir}/{testFileDir}/{testFileName}/{arg}{ext}',

  // Visual comparison settings
  expect: {
    toHaveScreenshot: {
      // Allow slight differences for anti-aliasing across different machines
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },

  // Fail the build on CI if snapshots are missing
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // Run tests in parallel
  workers: process.env.CI ? 1 : undefined,

  // Reporter settings
  reporter: process.env.CI ? 'github' : 'html',

  use: {
    // Base URL for Storybook (must be running)
    baseURL: 'http://localhost:6006',

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Screenshot settings
    screenshot: 'only-on-failure',
  },

  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Start Storybook dev server before running tests (optional)
  // webServer: {
  //   command: 'npm run storybook',
  //   url: 'http://localhost:6006',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000,
  // },
});
