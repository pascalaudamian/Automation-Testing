import { test, expect } from '@playwright/test';

test('testing the responsive layouts example page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
  await page.getByTestId('nav-responsive-layouts').click();
  await page.locator('div').filter({ hasText: /^Item 1This is a grid item with some text and an image\.$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Item 2This is another grid item with an image and text\.$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Item 3More grid items can have content like text and images\.$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Item 4This item also contains text and an image\.$/ }).getByRole('img').click();
  await page.getByRole('button', { name: 'Two-Column Layout' }).click();
  await page.locator('div').filter({ hasText: /^Left ColumnThis is the left column with an image and text content\.$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Right ColumnThis is the right column, also with some text and an image\.$/ }).getByRole('img').click();
  await page.getByText('Left ColumnThis is the left').click();
  await page.getByText('Right ColumnThis is the right').click();
  await page.getByRole('button', { name: 'Three-Column Layout' }).click();
  await page.getByText('Column 1This is the first').click();
  await page.getByText('Column 2This is the second').click();
  await page.getByText('Column 3The third column also').click();
  await page.getByRole('button', { name: 'Flexbox Layout' }).click();
  await page.getByText('Flex Item 1This is the first').click();
  await page.locator('div').filter({ hasText: /^Flex Item 2This is the second flex item with content\.$/ }).getByRole('img').click();
  await page.locator('div').filter({ hasText: /^Flex Item 3The third flex item contains an image and some more text\.$/ }).getByRole('img').click();
});