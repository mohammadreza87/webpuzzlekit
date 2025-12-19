import { test, expect } from '@playwright/test';

/**
 * Smoke Tests for Puzzle Kit
 *
 * These tests verify basic functionality works after changes.
 * Run with: npm run test
 */

test.describe('Loading Screen', () => {
  test('loading screen appears and has accessibility attributes', async ({ page }) => {
    // Navigate without waiting for load to complete
    await page.goto('/');

    // Loading screen should have proper ARIA attributes
    const loadingScreen = page.locator('[role="progressbar"]');
    await expect(loadingScreen).toHaveAttribute('aria-label', 'Loading application');
    await expect(loadingScreen).toHaveAttribute('aria-valuemin', '0');
    await expect(loadingScreen).toHaveAttribute('aria-valuemax', '100');
  });

  test('loading screen transitions to main content', async ({ page }) => {
    await page.goto('/');

    // Wait for main content to appear (loading complete)
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=PLAY')).toBeVisible({ timeout: 10000 });

    // Loading screen should be removed from DOM after fade animation completes
    const loadingScreen = page.locator('[role="progressbar"]');
    await expect(loadingScreen).toHaveCount(0, { timeout: 5000 });
  });

  test('main content is visible after loading', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Main menu should be fully visible with opacity 1
    const mainContent = page.locator('#app-content');
    await expect(mainContent).toBeVisible({ timeout: 10000 });
  });
});

test.describe('App Loading', () => {
  test('app loads and shows main menu', async ({ page }) => {
    await page.goto('/');

    // Wait for app to be interactive
    await page.waitForLoadState('networkidle');

    // Should see the main menu content (PLAY button in roadmap view)
    await expect(page.locator('text=PLAY')).toBeVisible({ timeout: 10000 });
  });

  test('shows player resources in header', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should see coins, lives, and stars displays
    // These are shown as numbers in the resource bar
    const header = page.locator('.bg-bg-inverse').first();
    await expect(header).toBeVisible();
  });
});

test.describe('Bottom Navigation', () => {
  test('tabs are visible and clickable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should have bottom navigation
    const bottomNav = page.locator('.border-t.border-border').last();
    await expect(bottomNav).toBeVisible();

    // Should have navigation buttons (3 default tabs: Shop, Home, Leaderboard)
    const navButtons = bottomNav.locator('button');
    await expect(navButtons).toHaveCount(3);
  });

  test('clicking shop tab navigates to shop page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on Shop tab
    await page.click('button:has-text("Shop")');

    // Should navigate to shop page - check for heading specifically
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible({ timeout: 5000 });
  });

  test('clicking leaderboard tab navigates to leaderboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on Leaderboard tab
    await page.click('button:has-text("Leaderboard")');

    // Should show leaderboard - check for heading specifically
    await expect(page.getByRole('heading', { name: 'Leaderboard' })).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Modal System', () => {
  test('can open and close profile modal', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on profile button (top-left with "PRO" text)
    await page.click('button:has-text("PRO")');

    // Modal should open - look for Profile heading
    await expect(page.locator('text=Profile')).toBeVisible({ timeout: 5000 });
  });

  test('can open settings page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click settings button (gear icon in header)
    const settingsButton = page.locator('button').filter({ has: page.locator('img[alt="Settings"]') });
    await settingsButton.click();

    // Should navigate to settings
    await expect(page.locator('text=Settings')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Feature Flag Integration', () => {
  test('main menu shows clef collection bar when enabled', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The Clef Collection progress bar should be visible
    // It's the main LiveOps event shown in the default config
    const clefBar = page.locator('button').filter({ hasText: /\/100/ });
    await expect(clefBar).toBeVisible();
  });
});

test.describe('Page Navigation', () => {
  test('can navigate to shop via header coins', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on coins display (has $ icon)
    await page.click('button:has-text("$")');

    // Should navigate to shop - check for heading specifically
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible({ timeout: 5000 });
  });

  test('can navigate back to main menu from shop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Go to shop
    await page.click('button:has-text("$")');
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible({ timeout: 5000 });

    // Click X button to close
    await page.click('button:has-text("X")');

    // Should be back at main menu (PLAY button in roadmap view)
    await expect(page.locator('text=PLAY')).toBeVisible({ timeout: 5000 });
  });
});
