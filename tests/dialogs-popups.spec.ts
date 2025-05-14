import { test, expect } from '@playwright/test';

test('Dialogs PopUps', async ({ page }) => {
  await page.goto('http://localhost:3000/dialogs');
  await page.pause();
  await page.getByTestId('open-basic-dialog').click();
  await expect(page.getByTestId('basic-dialog-content')).toContainText('This is the content area of the dialog where you can put any content.');
  await page.getByTestId('basic-dialog-close').click();
  await page.getByTestId('open-form-dialog').click();
  await page.getByTestId('name-input').fill('damian');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('damian@gmail.com');
  await page.getByTestId('form-dialog-submit').click();
  await expect(page.getByRole('status')).toContainText('Form Submitted');
  await page.getByTestId('open-confirmation-dialog').click();
  await expect(page.getByRole('paragraph')).toContainText('Are you sure you want to perform this action?');
  await page.getByTestId('confirmation-confirm').click();
  await page.getByTestId('open-nested-dialog').click();
  await page.getByTestId('open-second-dialog').click();
  await expect(page.getByRole('paragraph')).toContainText('This is a nested dialog inside the first one.');
  await page.getByTestId('close-second-dialog').click();
  await page.getByTestId('close-first-dialog').click();
  await page.getByTestId('show-toast').click();
  await page.waitForTimeout(1000); // 1 second
  await expect(page.getByRole('status')).toContainText('This is a toast notification alert');
  await page.getByTestId('show-long-toast').click();
  await page.waitForTimeout(1000); // 1 second
  await expect(page.getByRole('status')).toContainText('This toast requires a user action to dismiss.');
  await page.getByTestId('show-success-toast').click();
  await page.waitForTimeout(1000); // 1 second
  await expect(page.getByRole('status')).toContainText('Operation completed successfully!');
  await page.getByTestId('show-error-toast').click();
  await page.waitForTimeout(1000); // 1 second
  await expect(page.getByRole('status')).toContainText('Something went wrong. Please try again.');
  await page.waitForTimeout(1000); // 1 second
});