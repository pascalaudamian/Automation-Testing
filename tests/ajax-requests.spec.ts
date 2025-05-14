import { test, expect, Page } from '@playwright/test';

// --- Helper Functions ---

async function goToAjaxPage(page: Page) {
  await page.goto('http://localhost:3000/ajax');
}

async function refreshPosts(page: Page) {
  await page.getByTestId('refresh-posts').click();
  await expect(page.getByTestId('posts-list')).toBeVisible(); // Asumă un testId pentru listă
}

async function submitPost(page: Page, title: string, body: string) {
  await page.getByTestId('title-input').fill(title);
  await page.getByTestId('body-input').fill(body);
  await page.getByTestId('submit-button').click();
  await expect(page.getByTestId('submitted-data')).toContainText('Successfully Submitted:');
}

async function search(page: Page, query: string) {
  await page.getByTestId('search-input').fill(query);
  await page.getByTestId('search-button').click();
  await expect(page.getByTestId('no-results')).toContainText(/no results found/i);
}

async function testDelayedLoad(page: Page) {
  await page.getByTestId('delayed-button').click();
  await expect(page.getByTestId('delayed-data')).toContainText('Loaded Data:');
}

// --- Main Test ---

test('AJAX Requests - Refactored', async ({ page }) => {
  await goToAjaxPage(page);
  await page.waitForTimeout(3000); // 3 seconds
  await refreshPosts(page);
  await refreshPosts(page); // A doua încărcare – opțională
  await page.waitForTimeout(3000); // 3 seconds
  await submitPost(page, 'testing solution', 'Trying a new ...');
  await page.waitForTimeout(3000); // 3 seconds
  await search(page, 'damian');
  await page.waitForTimeout(5000); // 5 seconds
  await testDelayedLoad(page);
});
