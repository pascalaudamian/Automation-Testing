import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test('Page title and main heading', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle('Automation Testing Practice Platform');
    await expect(page.locator('h1')).toContainText('Automation Testing Practice Platform');
  });
});