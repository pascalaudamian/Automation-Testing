import { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page, timeout = 1000) {
  await page.waitForLoadState('networkidle', { timeout });
}