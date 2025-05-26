import { test, expect } from '@playwright/test';

test('Home page test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('heading', { name: 'Damian\'s Practice Platform' }).click();
  await page.getByRole('heading', { name: 'Core Modules' }).click();
  await page.getByRole('heading', { name: 'Advanced Modules' }).click();
});

test('exemplu de test simplu', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await expect(page).toHaveTitle('Practice Platform for Automation Testing');
});