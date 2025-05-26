
import { test, expect } from '@playwright/test';

test('Pagination Types component', async ({ page }) => {
  await page.goto('http://localhost:3000/pagination');
  await page.getByText('Item 1', { exact: true }).click();
  await page.getByText('Item 10').click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '10' }).click();
  await page.getByText('Item 100').click();
  await page.getByRole('button', { name: 'Load More Button' }).click();
  await page.getByText('Item 4').click();
  await page.getByText('Item 9').click();
  await page.getByRole('button', { name: 'Load More (10/100)' }).click();
  await page.getByText('Item 20').click();
  await page.getByRole('button', { name: 'Load More (20/100)' }).click();
  await page.getByText('Item 30').click();
  await page.getByRole('button', { name: 'Load More (30/100)' }).click();
  await page.getByText('Item 40').click();
  await page.getByRole('button', { name: 'Load More (40/100)' }).click();
  await page.getByText('Item 50').click();
  await page.getByRole('button', { name: 'Infinite Scroll' }).click();
  await page.getByText('Item 10').click();
  await page.getByText('Item 20').click();
  await page.getByText('Item 30').click();
});