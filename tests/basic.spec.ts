import { test, expect } from '@playwright/test';

test('Home page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Practice Platform for Automation Testing');
  await page.pause();
});