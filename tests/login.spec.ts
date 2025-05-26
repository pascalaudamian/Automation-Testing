
import { test, expect } from '@playwright/test';
//import { LoginPage } from './page-objects/LoginPage';

test('testing login and registration forms', async ({ page }) => {
  await page.goto('http://localhost:3000/forms');
  await page.getByRole('button', { name: 'Core Modules ▼' }).click();
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('admin@admin.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('admin');
  await page.getByText('Remember me').click();
  await page.getByTestId('login-submit').click();
  await expect(page.getByTestId('success-message').getByRole('paragraph')).toContainText('Form submitted successfully! This message will disappear in 3 seconds.');
  await page.getByTestId('reset-button').click();
  await page.getByTestId('register-tab').click();
  await page.getByTestId('reg-username-input').click();
  await page.getByTestId('reg-username-input').fill('admin');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admin@admin.com');
  await page.getByTestId('reg-password-input').click();
  await page.getByTestId('reg-password-input').fill('admin');
  await page.getByTestId('confirm-password-input').click();
  await page.getByTestId('confirm-password-input').fill('admin');
  await page.getByText('Enterprise Plan').click();
  await page.getByRole('combobox', { name: 'Country Code' }).click();
  await page.getByTestId('country-option-uk').getByText('United Kingdom (+44)').click();
  await page.getByTestId('notifications-switch').click();
  await page.getByTestId('register-submit').click();
});
