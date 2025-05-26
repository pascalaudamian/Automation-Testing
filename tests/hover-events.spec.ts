import { test, expect } from '@playwright/test';

test('Testing the hover events page', async ({ page }) => {
  await page.goto('http://localhost:3000/hover-events');
  await page.locator('div').filter({ hasText: /^Color ChangeHover to change background color\.$/ }).first().click();
  await page.getByRole('img', { name: 'Hover scale' }).click();
  await page.waitForTimeout(3000);
  await page.locator('div').filter({ hasText: /^Box ShadowHover to see a subtle shadow\.$/ }).first().click();
  await page.getByRole('button', { name: 'Animated Button' }).click();
  await page.getByRole('button', { name: 'Hover Dropdown' }).click();
  await page.getByText('Item 1').click();
  await page.getByText('Item 2').click();
  await page.getByText('Item 3').click();
  await page.getByText('Animated Text').click();
  await page.getByText('Slight scale and lift on').click();
  await page.getByRole('link', { name: 'Hover to see underline and' }).click();
  await page.locator('div').filter({ hasText: /^Hover the icon to rotate and change color\.$/ }).getByRole('img').click();
  await page.getByText('Delayed Appearance').click();
  await page.getByText('Appears after a short delay').click();
  await page.getByRole('heading', { name: 'Multiple Effects' }).click();
  await page.getByText('Background, shadow, and scale').click();
  await page.getByText('Multiple EffectsBackground,').click();
  await page.locator('.text-red-500 > .lucide').click();
  await page.locator('.text-yellow-500 > .lucide').click();
  await page.getByRole('heading', { name: 'Border Highlight' }).click();
  await page.getByText('A border appears on hover.').click();
});