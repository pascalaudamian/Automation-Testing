import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/error-handling');
  await page.getByRole('button', { name: 'Simulate File Load Error' }).click();
  await expect(page.locator('body')).toContainText('File simulation failed: File not found: data.json');
  await page.getByRole('textbox', { name: 'Enter number 1-' }).click();
  await page.getByRole('textbox', { name: 'Enter number 1-' }).fill('12');
  await expect(page.locator('body')).toContainText('Invalid input: enter a number between 1 and 10.');
  await page.getByRole('button', { name: 'Simulate Logical Error' }).click();
  await expect(page.locator('body')).toContainText('Logical assertion failed: condition must be true');
  await page.getByRole('button', { name: 'Simulate Network Error' }).click();
  await page.waitForTimeout(1000);
  await expect(page.locator('body')).toContainText('Network request failed: HTTP error! status: 404 Not Found - <!DOCTYPE html><html lang="en" class="__variable_5cfdac __variable_9a8899"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-wi...');
  await page.getByRole('button', { name: 'Simulate Timeout Error' }).click();
  await expect(page.locator('body')).toContainText('Workspace error during timeout simulation: Request timed out after 100ms');
});