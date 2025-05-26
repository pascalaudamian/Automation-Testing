# Test info

- Name: Date and Time Picker Examples
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\date.and.time.spec.ts:5:5

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.date-time-pickers-page .title-button') to be visible

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\date.and.time.spec.ts:7:16
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
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | // tests/date-time-pickers.spec.ts
   2 |
   3 | import { test, expect } from '@playwright/test';
   4 |
   5 | test('Date and Time Picker Examples', async ({ page }) => {
   6 |     await page.goto('http://localhost:3000/date-time-pickers');
>  7 |     await page.waitForSelector('.date-time-pickers-page .title-button');
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   8 |     await page.waitForSelector('input[placeholder="Select Date"]');
   9 | });
  10 |
  11 | test('Testing date and time page is responsive', async ({ page }) => {
  12 |   await page.goto('http://localhost:3000/');
  13 |   await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
  14 |   await page.getByTestId('nav-date-&-time-pickers').click();
  15 |   await page.locator('div').filter({ hasText: /^Today$/ }).getByRole('button').first().click();
  16 |   await page.locator('div:nth-child(3) > .flex > button').first().click();
  17 |   await page.getByRole('button', { name: 'Today' }).click();
  18 |   await page.getByRole('button', { name: 'Now' }).first().click();
  19 |   await page.getByRole('button', { name: 'Now' }).nth(1).click();
  20 |   await page.locator('div').filter({ hasText: /^Now$/ }).getByRole('button').first().click();
  21 |   await page.getByRole('button', { name: 'Now' }).nth(2).click();
  22 |   await page.locator('label div').click();
  23 |   await page.locator('label div').click();
  24 | });
```