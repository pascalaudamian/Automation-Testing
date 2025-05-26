# Test info

- Name: Locator Practice Page >> Page Elements Interaction
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\locators-practice.spec.ts:8:7

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('test-button-1')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\locators-practice.spec.ts:37:45
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
- heading "Locator Practice" [level=1]
- paragraph: Practice with various element selection strategies and attributes.
- tablist:
  - tab "Basic" [selected]
  - tab "Attributes"
  - tab "Relative"
  - tab "Dynamic"
  - tab "Shadow DOM"
- tabpanel "Basic":
  - text: Basic Locators Practice with basic element selection by ID, class, tag name, and name
  - heading "ID Selectors" [level=3]
  - button "Button with ID"
  - text: Div with ID Span with ID
  - heading "Class Selectors" [level=3]
  - button "Button with Class"
  - button "Primary Button"
  - button "Secondary Button"
  - heading "Tag Name Selectors" [level=3]
  - paragraph: This is a paragraph element
  - img "Placeholder image 1"
  - img "Placeholder image 2"
  - img "Placeholder image 3"
  - list:
    - listitem: List item 1
    - listitem: List item 2
    - listitem: List item 3
  - heading "Name Attribute Selectors" [level=3]
  - textbox "Username": admin
  - textbox "Password": admin
  - radio "Male" [checked]
  - text: Male
  - radio "Female"
  - text: Female
  - radio "Other"
  - text: Other
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Locator Practice Page', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('http://localhost:3000/locators');
   6 |   });
   7 |
   8 |   test('Page Elements Interaction', async ({ page }) => {
   9 |     await page.getByRole('button', { name: 'Button with ID' }).click();
   10 |     await page.getByText('Div with ID').click();
   11 |     await page.getByText('Span with ID').click();
   12 |     await page.getByRole('button', { name: 'Button with Class' }).click();
   13 |     await page.getByRole('button', { name: 'Primary Button' }).click();
   14 |     await page.getByRole('button', { name: 'Secondary Button' }).click();
   15 |
   16 |     await page.getByRole('img', { name: 'Placeholder image 1' }).click();
   17 |     await page.getByRole('img', { name: 'Placeholder image 2' }).click();
   18 |     await page.getByRole('img', { name: 'Placeholder image 3' }).click();
   19 |
   20 |     await page.getByText('List item 1').click();
   21 |     await page.getByText('List item 2').click();
   22 |     await page.getByText('List item 3').click();
   23 |
   24 |     await page.getByRole('textbox', { name: 'Username' }).fill('admin');
   25 |     await page.getByRole('textbox', { name: 'Password' }).fill('admin');
   26 |
   27 |     await page.getByText('MaleFemaleOther').click();
   28 |     await page.getByRole('radio', { name: 'Male', exact: true }).check();
   29 |
   30 |     await page.getByTestId('attributes-tab').click();
   31 |     await page.getByTestId('basic-tab').click();
   32 |     await page.getByTestId('relative-tab').click();
   33 |     await page.getByTestId('dynamic-tab').click();
   34 |     await page.getByTestId('shadow-tab').click();
   35 |     await page.getByTestId('attributes-tab').click();
   36 |
>  37 |     await page.getByTestId('test-button-1').click();
      |                                             ^ Error: locator.click: Test timeout of 30000ms exceeded.
   38 |     await page.locator('[data-test="test-div"]').click();
   39 |     await page.getByText('Span with data-cy').click();
   40 |     await page.getByRole('button', { name: 'Button with data-automation' }).click();
   41 |     await page.getByRole('button', { name: 'Close dialog' }).click();
   42 |     await page.getByText('Hidden from screen readers').click();
   43 |     await page.getByText('Alert element').click();
   44 |     await page.getByRole('button', { name: 'Toggle Button' }).click();
   45 |     await page.getByRole('button', { name: 'Button with custom attribute' }).click();
   46 |     await page.getByText('Active status').click();
   47 |     await page.getByText('Warning message').click();
   48 |     await page.getByText('Element with tooltip').click();
   49 |     await page.getByText('User related element').click();
   50 |     await page.getByText('Modal trigger').click();
   51 |
   52 |     await page.getByTestId('relative-tab').click();
   53 |     await page.getByText('Parent element').click();
   54 |     await page.getByText('Child element 1').click();
   55 |     await page.getByText('Child element 2').click();
   56 |     await page.getByText('First sibling').click();
   57 |     await page.getByText('Second sibling').click();
   58 |     await page.getByText('Third sibling').click();
   59 |     await page.getByText('Row 1, Col 1').click();
   60 |     await page.getByText('Row 1, Col 2').click();
   61 |     await page.getByText('Row 1, Col 3').click();
   62 |     await page.getByText('Row 2, Col 1').click();
   63 |     await page.getByText('Row 2, Col 3').click();
   64 |     await page.getByText('Level 1Level 2Level 3Level').click();
   65 |     await page.getByText('Level 4').click();
   66 |     await page.getByText('Level 3Level').click();
   67 |     await page.getByText('Level 2Level 3Level').click();
   68 |
   69 |     await page.getByTestId('dynamic-tab').click();
   70 |     await page.getByTestId('load-items-button').click();
   71 |     await page.getByTestId('dynamic-item-1').click();
   72 |     await page.getByTestId('dynamic-item-2').click();
   73 |     await page.getByTestId('dynamic-item-3').click();
   74 |     await page.getByTestId('dynamic-item-4').click();
   75 |     await page.getByTestId('dynamic-item-5').click();
   76 |     await page.getByTestId('clear-items-button').click();
   77 |
   78 |     await page.getByTestId('change-text-button').click();
   79 |     await page.getByTestId('change-text-button').click();
   80 |     await page.getByTestId('change-attributes-button').click();
   81 |     await page.getByTestId('change-attributes-button').click();
   82 |     await page.getByTestId('change-class-button').click();
   83 |     await expect(page.getByTestId('changing-class-element').locator('span')).toContainText('bg-blue-100');
   84 |     await page.getByTestId('change-class-button').click();
   85 |     await expect(page.getByTestId('changing-class-element').locator('span')).toContainText('bg-green-100');
   86 |
   87 |     await page.getByTestId('shadow-tab').click();
   88 |     await page.getByRole('button', { name: 'Click me (Shadow DOM)' }).click();
   89 |     await page.getByText('Content inside the Shadow DOM Click me (Shadow DOM)').click();
   90 |     await page.getByTestId('try-access-shadow-button').click();
   91 |     await page.getByText('Expected Outcome: The "Try').click();
   92 |   });
   93 | });
   94 | test.describe('Responsive Design', () => {
   95 |   test.beforeEach(async ({ page }) => {
   96 |     await page.goto('/locators');
   97 |   });
   98 |
   99 |   test('Responsive Design Test', async ({ page }) => {
  100 |     await page.setViewportSize({ width: 375, height: 667 });
  101 |     await page.reload();
  102 |     await page.getByRole('button', { name: 'Button with ID' }).click();
  103 |     await page.getByText('Div with ID').click();
  104 |     await page.getByText('Span with ID').click();
  105 |     await page.getByRole('button', { name: 'Button with Class' }).click();
  106 |     await page.getByRole('button', { name: 'Primary Button' }).click();
  107 |     await page.getByRole('button', { name: 'Secondary Button' }).click();
  108 |
  109 |     await page.getByRole('img', { name: 'Placeholder image 1' }).click();
  110 |     await page.getByRole('img', { name: 'Placeholder image 2' }).click();
  111 |     await page.getByRole('img', { name: 'Placeholder image 3' }).click();
  112 |
  113 |     await page.getByText('List item 1').click();
  114 |     await page.getByText('List item 2').click();
  115 |     await page.getByText('List item 3').click();
  116 |
  117 |     await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  118 |     await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  119 |
  120 |     await page.getByText('MaleFemaleOther').click();
  121 |     await page.getByRole('radio', { name: 'Male', exact: true }).check();
  122 |     await page.getByRole('radio', { name: 'Female', exact: true }).check();
  123 |     await page.getByRole('radio', { name: 'Other', exact: true }).check();
  124 |       });
  125 |     });
```