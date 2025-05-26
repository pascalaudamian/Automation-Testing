import { test, expect } from '@playwright/test';

test.describe('Locator Practice Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/locators');
  });

  test('Page Elements Interaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Button with ID' }).click();
    await page.getByText('Div with ID').click();
    await page.getByText('Span with ID').click();
    await page.getByRole('button', { name: 'Button with Class' }).click();
    await page.getByRole('button', { name: 'Primary Button' }).click();
    await page.getByRole('button', { name: 'Secondary Button' }).click();

    await page.getByRole('img', { name: 'Placeholder image 1' }).click();
    await page.getByRole('img', { name: 'Placeholder image 2' }).click();
    await page.getByRole('img', { name: 'Placeholder image 3' }).click();

    await page.getByText('List item 1').click();
    await page.getByText('List item 2').click();
    await page.getByText('List item 3').click();

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');

    await page.getByText('MaleFemaleOther').click();
    await page.getByRole('radio', { name: 'Male', exact: true }).check();

    await page.getByTestId('attributes-tab').click();
    await page.getByTestId('basic-tab').click();
    await page.getByTestId('relative-tab').click();
    await page.getByTestId('dynamic-tab').click();
    await page.getByTestId('shadow-tab').click();
    await page.getByTestId('attributes-tab').click();

    await page.getByTestId('test-button-1').click();
    await page.locator('[data-test="test-div"]').click();
    await page.getByText('Span with data-cy').click();
    await page.getByRole('button', { name: 'Button with data-automation' }).click();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await page.getByText('Hidden from screen readers').click();
    await page.getByText('Alert element').click();
    await page.getByRole('button', { name: 'Toggle Button' }).click();
    await page.getByRole('button', { name: 'Button with custom attribute' }).click();
    await page.getByText('Active status').click();
    await page.getByText('Warning message').click();
    await page.getByText('Element with tooltip').click();
    await page.getByText('User related element').click();
    await page.getByText('Modal trigger').click();

    await page.getByTestId('relative-tab').click();
    await page.getByText('Parent element').click();
    await page.getByText('Child element 1').click();
    await page.getByText('Child element 2').click();
    await page.getByText('First sibling').click();
    await page.getByText('Second sibling').click();
    await page.getByText('Third sibling').click();
    await page.getByText('Row 1, Col 1').click();
    await page.getByText('Row 1, Col 2').click();
    await page.getByText('Row 1, Col 3').click();
    await page.getByText('Row 2, Col 1').click();
    await page.getByText('Row 2, Col 3').click();
    await page.getByText('Level 1Level 2Level 3Level').click();
    await page.getByText('Level 4').click();
    await page.getByText('Level 3Level').click();
    await page.getByText('Level 2Level 3Level').click();

    await page.getByTestId('dynamic-tab').click();
    await page.getByTestId('load-items-button').click();
    await page.getByTestId('dynamic-item-1').click();
    await page.getByTestId('dynamic-item-2').click();
    await page.getByTestId('dynamic-item-3').click();
    await page.getByTestId('dynamic-item-4').click();
    await page.getByTestId('dynamic-item-5').click();
    await page.getByTestId('clear-items-button').click();

    await page.getByTestId('change-text-button').click();
    await page.getByTestId('change-text-button').click();
    await page.getByTestId('change-attributes-button').click();
    await page.getByTestId('change-attributes-button').click();
    await page.getByTestId('change-class-button').click();
    await expect(page.getByTestId('changing-class-element').locator('span')).toContainText('bg-blue-100');
    await page.getByTestId('change-class-button').click();
    await expect(page.getByTestId('changing-class-element').locator('span')).toContainText('bg-green-100');

    await page.getByTestId('shadow-tab').click();
    await page.getByRole('button', { name: 'Click me (Shadow DOM)' }).click();
    await page.getByText('Content inside the Shadow DOM Click me (Shadow DOM)').click();
    await page.getByTestId('try-access-shadow-button').click();
    await page.getByText('Expected Outcome: The "Try').click();
  });
});
test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locators');
  });

  test('Responsive Design Test', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.getByRole('button', { name: 'Button with ID' }).click();
    await page.getByText('Div with ID').click();
    await page.getByText('Span with ID').click();
    await page.getByRole('button', { name: 'Button with Class' }).click();
    await page.getByRole('button', { name: 'Primary Button' }).click();
    await page.getByRole('button', { name: 'Secondary Button' }).click();

    await page.getByRole('img', { name: 'Placeholder image 1' }).click();
    await page.getByRole('img', { name: 'Placeholder image 2' }).click();
    await page.getByRole('img', { name: 'Placeholder image 3' }).click();

    await page.getByText('List item 1').click();
    await page.getByText('List item 2').click();
    await page.getByText('List item 3').click();

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');

    await page.getByText('MaleFemaleOther').click();
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByRole('radio', { name: 'Female', exact: true }).check();
    await page.getByRole('radio', { name: 'Other', exact: true }).check();
      });
    });