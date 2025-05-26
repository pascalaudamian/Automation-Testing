# Test info

- Name: test
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\error-handling.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('body')
Expected string: "File simulation failed: File not found: data.json"
Received string: "    Damian's Platformfor Automation Testing Practice  HomeCore Modules ▼ Advanced Modules▼ Error Handling ExamplesExamples below demonstrate catching and displaying errors locally within components. An Error Boundary above this content will catch unhandled errors during rendering or lifecycle methods.File Load Error (Simulated)Simulate File Load ErrorInvalid Input Error (Simulated)Logical Error (Simulated Assertion)Simulate Logical ErrorNetwork Error (Simulated 404/Fetch Fail)Simulate Network ErrorTimeout Error (Simulated Fetch Timeout)Simulate Timeout Error"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('body')
    9 × locator resolved to <body class="antialiased">…</body>
      - unexpected value "    Damian's Platformfor Automation Testing Practice  HomeCore Modules ▼ Advanced Modules▼ Error Handling ExamplesExamples below demonstrate catching and displaying errors locally within components. An Error Boundary above this content will catch unhandled errors during rendering or lifecycle methods.File Load Error (Simulated)Simulate File Load ErrorInvalid Input Error (Simulated)Logical Error (Simulated Assertion)Simulate Logical ErrorNetwork Error (Simulated 404/Fetch Fail)Simulate Network ErrorTimeout Error (Simulated Fetch Timeout)Simulate Timeout Error"

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\error-handling.spec.ts:6:38
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
- heading "Error Handling Examples" [level=1]
- paragraph: Examples below demonstrate catching and displaying errors locally within components. An Error Boundary above this content will catch unhandled errors during rendering or lifecycle methods.
- heading "File Load Error (Simulated)" [level=2]
- button "Simulate File Load Error"
- heading "Invalid Input Error (Simulated)" [level=2]
- textbox "Enter number 1-10"
- heading "Logical Error (Simulated Assertion)" [level=2]
- button "Simulate Logical Error"
- heading "Network Error (Simulated 404/Fetch Fail)" [level=2]
- button "Simulate Network Error"
- heading "Timeout Error (Simulated Fetch Timeout)" [level=2]
- button "Simulate Timeout Error"
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/error-handling');
   5 |   await page.getByRole('button', { name: 'Simulate File Load Error' }).click();
>  6 |   await expect(page.locator('body')).toContainText('File simulation failed: File not found: data.json');
     |                                      ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
   7 |   await page.getByRole('textbox', { name: 'Enter number 1-' }).click();
   8 |   await page.getByRole('textbox', { name: 'Enter number 1-' }).fill('12');
   9 |   await expect(page.locator('body')).toContainText('Invalid input: enter a number between 1 and 10.');
  10 |   await page.getByRole('button', { name: 'Simulate Logical Error' }).click();
  11 |   await expect(page.locator('body')).toContainText('Logical assertion failed: condition must be true');
  12 |   await page.getByRole('button', { name: 'Simulate Network Error' }).click();
  13 |   await page.waitForTimeout(1000);
  14 |   await expect(page.locator('body')).toContainText('Network request failed: HTTP error! status: 404 Not Found - <!DOCTYPE html><html lang="en" class="__variable_5cfdac __variable_9a8899"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-wi...');
  15 |   await page.getByRole('button', { name: 'Simulate Timeout Error' }).click();
  16 |   await expect(page.locator('body')).toContainText('Workspace error during timeout simulation: Request timed out after 100ms');
  17 | });
```