# Test info

- Name: Dialogs PopUps
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\dialogs-popups.spec.ts:3:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByTestId('open-basic-dialog')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\dialogs-popups.spec.ts:6:47
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Dialogs PopUps', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/dialogs');
   5 |   await page.pause();
>  6 |   await page.getByTestId('open-basic-dialog').click();
     |                                               ^ Error: locator.click: Target page, context or browser has been closed
   7 |   await expect(page.getByTestId('basic-dialog-content')).toContainText('This is the content area of the dialog where you can put any content.');
   8 |   await page.getByTestId('basic-dialog-close').click();
   9 |   await page.getByTestId('open-form-dialog').click();
  10 |   await page.getByTestId('name-input').fill('damian');
  11 |   await page.getByTestId('email-input').click();
  12 |   await page.getByTestId('email-input').fill('damian@gmail.com');
  13 |   await page.getByTestId('form-dialog-submit').click();
  14 |   await expect(page.getByRole('status')).toContainText('Form Submitted');
  15 |   await page.getByTestId('open-confirmation-dialog').click();
  16 |   await expect(page.getByRole('paragraph')).toContainText('Are you sure you want to perform this action?');
  17 |   await page.getByTestId('confirmation-confirm').click();
  18 |   await page.getByTestId('open-nested-dialog').click();
  19 |   await page.getByTestId('open-second-dialog').click();
  20 |   await expect(page.getByRole('paragraph')).toContainText('This is a nested dialog inside the first one.');
  21 |   await page.getByTestId('close-second-dialog').click();
  22 |   await page.getByTestId('close-first-dialog').click();
  23 |   await page.getByTestId('show-toast').click();
  24 |   await page.waitForTimeout(1000); // 1 second
  25 |   await expect(page.getByRole('status')).toContainText('This is a toast notification alert');
  26 |   await page.getByTestId('show-long-toast').click();
  27 |   await page.waitForTimeout(1000); // 1 second
  28 |   await expect(page.getByRole('status')).toContainText('This toast requires a user action to dismiss.');
  29 |   await page.getByTestId('show-success-toast').click();
  30 |   await page.waitForTimeout(1000); // 1 second
  31 |   await expect(page.getByRole('status')).toContainText('Operation completed successfully!');
  32 |   await page.getByTestId('show-error-toast').click();
  33 |   await page.waitForTimeout(1000); // 1 second
  34 |   await expect(page.getByRole('status')).toContainText('Something went wrong. Please try again.');
  35 |   await page.waitForTimeout(1000); // 1 second
  36 | });
```