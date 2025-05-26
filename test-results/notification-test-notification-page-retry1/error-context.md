# Test info

- Name: test notification page
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\notification.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('body')
Expected string: "Error message!"
Received string: "    Damian's Platformfor Automation Testing Practice  HomeCore Modules ▼ Advanced Modules▼ React Notification TestIn-App SuccessIn-App ErrorIn-App InfoRequest Browser PermissionShow Browser Notification"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('body')
    9 × locator resolved to <body class="antialiased">…</body>
      - unexpected value "    Damian's Platformfor Automation Testing Practice  HomeCore Modules ▼ Advanced Modules▼ React Notification TestIn-App SuccessIn-App ErrorIn-App InfoRequest Browser PermissionShow Browser Notification"

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\notification.spec.ts:8:38
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
- heading "React Notification Test" [level=1]
- button "In-App Success"
- button "In-App Error"
- button "In-App Info"
- button "Request Browser Permission"
- button "Show Browser Notification"
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test notification page', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/notifications');
   5 |   await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
   6 |   await page.getByRole('button', { name: 'In-App Success' }).click();
   7 |   await page.getByRole('button', { name: 'In-App Error' }).click();
>  8 |   await expect(page.locator('body')).toContainText('Error message!');
     |                                      ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
   9 |   await page.getByRole('button', { name: 'In-App Info' }).click();
  10 |   await expect(page.locator('body')).toContainText('Info message!');
  11 |   await page.getByRole('button', { name: 'Request Browser Permission' }).click();
  12 |   await page.getByRole('button', { name: 'Show Browser Notification' }).click();
  13 |   await expect(page.locator('body')).toContainText('Please allow browser notifications first.');
  14 | });
```