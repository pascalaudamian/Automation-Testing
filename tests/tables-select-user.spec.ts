import { test, expect } from '@playwright/test';

test('testing adding user to the table', async ({ page }) => {
  await page.goto('http://localhost:3000/tables');
  await page.getByTestId('add-user-button').click();
  await page.getByTestId('add-user-name').fill('admin');
  await page.getByTestId('add-user-email').click();
  await page.getByTestId('add-user-email').fill('admin@admin.com');
  await page.getByTestId('add-user-status-trigger').click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByTestId('add-user-role').click();
  await page.getByTestId('add-user-role').fill('admin');
  await page.getByTestId('add-user-save').click();
})