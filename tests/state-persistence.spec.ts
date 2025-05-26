import { test, expect } from '@playwright/test';

test('Testing the state persistence page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
  await page.getByTestId('nav-state-persistence').click();
   await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Toggle Theme (Light)' }).click();
  await page.getByRole('button', { name: 'Toggle Theme (Dark)' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('body')).toContainText('✅ Logged In (via Cookie)');
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.getByRole('textbox', { name: 'Enter a note that lasts for' }).click();
  await page.getByRole('textbox', { name: 'Enter a note that lasts for' }).fill('testing with playwright');
  await page.getByRole('button', { name: 'Save to Session' }).click();
  await page.getByRole('textbox', { name: 'Enter a new note for IndexedDB' }).click();
  await page.getByRole('textbox', { name: 'Enter a new note for IndexedDB' }).fill('testing note');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('listitem')).toContainText('testing note');
  await page.getByRole('button', { name: 'Delete note: "testing note"' }).click();
  await page.getByRole('button', { name: 'Clear Note' }).click();
});