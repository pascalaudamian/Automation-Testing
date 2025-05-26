# Test info

- Name: Dynamic Content
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\dynamic-content.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: getByTestId('content-1').getByRole('paragraph')
Expected string: "Content 1 loaded successfully!"
Received: <element(s) not found>
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for getByTestId('content-1').getByRole('paragraph')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\dynamic-content.spec.ts:16:70
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
- heading "Dynamic Content" [level=1]
- paragraph: Practice with elements that appear and disappear, loading states, and auto-refreshing content.
- text: Toggle Visibility Test your ability to handle elements that appear and disappear
- button "Show Element 1"
- button "Show Element 2"
- button "Show Element 3"
- button "Show Element 4"
- heading "Visible Elements:" [level=3]
- paragraph: No elements are currently visible. Click the buttons above to show elements.
- text: Loading States Test handling loading indicators and state transitions
- button "Load Content 1"
- button "Load Content 2"
- text: Auto-Refreshing Content Elements that automatically change or refresh over time
- button "Start Auto Refresh"
- button "Add Element"
- button "Remove Element"
- heading "Dynamic Elements:" [level=3]
- paragraph: 0 elements
- paragraph: No elements yet. Click "Add Element" or start auto-refresh.
- text: Stateful Counter Test interactions with stateful components
- tablist:
  - tab "Counter" [selected]
  - tab "Event Log"
- tabpanel "Counter":
  - text: "0"
  - button "Increment"
  - button "Reset"
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Dynamic Content', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/dynamic');
   5 |   await page.waitForTimeout(3000); // 3 seconds
   6 |   await page.getByText('Toggle Visibility').click();
   7 |   await page.getByText('Loading States', { exact: true }).click();
   8 |   await page.getByText('Auto-Refreshing Content', { exact: true }).click();
   9 |   await page.getByText('Stateful Counter').click();
  10 |   await page.getByTestId('toggle-button-1').click();
  11 |   await page.getByTestId('toggle-button-2').click();
  12 |   await page.getByTestId('toggle-button-3').click();
  13 |   await page.getByTestId('toggle-button-4').click();
  14 |   await page.getByTestId('loading-button-1').click();
  15 |   await page.waitForTimeout(3000); // 3 seconds
> 16 |   await expect(page.getByTestId('content-1').getByRole('paragraph')).toContainText('Content 1 loaded successfully!');
     |                                                                      ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  17 |   await page.getByTestId('loading-button-2').click();
  18 |   await expect(page.getByTestId('content-2').getByRole('paragraph')).toContainText('Content 2 loaded successfully!');
  19 |   await page.getByTestId('auto-refresh-toggle').click();
  20 |   await page.waitForTimeout(3000); // 3 seconds
  21 |   await page.getByTestId('random-element-0').getByText('Random element #').click();
  22 |   await page.getByTestId('random-element-1').getByText('Random element #').click();
  23 |   await page.getByTestId('random-element-2').getByText('Random element #').click();
  24 |   await page.getByTestId('random-element-3').getByText('Random element #').click();
  25 |   await page.getByTestId('random-element-4').getByText('Random element #').click();
  26 |   await page.getByTestId('add-element').click();
  27 |   await page.getByTestId('remove-element').click();
  28 |   await page.getByTestId('remove-element').click();
  29 |   await page.getByTestId('counter-tab').click();
  30 |   await page.getByTestId('increment-button').click();
  31 |   await page.getByTestId('increment-button').click();
  32 |   await page.getByTestId('log-tab').click();
  33 |   await page.getByTestId('log-entry').click();
  34 |   await expect(page.getByTestId('log-entry')).toContainText('Counter initialized to 0');
  35 |   await page.getByTestId('counter-tab').click();
  36 |   await page.getByTestId('reset-button').click();
  37 |   await page.waitForTimeout(3000); // 3 seconds
  38 | });
```