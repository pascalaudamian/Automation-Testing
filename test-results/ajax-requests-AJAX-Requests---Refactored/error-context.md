# Test info

- Name: AJAX Requests - Refactored
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\ajax-requests.spec.ts:4:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('refresh-posts')

    at AjaxPage.refreshPosts (C:\Users\damian.pascalau\Projects\automation-test-site\tests\page-objects\AjaxPage.ts:37:35)
    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\ajax-requests.spec.ts:8:18
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
- heading "404" [level=1]
- heading "This page could not be found." [level=2]
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { Page, Locator, expect } from '@playwright/test';
   2 |
   3 | export class AjaxPage {
   4 |   readonly page: Page;
   5 |   readonly refreshPostsButton: Locator;
   6 |   readonly postsList: Locator;
   7 |   readonly titleInput: Locator;
   8 |   readonly bodyInput: Locator;
   9 |   readonly submitButton: Locator;
  10 |   readonly submittedData: Locator;
  11 |   readonly searchInput: Locator;
  12 |   readonly searchButton: Locator;
  13 |   readonly noResults: Locator;
  14 |   readonly delayedButton: Locator;
  15 |   readonly delayedData: Locator;
  16 |
  17 |   constructor(page: Page) {
  18 |     this.page = page;
  19 |     this.refreshPostsButton = page.getByTestId('refresh-posts');
  20 |     this.postsList = page.getByTestId('posts-list');
  21 |     this.titleInput = page.getByTestId('title-input');
  22 |     this.bodyInput = page.getByTestId('body-input');
  23 |     this.submitButton = page.getByTestId('submit-button');
  24 |     this.submittedData = page.getByTestId('submitted-data');
  25 |     this.searchInput = page.getByTestId('search-input');
  26 |     this.searchButton = page.getByTestId('search-button');
  27 |     this.noResults = page.getByTestId('no-results');
  28 |     this.delayedButton = page.getByTestId('delayed-button');
  29 |     this.delayedData = page.getByTestId('delayed-data');
  30 |   }
  31 |
  32 |   async goto() {
  33 |     await this.page.goto('http://localhost:3000/ajax');
  34 |   }
  35 |
  36 |   async refreshPosts() {
> 37 |     await this.refreshPostsButton.click();
     |                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  38 |     await expect(this.postsList).toBeVisible();
  39 |   }
  40 |
  41 |   async submitPost(title: string, body: string) {
  42 |     await this.titleInput.fill(title);
  43 |     await this.bodyInput.fill(body);
  44 |     await this.submitButton.click();
  45 |     await expect(this.submittedData).toContainText('Successfully Submitted:');
  46 |   }
  47 |
  48 |   async search(query: string) {
  49 |     await this.searchInput.fill(query);
  50 |     await this.searchButton.click();
  51 |     await expect(this.noResults).toContainText(/no results found/i);
  52 |   }
  53 |
  54 |   async testDelayedLoad() {
  55 |     await this.delayedButton.click();
  56 |     await expect(this.delayedData).toContainText('Loaded Data:');
  57 |   }
  58 | }
```