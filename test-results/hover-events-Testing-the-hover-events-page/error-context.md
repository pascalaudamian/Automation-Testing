# Test info

- Name: Testing the hover events page
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\hover-events.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('Item 1')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\hover-events.spec.ts:11:34
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
- heading "Color Change" [level=2]
- paragraph: Hover to change background color.
- img "Hover scale"
- paragraph: Image scales on hover.
- heading "Box Shadow" [level=2]
- paragraph: Hover to see a subtle shadow.
- button "Animated Button"
- button "Hover Dropdown":
  - text: Hover Dropdown
  - img
- paragraph: Animated Text
- paragraph: Slight scale and lift on hover.
- link "Hover to see underline and color change":
  - /url: "#"
- img
- paragraph: Hover the icon to rotate and change color.
- paragraph: Appears after a short delay
- paragraph: Delayed Appearance
- heading "Multiple Effects" [level=2]
- paragraph: Background, shadow, and scale change.
- img
- img
- img
- paragraph: Icon grid with individual hover animations.
- heading "Border Highlight" [level=2]
- paragraph: A border appears on hover.
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Testing the hover events page', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/hover-events');
   5 |   await page.locator('div').filter({ hasText: /^Color ChangeHover to change background color\.$/ }).first().click();
   6 |   await page.getByRole('img', { name: 'Hover scale' }).click();
   7 |   await page.waitForTimeout(3000);
   8 |   await page.locator('div').filter({ hasText: /^Box ShadowHover to see a subtle shadow\.$/ }).first().click();
   9 |   await page.getByRole('button', { name: 'Animated Button' }).click();
  10 |   await page.getByRole('button', { name: 'Hover Dropdown' }).click();
> 11 |   await page.getByText('Item 1').click();
     |                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
  12 |   await page.getByText('Item 2').click();
  13 |   await page.getByText('Item 3').click();
  14 |   await page.getByText('Animated Text').click();
  15 |   await page.getByText('Slight scale and lift on').click();
  16 |   await page.getByRole('link', { name: 'Hover to see underline and' }).click();
  17 |   await page.locator('div').filter({ hasText: /^Hover the icon to rotate and change color\.$/ }).getByRole('img').click();
  18 |   await page.getByText('Delayed Appearance').click();
  19 |   await page.getByText('Appears after a short delay').click();
  20 |   await page.getByRole('heading', { name: 'Multiple Effects' }).click();
  21 |   await page.getByText('Background, shadow, and scale').click();
  22 |   await page.getByText('Multiple EffectsBackground,').click();
  23 |   await page.locator('.text-red-500 > .lucide').click();
  24 |   await page.locator('.text-yellow-500 > .lucide').click();
  25 |   await page.getByRole('heading', { name: 'Border Highlight' }).click();
  26 |   await page.getByText('A border appears on hover.').click();
  27 | });
```