import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { MfaPage } from './page-objects/MfaPage';
import { DashboardPage } from './page-objects/DashboardPage';
import { ADMIN_EMAIL } from './utils/constants';

test.describe('Login and MFA Flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login, input MFA code, and redirect to dashboard', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const mfaPage = new MfaPage(page);
    const dashboardPage = new DashboardPage(page);
    // Login
    console.log(ADMIN_EMAIL);
    await loginPage.login('admin@admin.com', 'admin1');
    // Mock API response for login (MFA code)
    await page.route('/api/auth/login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ mfaCode: '684591' }),
      });
    });

    // Handle MFA dialog
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('MFA Code is: 684591');
      await dialog.dismiss();
    });
    await page.waitForTimeout(1000);
    await page.waitForURL('/authentication-flows/mfa');
    // Set session storage for email
    await page.evaluate(() => sessionStorage.setItem('email', 'admin@admin.com'));
    // Mock API response for MFA verification
    await page.route('/api/auth/mfa', async route => {
      const request = await route.request().postDataJSON();
      expect(request.email).toBe('admin@admin.com');
      expect(request.code).toBe('684591');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // MFA verification
    await mfaPage.verify('684591');
    await page.waitForTimeout(1000);
    await page.waitForURL('/authentication-flows/dashboard?email=admin@admin.com');
    // Dashboard checks
    await dashboardPage.assertDashboardLoaded('admin@admin.com');
    await expect(page.getByText('Italy')).toBeVisible();
    // Edit profile and save
    await dashboardPage.editProfileAndSave('Cooking');
    // Logout
    await dashboardPage.logout();
  });
});
