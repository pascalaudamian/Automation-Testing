import { test, expect } from '@playwright/test';

test('test notification page', async ({ page }) => {
  await page.goto('http://localhost:3000/notifications');
  await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
  await page.getByRole('button', { name: 'In-App Success' }).click();
  await page.getByRole('button', { name: 'In-App Error' }).click();
  await expect(page.locator('body')).toContainText('Error message!');
  await page.getByRole('button', { name: 'In-App Info' }).click();
  await expect(page.locator('body')).toContainText('Info message!');
  await page.getByRole('button', { name: 'Request Browser Permission' }).click();
  await page.getByRole('button', { name: 'Show Browser Notification' }).click();
  await expect(page.locator('body')).toContainText('Please allow browser notifications first.');
});