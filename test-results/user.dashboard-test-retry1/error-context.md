# Test info

- Name: test
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\user.dashboard.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('nav-authentication-flows')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\user.dashboard.spec.ts:18:54
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
  - paragraph: "ChunkLoadError: Loading chunk app/locators/page failed. (error: http://localhost:3000/_next/static/chunks/app/locators/page.js)"
  - paragraph: Call Stack 11
  - button "Show 6 ignore-listed frame(s)":
    - text: Show 6 ignore-listed frame(s)
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
   3 | test('test', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/');
   5 |   await page.getByRole('button', { name: 'Core Modules ▼' }).click();
   6 |   await page.waitForTimeout(1000);
   7 |   await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
   8 |   await page.waitForTimeout(1000);
   9 |   await page.getByTestId('nav-form-elements').click();
  10 |   await page.getByTestId('nav-tables').click();
  11 |   await page.getByTestId('nav-dynamic-content').click();
  12 |   await page.getByTestId('nav-dialogs-&-popups').click();
  13 |   await page.getByTestId('nav-ajax-requests').click();
  14 |   await page.getByTestId('nav-drag-&-drop').click();
  15 |   await page.getByTestId('nav-iframes').click();
  16 |   await page.getByTestId('nav-locator-practice').click();
  17 |   await page.waitForTimeout(1000);
> 18 |   await page.getByTestId('nav-authentication-flows').click();
     |                                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  19 |   await page.getByTestId('nav-file-uploads').click();
  20 |   await page.getByTestId('nav-pagination').click();
  21 |   await page.getByTestId('nav-notifications').click();
  22 |   await page.getByTestId('nav-error-handling').click();
  23 |   await page.getByTestId('nav-performance-feedback').click();
  24 |   await page.getByTestId('nav-responsive-layouts').click();
  25 |   await page.getByTestId('nav-date-&-time-pickers').click();
  26 |   await page.getByTestId('nav-canvas-&-svg-elements').click();
  27 |   await page.getByTestId('nav-hover-events').click();
  28 |   await page.waitForTimeout(1000);
  29 |   await page.getByTestId('nav-state-persistence').click();
  30 |   await page.waitForTimeout(1000);
  31 |   await expect(page.locator('h1')).toContainText('🧪 State Persistence Demo');
  32 |   await page.getByTestId('nav-home').click();
  33 |   await expect(page.locator('h1')).toContainText('Damian\'s Practice Platform for Automation Testing');
  34 | });
```