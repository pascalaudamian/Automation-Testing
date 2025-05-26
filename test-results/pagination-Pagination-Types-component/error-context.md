# Test info

- Name: Pagination Types component
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\pagination.spec.ts:4:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '7' })

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\pagination.spec.ts:10:49
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
- heading "Multiple Pagination Types" [level=1]
- button "Classic Pagination"
- button "Load More Button"
- button "Infinite Scroll"
- heading "1. Basic Pagination" [level=2]
- list:
  - listitem: Item 1
  - listitem: Item 2
  - listitem: Item 3
  - listitem: Item 4
  - listitem: Item 5
  - listitem: Item 6
  - listitem: Item 7
  - listitem: Item 8
  - listitem: Item 9
  - listitem: Item 10
- button "Prev" [disabled]
- button "1"
- button "2"
- button "3"
- button "4"
- button "5"
- text: ...
- button "Next"
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 |
   2 | import { test, expect } from '@playwright/test';
   3 |
   4 | test('Pagination Types component', async ({ page }) => {
   5 |   await page.goto('http://localhost:3000/pagination');
   6 |   await page.getByText('Item 1', { exact: true }).click();
   7 |   await page.getByText('Item 10').click();
   8 |   await page.getByRole('button', { name: 'Next', exact: true }).click();
   9 |   await page.getByRole('button', { name: '5' }).click();
> 10 |   await page.getByRole('button', { name: '7' }).click();
     |                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  11 |   await page.getByRole('button', { name: '10' }).click();
  12 |   await page.getByText('Item 100').click();
  13 |   await page.getByRole('button', { name: 'Load More Button' }).click();
  14 |   await page.getByText('Item 4').click();
  15 |   await page.getByText('Item 9').click();
  16 |   await page.getByRole('button', { name: 'Load More (10/100)' }).click();
  17 |   await page.getByText('Item 20').click();
  18 |   await page.getByRole('button', { name: 'Load More (20/100)' }).click();
  19 |   await page.getByText('Item 30').click();
  20 |   await page.getByRole('button', { name: 'Load More (30/100)' }).click();
  21 |   await page.getByText('Item 40').click();
  22 |   await page.getByRole('button', { name: 'Load More (40/100)' }).click();
  23 |   await page.getByText('Item 50').click();
  24 |   await page.getByRole('button', { name: 'Infinite Scroll' }).click();
  25 |   await page.getByText('Item 10').click();
  26 |   await page.getByText('Item 20').click();
  27 |   await page.getByText('Item 30').click();
  28 | });
```