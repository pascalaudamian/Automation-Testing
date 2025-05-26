import { test, expect } from '@playwright/test';
import { TablesPage } from './page-objects/TablesPage';

test('update user status from inactive to pending', async ({ page }) => {

  await page.goto('/tables');
  const tablesPage = new TablesPage(page);
  const michaelBrownRow = tablesPage.getUserRow('Michael Brown');
  await expect(michaelBrownRow).toBeVisible();
  const editButton = tablesPage.getEditButton(michaelBrownRow);
  await expect(editButton).toBeVisible();
  await editButton.click();
  const editDialogTitle = page.locator('div[role="dialog"]').filter({ hasText: 'Edit User' });
  await expect(editDialogTitle).toBeVisible();
  const statusSelectTrigger = page.locator('[data-testid="edit-user-status-trigger"]');
  await expect(statusSelectTrigger).toBeVisible();
  await statusSelectTrigger.click();
  const pendingOption = page.locator('div[role="option"]').filter({ hasText: 'Pending' });
  await expect(pendingOption).toBeVisible();
  await pendingOption.click();
  const saveChangesButton = page.locator('[data-testid="edit-user-save"]');
  await expect(saveChangesButton).toBeVisible();
  await saveChangesButton.click();
  await expect(editDialogTitle).not.toBeVisible();
  const updatedMichaelBrownRow = page.locator('tr', { has: page.locator('td', { hasText: 'Michael Brown' }) });
  await expect(updatedMichaelBrownRow).toBeVisible();
  const updatedStatusElement = updatedMichaelBrownRow.locator('[data-testid^="user-status-"]');
  await expect(updatedStatusElement).toHaveText('pending');
});

