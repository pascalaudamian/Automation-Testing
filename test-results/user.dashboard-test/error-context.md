# Test info

- Name: test
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\user.dashboard.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('h1')
Expected string: "🧪 State Persistence Demo"
Received string: "Damian's Practice Platform for Automation Testing"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('h1')
    9 × locator resolved to <h1 class="text-3xl font-bold mb-2">Damian's Practice Platform for Automation Testing</h1>
      - unexpected value "Damian's Practice Platform for Automation Testing"

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\user.dashboard.spec.ts:31:36
```

# Page snapshot

```yaml
- navigation:
  - heading "Damian's Platform" [level=2]
  - paragraph: for Automation Testing Practice
  - link "Home":
    - /url: /
  - button "Core Modules ▲" [expanded]
  - link "Form Elements":
    - /url: /forms
  - link "Tables":
    - /url: /tables
  - link "Dynamic Content":
    - /url: /dynamic
  - link "Dialogs & Popups":
    - /url: /dialogs
  - link "AJAX Requests":
    - /url: /ajax
  - link "Drag & Drop":
    - /url: /draggable
  - link "iFrames":
    - /url: /iframes
  - link "Locator Practice":
    - /url: /locators
  - button "Advanced Modules ▲" [expanded]
  - link "Authentication Flows":
    - /url: /authentication-flows
  - link "File Uploads":
    - /url: /file-uploads
  - link "Pagination":
    - /url: /pagination
  - link "Notifications":
    - /url: /notifications
  - link "Error Handling":
    - /url: /error-handling
  - link "Performance Feedback":
    - /url: /performance-feedback
  - link "Responsive Layouts":
    - /url: /responsive-layouts
  - link "Date & Time Pickers":
    - /url: /date-time-pickers
  - link "Canvas & SVG Elements":
    - /url: /canvas-svg
  - link "Hover Events":
    - /url: /hover-events
  - link "State Persistence":
    - /url: /state-persistence
- heading "Damian's Practice Platform for Automation Testing" [level=1]
- paragraph: This site has been purpose-built to support testers, QA engineers, and developers in practicing and refining their web automation skills using industry-standard tools such as Playwright and more.
- paragraph: Each section of the platform simulates common UI patterns and interaction models found in real-world web applications. All components are fully accessible and come with consistent test IDs, ARIA attributes, and semantic HTML, ensuring seamless integration with automated testing frameworks.
- heading "Core Modules" [level=2]
- heading "Form Elements" [level=3]
- paragraph: Work with inputs, selects, checkboxes, radios, and text areas.
- heading "Tables" [level=3]
- paragraph: Sortable, filterable, and editable data tables.
- heading "Dynamic Content" [level=3]
- paragraph: Elements that appear/disappear based on interaction.
- heading "Dialogs & Popups" [level=3]
- paragraph: Handle modal windows, alerts, and popups.
- heading "AJAX Requests" [level=3]
- paragraph: Simulate async loading, delayed responses, and data submission.
- heading "Drag & Drop" [level=3]
- paragraph: Draggable components and drop targets.
- heading "iFrames" [level=3]
- paragraph: Automate interaction with embedded content.
- heading "Locator Strategies" [level=3]
- paragraph: Target elements using a variety of locator types for robust testing.
- heading "Advanced Modules" [level=2]
- heading "Authentication Flows" [level=3]
- paragraph: Simulate login, sign-up, password reset, and MFA scenarios.
- heading "File Uploads" [level=3]
- paragraph: Test uploading files and validating types/sizes.
- heading "Pagination" [level=3]
- paragraph: Navigate and test paginated content, infinite scroll, and lazy loading.
- heading "Notifications" [level=3]
- paragraph: Detect toasts, banners, and system messages.
- heading "Error Handling" [level=3]
- paragraph: Validate client/server-side form errors.
- heading "Performance Feedback" [level=3]
- paragraph: Work with loaders, spinners, and progress bars during data processing.
- heading "Responsive Layouts" [level=3]
- paragraph: Test UI behavior on different device sizes and orientations.
- heading "Date & Time Pickers" [level=3]
- paragraph: Select and validate input from calendars and time widgets.
- heading "Canvas & SVG Elements" [level=3]
- paragraph: Interact with graphical charts or custom drawing elements.
- heading "Hover Events" [level=3]
- paragraph: Trigger UI changes using mouse hover.
- heading "State Persistence" [level=3]
- paragraph: Test session and local storage for data retention.
- region "Notifications (F8)":
  - list
- alert
- button "Open Next.js Dev Tools":
  - img
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
  18 |   await page.getByTestId('nav-authentication-flows').click();
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
> 31 |   await expect(page.locator('h1')).toContainText('🧪 State Persistence Demo');
     |                                    ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  32 |   await page.getByTestId('nav-home').click();
  33 |   await expect(page.locator('h1')).toContainText('Damian\'s Practice Platform for Automation Testing');
  34 | });
```