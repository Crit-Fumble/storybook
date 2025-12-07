import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for FumbleBot Chat components
 * These tests capture screenshots of chat components in various states
 */

// Helper to navigate to a story
const gotoStory = async (page: any, story: string) => {
  await page.goto(`/iframe.html?id=${story}&viewMode=story`);
  // Wait for story to render
  await page.waitForTimeout(500);
};

test.describe('FumbleBot Chat', () => {
  test('FumbleBot Chat - Logged in (closed)', async ({ page }) => {
    await gotoStory(page, 'web-organisms-fumblebotchat--logged-in');
    await expect(page).toHaveScreenshot('fumblebot-chat-logged-in.png');
  });

  test('FumbleBot Chat - With avatar', async ({ page }) => {
    await gotoStory(page, 'web-organisms-fumblebotchat--with-avatar');
    await expect(page).toHaveScreenshot('fumblebot-chat-with-avatar.png');
  });

  test('FumbleBot Chat - Not logged in', async ({ page }) => {
    await gotoStory(page, 'web-organisms-fumblebotchat--not-logged-in');
    // Should be empty since component doesn't render when user is null
    await expect(page).toHaveScreenshot('fumblebot-chat-not-logged-in.png');
  });
});
