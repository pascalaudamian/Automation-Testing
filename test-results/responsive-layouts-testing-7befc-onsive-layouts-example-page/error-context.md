# Test info

- Name: testing the responsive layouts example page
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\responsive-layouts.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div').filter({ hasText: /^Item 1This is a grid item with some text and an image\.$/ }).getByRole('img')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\responsive-layouts.spec.ts:7:127
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
  - paragraph: "ChunkLoadError: Loading chunk app/responsive-layouts/page failed. (error: http://localhost:3000/_next/static/chunks/app/responsive-layouts/page.js)"
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
   3 | test('testing the responsive layouts example page', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/');
   5 |   await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
   6 |   await page.getByTestId('nav-responsive-layouts').click();
>  7 |   await page.locator('div').filter({ hasText: /^Item 1This is a grid item with some text and an image\.$/ }).getByRole('img').click();
     |                                                                                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
   8 |   await page.locator('div').filter({ hasText: /^Item 2This is another grid item with an image and text\.$/ }).getByRole('img').click();
   9 |   await page.locator('div').filter({ hasText: /^Item 3More grid items can have content like text and images\.$/ }).getByRole('img').click();
  10 |   await page.locator('div').filter({ hasText: /^Item 4This item also contains text and an image\.$/ }).getByRole('img').click();
  11 |   await page.getByRole('button', { name: 'Two-Column Layout' }).click();
  12 |   await page.locator('div').filter({ hasText: /^Left ColumnThis is the left column with an image and text content\.$/ }).getByRole('img').click();
  13 |   await page.locator('div').filter({ hasText: /^Right ColumnThis is the right column, also with some text and an image\.$/ }).getByRole('img').click();
  14 |   await page.getByText('Left ColumnThis is the left').click();
  15 |   await page.getByText('Right ColumnThis is the right').click();
  16 |   await page.getByRole('button', { name: 'Three-Column Layout' }).click();
  17 |   await page.getByText('Column 1This is the first').click();
  18 |   await page.getByText('Column 2This is the second').click();
  19 |   await page.getByText('Column 3The third column also').click();
  20 |   await page.getByRole('button', { name: 'Flexbox Layout' }).click();
  21 |   await page.getByText('Flex Item 1This is the first').click();
  22 |   await page.locator('div').filter({ hasText: /^Flex Item 2This is the second flex item with content\.$/ }).getByRole('img').click();
  23 |   await page.locator('div').filter({ hasText: /^Flex Item 3The third flex item contains an image and some more text\.$/ }).getByRole('img').click();
  24 | });
```