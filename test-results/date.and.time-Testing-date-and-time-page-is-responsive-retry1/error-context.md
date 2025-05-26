# Test info

- Name: Testing date and time page is responsive
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\date.and.time.spec.ts:11:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div').filter({ hasText: /^Today$/ }).getByRole('button').first()
    - waiting for" http://localhost:3000/date-time-pickers" navigation to finish...
    - navigated to "http://localhost:3000/date-time-pickers"

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\date.and.time.spec.ts:15:88
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
   7 |     await page.waitForSelector('.date-time-pickers-page .title-button');
   8 |     await page.waitForSelector('input[placeholder="Select Date"]');
   9 | });
  10 |
  11 | test('Testing date and time page is responsive', async ({ page }) => {
  12 |   await page.goto('http://localhost:3000/');
  13 |   await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
  14 |   await page.getByTestId('nav-date-&-time-pickers').click();
> 15 |   await page.locator('div').filter({ hasText: /^Today$/ }).getByRole('button').first().click();
     |                                                                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
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