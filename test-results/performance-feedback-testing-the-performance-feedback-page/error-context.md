# Test info

- Name: testing the performance feedback page
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\performance-feedback.spec.ts:3:5

# Error details

```
Error: locator.check: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('checkbox', { name: 'Only show products in stock' })

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\performance-feedback.spec.ts:8:77
```

# Page snapshot

```yaml
- button "Open Next.js Dev Tools":
  - img
- button "Open issues overlay": 1 Issue
- button "Collapse issues badge":
  - img
- navigation:
  - button "previous" [disabled]:
    - img "previous"
  - text: 1/1
  - button "next" [disabled]:
    - img "next"
- img
- link "Next.js 15.3.1 (stale) Webpack":
  - /url: https://nextjs.org/docs/messages/version-staleness
  - img
  - text: Next.js 15.3.1 (stale) Webpack
- img
- dialog "Runtime Error":
  - text: Runtime Error
  - button "Copy Stack Trace":
    - img
  - button "No related documentation found" [disabled]:
    - img
  - link "Learn more about enabling Node.js inspector for server code with Chrome DevTools":
    - /url: https://nextjs.org/docs/app/building-your-application/configuring/debugging#server-side-code
    - img
  - paragraph: "ChunkLoadError: Loading chunk app/performance-feedback/page failed. (error: http://localhost:3000/_next/static/chunks/app/performance-feedback/page.js)"
  - paragraph: Call Stack 13
  - button "Show 8 ignore-listed frame(s)":
    - text: Show 8 ignore-listed frame(s)
    - img
  - text: __webpack_require__.f.j .next\static\chunks\webpack.js (858:29) <unknown> .next\static\chunks\webpack.js (153:40) Array.reduce <anonymous> (0:0) __webpack_require__.e .next\static\chunks\webpack.js (152:67) fn.e .next\static\chunks\webpack.js (389:50)
- contentinfo:
  - region "Error feedback":
    - paragraph:
      - link "Was this helpful?":
        - /url: https://nextjs.org/telemetry#error-feedback
    - button "Mark as helpful"
    - button "Mark as not helpful"
- 'heading "Application error: a client-side exception has occurred while loading localhost (see the browser console for more information)." [level=2]'
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('testing the performance feedback page', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/');
   5 |   await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
   6 |   await page.getByTestId('nav-performance-feedback').click();
   7 |   await page.waitForTimeout(1000);
>  8 |   await page.getByRole('checkbox', { name: 'Only show products in stock' }).check();
     |                                                                             ^ Error: locator.check: Test timeout of 30000ms exceeded.
   9 |   await page.getByTestId('search-input').click();
  10 |   await page.getByTestId('search-input').fill('pear');
  11 |   await page.getByRole('button', { name: 'Add to Cart' }).click();
  12 |   await page.getByTestId('search-input').click();
  13 |   await page.getByTestId('search-input').fill('');
  14 |   await page.getByRole('combobox').click();
  15 |   await page.getByRole('option', { name: 'Beverages' }).click();
  16 |   await page.getByRole('row', { name: 'Tea 80 $4 Add to Cart' }).getByRole('button').click();
  17 |   await page.getByRole('row', { name: 'Water 14 $10 Add to Cart' }).getByRole('button').click();
  18 |   await page.getByRole('row', { name: 'Milkshake 45 $12 Add to Cart' }).getByRole('button').click();
  19 |   await page.getByRole('combobox').click();
  20 |   await page.getByRole('option', { name: 'Meat' }).click();
  21 |   await page.getByRole('row', { name: 'Turkey 64 $16 Add to Cart' }).getByRole('button').click();
  22 |   await page.getByRole('combobox').click();
  23 |   await page.getByRole('option', { name: 'Snacks' }).click();
  24 |   await page.getByRole('row', { name: 'Nuts 43 $11 Add to Cart' }).getByRole('button').click();
  25 |   await page.getByRole('row', { name: 'Popcorn 6 $5 Add to Cart' }).getByRole('button').click();
  26 |   await page.getByRole('row', { name: 'Crackers 78 $6 Add to Cart' }).getByRole('button').click();
  27 |   await page.getByRole('combobox').click();
  28 |   await page.getByRole('option', { name: 'Bakery' }).click();
  29 |   await page.getByRole('row', { name: 'Croissant 46 $5 Add to Cart' }).getByRole('button').click();
  30 |   await page.getByRole('row', { name: 'Croissant 70 $5 Add to Cart' }).getByRole('button').click();
  31 |   await page.getByRole('row', { name: 'Muffin 80 $12 Add to Cart' }).getByRole('button').click();
  32 |   await page.getByRole('combobox').click();
  33 |   await page.getByRole('option', { name: 'Seafood' }).click();
  34 |   await page.getByRole('row', { name: 'Tuna 97 $1 Add to Cart' }).getByRole('button').click();
  35 |   await page.getByRole('row', { name: 'Cod 87 $4 Add to Cart' }).getByRole('button').click();
  36 |   await page.getByRole('combobox').click();
  37 |   await page.getByRole('option', { name: 'All' }).click();
  38 |   await page.getByRole('button', { name: '7' }).click();
  39 |   await page.getByRole('button', { name: 'Previous' }).click();
  40 |   await page.getByRole('button', { name: 'Previous' }).click();
  41 |   await page.getByRole('button', { name: 'Previous' }).click();
  42 |   await page.getByRole('button', { name: 'Previous' }).click();
  43 |   await page.getByRole('row', { name: 'Passionfruit 96 $19 Add to' }).getByRole('button').click();
  44 |   await page.getByRole('row', { name: 'Passionfruit 96 $19 Add to' }).getByRole('button').click();
  45 |   await page.getByRole('row', { name: 'Passionfruit 96 $19 Add to' }).getByRole('button').click();
  46 |   await page.waitForTimeout(1000);
  47 |   await page.locator('div > .lucide').click();
  48 |   await page.getByText('Your Cart14').click();
  49 |   await page.waitForTimeout(1000);
  50 |   await page.getByRole('checkbox', { name: 'Only show products in stock' }).uncheck();
  51 |   await page.getByRole('row', { name: 'Juice 48 $3 Add to Cart' }).getByRole('button').click();
  52 |   await page.getByRole('row', { name: 'Juice 48 $3 Add to Cart' }).getByRole('button').click();
  53 |   await page.getByRole('combobox').click();
  54 |   await page.getByRole('option', { name: 'Dairy' }).click();
  55 |   await page.getByRole('row', { name: 'Yogurt 46 $19 Add to Cart' }).getByRole('button').click();
  56 |   await page.locator('form').click();
  57 |   await page.getByRole('checkbox', { name: 'Only show products in stock' }).check();
  58 |   await page.getByRole('row', { name: 'Milk 10 $6 Add to Cart' }).getByRole('button').click();
  59 |   await page.getByRole('row', { name: 'Cheese 83 $17 Add to Cart' }).getByRole('button').click();
  60 |   await page.getByRole('button', { name: 'Next', exact: true }).click();
  61 |   await page.getByRole('button', { name: 'Add to Cart' }).click();
  62 | });
```