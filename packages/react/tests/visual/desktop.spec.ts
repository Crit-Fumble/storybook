import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Desktop components
 * These tests capture screenshots of components across different themes
 */

// Helper to navigate to a story
const gotoStory = async (page: any, story: string) => {
  await page.goto(`/iframe.html?id=${story}&viewMode=story`);
  // Wait for story to render
  await page.waitForTimeout(500);
};

test.describe('Desktop Atoms', () => {
  test('WindowControls - Default state', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-atoms-windowcontrols--default');
    await expect(page).toHaveScreenshot('window-controls-default.png');
  });

  test('WindowControls - Maximized state', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-atoms-windowcontrols--maximized');
    await expect(page).toHaveScreenshot('window-controls-maximized.png');
  });

  test('TitleBar - With icon', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-atoms-titlebar--with-icon');
    await expect(page).toHaveScreenshot('titlebar-with-icon.png');
  });

  test('DesktopIcon - Default', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-atoms-desktopicon--default');
    await expect(page).toHaveScreenshot('desktop-icon-default.png');
  });

  test('DesktopIcon - Selected', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-atoms-desktopicon--selected');
    await expect(page).toHaveScreenshot('desktop-icon-selected.png');
  });

  test('DockItem - Default', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-atoms-dockitem--default');
    await expect(page).toHaveScreenshot('dock-item-default.png');
  });

  test('DockItem - Active with badge', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-atoms-dockitem--active-with-badge');
    await expect(page).toHaveScreenshot('dock-item-active-badge.png');
  });
});

test.describe('Desktop Molecules', () => {
  test('WindowHeader - Default', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-molecules-windowheader--default');
    await expect(page).toHaveScreenshot('window-header-default.png');
  });

  test('Window - Modern theme', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-molecules-window--modern-theme');
    await expect(page).toHaveScreenshot('window-modern-theme.png');
  });

  test('Window - Fantasy theme', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-molecules-window--fantasy-theme');
    await expect(page).toHaveScreenshot('window-fantasy-theme.png');
  });

  test('Window - Sci-Fi theme', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-molecules-window--sci-fi-theme');
    await expect(page).toHaveScreenshot('window-scifi-theme.png');
  });

  test('Window - Cyberpunk theme', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-molecules-window--cyberpunk-theme');
    await expect(page).toHaveScreenshot('window-cyberpunk-theme.png');
  });

  test('Window - Horror theme', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-molecules-window--horror-theme');
    await expect(page).toHaveScreenshot('window-horror-theme.png');
  });
});

test.describe('Desktop Organisms', () => {
  test('Dock - Bottom position', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-organisms-dock--bottom-position');
    await expect(page).toHaveScreenshot('dock-bottom.png');
  });

  test('Dock - Top position', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-organisms-dock--top-position');
    await expect(page).toHaveScreenshot('dock-top.png');
  });

  test('Desktop - With icons and dock', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-organisms-desktop--with-icons-and-dock');
    await expect(page).toHaveScreenshot('desktop-with-icons-dock.png');
  });

  test('Desktop - Modern theme', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-organisms-desktop--modern-theme');
    await expect(page).toHaveScreenshot('desktop-modern.png');
  });

  test('Desktop - Fantasy theme', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-organisms-desktop--fantasy-theme');
    await expect(page).toHaveScreenshot('desktop-fantasy.png');
  });

  test('WindowManager - Multiple windows', async ({ page }) => {
    await gotoStory(page, 'shared-desktop-organisms-windowmanager--multiple-windows');
    await expect(page).toHaveScreenshot('window-manager-multiple.png');
  });
});
