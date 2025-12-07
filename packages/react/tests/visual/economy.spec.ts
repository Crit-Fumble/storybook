import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Economy components
 * These tests capture screenshots of economy components in various states
 */

// Helper to navigate to a story
const gotoStory = async (page: any, story: string) => {
  await page.goto(`/iframe.html?id=${story}&viewMode=story`);
  // Wait for story to render
  await page.waitForTimeout(500);
};

test.describe('Economy Atoms', () => {
  test('CritCoin - All sizes', async ({ page }) => {
    await gotoStory(page, 'shared-economy-atoms-critcoin--all-sizes');
    await expect(page).toHaveScreenshot('crit-coin-sizes.png');
  });

  test('StoryCredit - Default', async ({ page }) => {
    await gotoStory(page, 'shared-economy-atoms-storycredit--default');
    await expect(page).toHaveScreenshot('story-credit-default.png');
  });

  test('CurrencyAmount - With plus sign', async ({ page }) => {
    await gotoStory(page, 'shared-economy-atoms-currencyamount--with-plus-sign');
    await expect(page).toHaveScreenshot('currency-amount-plus.png');
  });

  test('CurrencyAmount - Large number', async ({ page }) => {
    await gotoStory(page, 'shared-economy-atoms-currencyamount--large-number');
    await expect(page).toHaveScreenshot('currency-amount-large.png');
  });
});

test.describe('Economy Molecules', () => {
  test('CritCoinBalance - Default', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-critcoinbalance--default');
    await expect(page).toHaveScreenshot('crit-coin-balance.png');
  });

  test('StoryCreditBalance - Default', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-storycreditbalance--default');
    await expect(page).toHaveScreenshot('story-credit-balance.png');
  });

  test('TipJar - Default', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-tipjar--default');
    await expect(page).toHaveScreenshot('tip-jar-default.png');
  });

  test('TipJar - With avatar', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-tipjar--with-avatar');
    await expect(page).toHaveScreenshot('tip-jar-avatar.png');
  });

  test('TipJar - With user balance', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-tipjar--with-user-balance');
    await expect(page).toHaveScreenshot('tip-jar-balance.png');
  });

  test('TransactionItem - Tip received', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-transactionitem--tip-received');
    await expect(page).toHaveScreenshot('transaction-tip-received.png');
  });

  test('TransactionItem - Tip sent', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-transactionitem--tip-sent');
    await expect(page).toHaveScreenshot('transaction-tip-sent.png');
  });

  test('TransactionItem - Pending', async ({ page }) => {
    await gotoStory(page, 'shared-economy-molecules-transactionitem--pending-status');
    await expect(page).toHaveScreenshot('transaction-pending.png');
  });
});

test.describe('Economy Organisms', () => {
  test('EconomyDashboard - Default', async ({ page }) => {
    await gotoStory(page, 'shared-economy-organisms-economydashboard--default');
    await expect(page).toHaveScreenshot('economy-dashboard-default.png');
  });

  test('EconomyDashboard - New user', async ({ page }) => {
    await gotoStory(page, 'shared-economy-organisms-economydashboard--new-user');
    await expect(page).toHaveScreenshot('economy-dashboard-new-user.png');
  });

  test('EconomyDashboard - High earner', async ({ page }) => {
    await gotoStory(page, 'shared-economy-organisms-economydashboard--high-earner');
    await expect(page).toHaveScreenshot('economy-dashboard-high-earner.png');
  });

  test('PayoutPanel - Default', async ({ page }) => {
    await gotoStory(page, 'shared-economy-organisms-payoutpanel--default');
    await expect(page).toHaveScreenshot('payout-panel-default.png');
  });

  test('TransactionHistory - With transactions', async ({ page }) => {
    await gotoStory(page, 'shared-economy-organisms-transactionhistory--with-transactions');
    await expect(page).toHaveScreenshot('transaction-history-with-items.png');
  });

  test('TransactionHistory - Empty state', async ({ page }) => {
    await gotoStory(page, 'shared-economy-organisms-transactionhistory--empty-state');
    await expect(page).toHaveScreenshot('transaction-history-empty.png');
  });

  test('TransactionHistory - Loading state', async ({ page }) => {
    await gotoStory(page, 'shared-economy-organisms-transactionhistory--loading');
    await expect(page).toHaveScreenshot('transaction-history-loading.png');
  });
});
