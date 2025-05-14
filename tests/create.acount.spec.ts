import { test, expect } from '@playwright/test';

test('Create Account', async ({ page }) => {
  await page.goto('http://localhost:3000/forms');
  await page.waitForTimeout(3000); // 3 seconds
  await page.getByText('Disable Forms').click();
  await page.getByText('Username or EmailPasswordRemember meSign In').click();
  await page.getByTestId('register-tab').click();
  await page.getByText('UsernameEmailPasswordConfirm').click();
  await page.getByTestId('reset-button').click();
  await page.getByTestId('disable-forms-switch').click();
  await page.getByTestId('reg-username-input').click();
  await page.getByTestId('reg-username-input').fill('test@gmail.com');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('test@gmail.com');
  await page.getByTestId('reg-password-input').click();
  await page.getByTestId('reg-password-input').fill('admin');
  await page.getByTestId('confirm-password-input').click();
  await page.getByTestId('confirm-password-input').fill('admin');
  await page.getByTestId('plan-enterprise').click();
  await page.getByRole('combobox', { name: 'Country Code' }).click();
  await page.getByTestId('country-option-uk').getByText('United Kingdom (+44)').click();
  await page.getByTestId('notifications-switch').click();
  await page.getByTestId('register-submit').click();
  await expect(page.getByTestId('success-message')).toContainText('Form submitted successfully! This message will disappear in 3 seconds.');
  
});