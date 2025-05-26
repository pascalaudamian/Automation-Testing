import { test } from '@playwright/test';
import { AjaxPage } from './page-objects/AjaxPage';

test('AJAX Requests - Refactored', async ({ page }) => {
  const ajaxPage = new AjaxPage(page);
  await ajaxPage.goto(); // Navigare către pagina AJAX
  await page.waitForTimeout(3000); // Pauză pentru a permite inițializarea datelor
  await ajaxPage.refreshPosts(); // Reîmprospătare conținut asincron
  await ajaxPage.refreshPosts(); // A doua reîmprospătare pentru testare consistență
  await page.waitForTimeout(3000); // Așteptare pentru încărcare completă
  await ajaxPage.submitPost('testing solution', 'Trying a new ...'); // Trimiterea unui post nou
  await page.waitForTimeout(3000); // Așteptare pentru a permite actualizarea UI
  await ajaxPage.search('damian'); // Căutare în conținut asincron
  await page.waitForTimeout(5000); // Așteptare pentru afișarea rezultatelor
  await ajaxPage.testDelayedLoad(); // Testare încărcare întârziată (simularea unui delay)
});

