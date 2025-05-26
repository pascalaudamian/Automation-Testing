import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertDashboardLoaded(email: string) {
    await expect(this.page.getByRole('heading', { name: 'User Dashboard' })).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async editProfileAndSave(hobby: string) {
    await this.page.getByRole('button', { name: 'Edit Profile' }).click();
    await this.page.getByRole('listbox').selectOption(hobby);
    await this.page.getByRole('button', { name: 'Save All' }).click();
    await expect(this.page.getByRole('main')).toContainText('Update successful!');
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }
}