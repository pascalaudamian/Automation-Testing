// tests/date-time-pickers.spec.ts

import { test, expect } from '@playwright/test';

test('Date and Time Picker Examples', async ({ page }) => {
    await page.goto('http://localhost:3000/date-time-pickers');
    await page.waitForSelector('.date-time-pickers-page .title-button');
    await page.waitForSelector('input[placeholder="Select Date"]');
});

test('Testing date and time page is responsive', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
  await page.getByTestId('nav-date-&-time-pickers').click();
  await page.locator('div').filter({ hasText: /^Today$/ }).getByRole('button').first().click();
  await page.locator('div:nth-child(3) > .flex > button').first().click();
  await page.getByRole('button', { name: 'Today' }).click();
  await page.getByRole('button', { name: 'Now' }).first().click();
  await page.getByRole('button', { name: 'Now' }).nth(1).click();
  await page.locator('div').filter({ hasText: /^Now$/ }).getByRole('button').first().click();
  await page.getByRole('button', { name: 'Now' }).nth(2).click();
  await page.locator('label div').click();
  await page.locator('label div').click();
});