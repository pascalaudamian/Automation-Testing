# Test info

- Name: Create Account
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\create.acount.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('UsernameEmailPasswordConfirm')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\create.acount.spec.ts:9:56
```

# Page snapshot

```yaml
- navigation:
  - heading "Damian's Platform" [level=2]
  - paragraph: for Automation Testing Practice
  - link "Home":
    - /url: /
  - button "Core Modules ▼"
  - button "Advanced Modules▼"
- heading "Form Elements" [level=1]
- paragraph: Practice automation with various form inputs, validations, and submissions.
- heading "Test Controls" [level=2]
- switch "Disable Forms"
- text: Disable Forms
- button "Reset All Forms"
- text: Authentication Forms Practice with login and registration forms
- tablist:
  - tab "Login" [selected]
  - tab "Register"
- tabpanel "Login":
  - text: Username or Email
  - textbox "Username or Email"
  - text: Password
  - textbox "Password"
  - checkbox "Remember me"
  - text: Remember me
  - button "Sign In"
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Create Account', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/forms');
   5 |   await page.waitForTimeout(3000); // 3 seconds
   6 |   await page.getByText('Disable Forms').click();
   7 |   await page.getByText('Username or EmailPasswordRemember meSign In').click();
   8 |   await page.getByTestId('register-tab').click();
>  9 |   await page.getByText('UsernameEmailPasswordConfirm').click();
     |                                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  10 |   await page.getByTestId('reset-button').click();
  11 |   await page.getByTestId('disable-forms-switch').click();
  12 |   await page.getByTestId('reg-username-input').click();
  13 |   await page.getByTestId('reg-username-input').fill('test@gmail.com');
  14 |   await page.getByTestId('email-input').click();
  15 |   await page.getByTestId('email-input').fill('test@gmail.com');
  16 |   await page.getByTestId('reg-password-input').click();
  17 |   await page.getByTestId('reg-password-input').fill('admin');
  18 |   await page.getByTestId('confirm-password-input').click();
  19 |   await page.getByTestId('confirm-password-input').fill('admin');
  20 |   await page.getByTestId('plan-enterprise').click();
  21 |   await page.getByRole('combobox', { name: 'Country Code' }).click();
  22 |   await page.getByTestId('country-option-uk').getByText('United Kingdom (+44)').click();
  23 |   await page.getByTestId('notifications-switch').click();
  24 |   await page.getByTestId('register-submit').click();
  25 |   await expect(page.getByTestId('success-message')).toContainText('Form submitted successfully! This message will disappear in 3 seconds.');
  26 |   
  27 | });
```