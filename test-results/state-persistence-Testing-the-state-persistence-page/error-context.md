# Test info

- Name: Testing the state persistence page
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\state-persistence.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Toggle Theme (Light)' })

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\state-persistence.spec.ts:8:68
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
  - paragraph: "ChunkLoadError: Loading chunk app/state-persistence/page failed. (error: http://localhost:3000/_next/static/chunks/app/state-persistence/page.js)"
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
   3 | test('Testing the state persistence page', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/');
   5 |   await page.getByRole('button', { name: 'Advanced Modules ▼' }).click();
   6 |   await page.getByTestId('nav-state-persistence').click();
   7 |    await page.waitForTimeout(1000);
>  8 |   await page.getByRole('button', { name: 'Toggle Theme (Light)' }).click();
     |                                                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
   9 |   await page.getByRole('button', { name: 'Toggle Theme (Dark)' }).click();
  10 |   await page.getByRole('button', { name: 'Login' }).click();
  11 |   await expect(page.locator('body')).toContainText('✅ Logged In (via Cookie)');
  12 |   await page.getByRole('button', { name: 'Logout' }).click();
  13 |   await page.getByRole('textbox', { name: 'Enter a note that lasts for' }).click();
  14 |   await page.getByRole('textbox', { name: 'Enter a note that lasts for' }).fill('testing with playwright');
  15 |   await page.getByRole('button', { name: 'Save to Session' }).click();
  16 |   await page.getByRole('textbox', { name: 'Enter a new note for IndexedDB' }).click();
  17 |   await page.getByRole('textbox', { name: 'Enter a new note for IndexedDB' }).fill('testing note');
  18 |   await page.getByRole('button', { name: 'Add' }).click();
  19 |   await expect(page.getByRole('listitem')).toContainText('testing note');
  20 |   await page.getByRole('button', { name: 'Delete note: "testing note"' }).click();
  21 |   await page.getByRole('button', { name: 'Clear Note' }).click();
  22 | });
```