# Test info

- Name: testing login and registration forms
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\login.spec.ts:5:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: getByTestId('success-message').getByRole('paragraph')
Expected string: "Form submitted successfully! This message will disappear in 3 seconds."
Received: <element(s) not found>
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for getByTestId('success-message').getByRole('paragraph')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\login.spec.ts:14:76
```

# Page snapshot

```yaml
- navigation:
  - heading "Damian's Platform" [level=2]
  - paragraph: for Automation Testing Practice
  - link "Home":
    - /url: /
  - button "Core Modules ▼"
  - button "Advanced Modules ▼"
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
   1 |
   2 | import { test, expect } from '@playwright/test';
   3 | //import { LoginPage } from './page-objects/LoginPage';
   4 |
   5 | test('testing login and registration forms', async ({ page }) => {
   6 |   await page.goto('http://localhost:3000/forms');
   7 |   await page.getByRole('button', { name: 'Core Modules ▼' }).click();
   8 |   await page.getByTestId('username-input').click();
   9 |   await page.getByTestId('username-input').fill('admin@admin.com');
  10 |   await page.getByTestId('password-input').click();
  11 |   await page.getByTestId('password-input').fill('admin');
  12 |   await page.getByText('Remember me').click();
  13 |   await page.getByTestId('login-submit').click();
> 14 |   await expect(page.getByTestId('success-message').getByRole('paragraph')).toContainText('Form submitted successfully! This message will disappear in 3 seconds.');
     |                                                                            ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  15 |   await page.getByTestId('reset-button').click();
  16 |   await page.getByTestId('register-tab').click();
  17 |   await page.getByTestId('reg-username-input').click();
  18 |   await page.getByTestId('reg-username-input').fill('admin');
  19 |   await page.getByTestId('email-input').click();
  20 |   await page.getByTestId('email-input').fill('admin@admin.com');
  21 |   await page.getByTestId('reg-password-input').click();
  22 |   await page.getByTestId('reg-password-input').fill('admin');
  23 |   await page.getByTestId('confirm-password-input').click();
  24 |   await page.getByTestId('confirm-password-input').fill('admin');
  25 |   await page.getByText('Enterprise Plan').click();
  26 |   await page.getByRole('combobox', { name: 'Country Code' }).click();
  27 |   await page.getByTestId('country-option-uk').getByText('United Kingdom (+44)').click();
  28 |   await page.getByTestId('notifications-switch').click();
  29 |   await page.getByTestId('register-submit').click();
  30 | });
  31 |
```