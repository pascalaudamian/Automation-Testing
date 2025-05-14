import { test, expect } from '@playwright/test';

test('Dynamic Content', async ({ page }) => {
  await page.goto('http://localhost:3000/dynamic');
  await page.waitForTimeout(3000); // 3 seconds
  await page.getByText('Toggle Visibility').click();
  await page.getByText('Loading States', { exact: true }).click();
  await page.getByText('Auto-Refreshing Content', { exact: true }).click();
  await page.getByText('Stateful Counter').click();
  await page.getByTestId('toggle-button-1').click();
  await page.getByTestId('toggle-button-2').click();
  await page.getByTestId('toggle-button-3').click();
  await page.getByTestId('toggle-button-4').click();
  await page.getByTestId('loading-button-1').click();
  await page.waitForTimeout(3000); // 3 seconds
  await expect(page.getByTestId('content-1').getByRole('paragraph')).toContainText('Content 1 loaded successfully!');
  await page.getByTestId('loading-button-2').click();
  await expect(page.getByTestId('content-2').getByRole('paragraph')).toContainText('Content 2 loaded successfully!');
  await page.getByTestId('auto-refresh-toggle').click();
  await page.waitForTimeout(3000); // 3 seconds
  await page.getByTestId('random-element-0').getByText('Random element #').click();
  await page.getByTestId('random-element-1').getByText('Random element #').click();
  await page.getByTestId('random-element-2').getByText('Random element #').click();
  await page.getByTestId('random-element-3').getByText('Random element #').click();
  await page.getByTestId('random-element-4').getByText('Random element #').click();
  await page.getByTestId('add-element').click();
  await page.getByTestId('remove-element').click();
  await page.getByTestId('remove-element').click();
  await page.getByTestId('counter-tab').click();
  await page.getByTestId('increment-button').click();
  await page.getByTestId('increment-button').click();
  await page.getByTestId('log-tab').click();
  await page.getByTestId('log-entry').click();
  await expect(page.getByTestId('log-entry')).toContainText('Counter initialized to 0');
  await page.getByTestId('counter-tab').click();
  await page.getByTestId('reset-button').click();
  await page.waitForTimeout(3000); // 3 seconds
});