import { Page, Locator } from '@playwright/test';

export class TablesPage {
  constructor(private page: Page) {}

  getUserRow(name: string): Locator {
    return this.page.locator('tr', { has: this.page.locator('td', { hasText: name }) });
  }

  getEditButton(row: Locator): Locator {
    return row.locator('[data-testid^="edit-user-"]');
  }
}