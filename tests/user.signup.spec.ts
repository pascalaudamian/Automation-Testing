import { test, expect } from '@playwright/test';
import { SignupPage } from './page-objects/SignupPage';

test.describe('User Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
  });

  test('should allow a user to sign up and redirect to login page', async ({ page }) => {
    const signupPage = new SignupPage(page);

    //signup API
    await page.route('/api/auth/signup', async route => {
      const request = await route.request().postDataJSON();
      expect(request.email).toBe('testuser@example.com');
      expect(request.name).toBe('Test User');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Folosește Page Object pentru a completa și trimite formularul
    await signupPage.fillForm({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpass123',
      confirmPassword: 'testpass123',
      country: 'Italy',
      hobby: 'Photography',
    });
    await signupPage.submit();

    await expect(signupPage.successMessage).toBeVisible();
    await page.waitForURL('/authentication-flows/login');
  });
});

