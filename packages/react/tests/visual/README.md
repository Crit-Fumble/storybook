# Visual Regression Tests

This directory contains Playwright visual regression tests for the @crit-fumble/react component library.

## Overview

Visual regression tests capture screenshots of components rendered in Storybook and compare them against baseline "golden" screenshots. This ensures visual consistency and catches unintended UI changes.

## Test Coverage

### Desktop Components
- **Atoms**: WindowControls, TitleBar, DesktopIcon, DockItem
- **Molecules**: WindowHeader, Window (all 5 themes)
- **Organisms**: Desktop, Dock, WindowManager

### Economy Components
- **Atoms**: CritCoin, StoryCredit, CurrencyAmount
- **Molecules**: CritCoinBalance, StoryCreditBalance, TipJar, TransactionItem
- **Organisms**: EconomyDashboard, PayoutPanel, TransactionHistory

## Running Tests

### Prerequisites

1. **Storybook must be running** on `http://localhost:6006`
   ```bash
   npm run storybook
   ```

2. **Playwright browsers installed**
   ```bash
   npx playwright install chromium
   ```

### Test Commands

```bash
# Run all visual tests
npm run test:visual

# Update baseline screenshots (run this after intentional UI changes)
npm run test:visual:update

# Run tests in UI mode (interactive debugging)
npm run test:visual:ui

# Run specific test file
npx playwright test tests/visual/desktop.spec.ts

# Run tests with headed browser (see what's happening)
npx playwright test --headed
```

## Golden Screenshots

Baseline screenshots are stored in:
```
tests/visual/__snapshots__/desktop.spec.ts/
tests/visual/__snapshots__/economy.spec.ts/
```

### When to Update Snapshots

Update golden screenshots when you:
- Intentionally change component styling
- Update themes or colors
- Fix visual bugs
- Add new visual states

**Important**: Always review snapshot diffs carefully before updating to ensure changes are intentional.

## CI/CD Integration

Visual tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run visual tests
  run: |
    npm run storybook &
    npx wait-on http://localhost:6006
    npm run test:visual
```

## Troubleshooting

### Tests failing with "No page.goto calls"
- Ensure Storybook is running on port 6006
- Check that story IDs match the ones in your Storybook

### Snapshot differences on different machines
- This is expected due to font rendering and anti-aliasing differences
- Adjust `maxDiffPixels` and `threshold` in `playwright.config.ts` if needed
- Consider running tests in Docker for consistent rendering

### Tests timing out
- Increase timeout in test files: `test.setTimeout(30000)`
- Check that Storybook stories are rendering correctly

## Best Practices

1. **Run tests locally** before committing changes
2. **Review diffs carefully** when updating snapshots
3. **Keep stories simple** - each story should test one visual state
4. **Use consistent viewport** sizes across tests
5. **Test critical states** - focus on different themes, states, and edge cases

## Theme Testing

Desktop components are tested across all 5 themes:
- Modern (default, CFG branding)
- Fantasy
- Sci-Fi
- Cyberpunk
- Horror

This ensures visual consistency and catches theme-specific rendering issues.
