# Test info

- Name: AJAX Requests - Refactored
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\ajax-requests.spec.ts:4:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByTestId('posts-list')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByTestId('posts-list')

    at AjaxPage.refreshPosts (C:\Users\damian.pascalau\Projects\automation-test-site\tests\page-objects\AjaxPage.ts:38:34)
    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\ajax-requests.spec.ts:8:3
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
- heading "AJAX Requests" [level=1]
- paragraph: Practice with asynchronous requests, loading states, and dynamic content.
- text: Data Fetching Get data from a remote API
- button "Refresh Posts"
- heading "Posts:" [level=3]
- paragraph: No posts available. Click "Refresh Posts" to load data.
- text: Form Submission Send data to a remote API Title
- textbox "Title"
- text: Content
- textbox "Content"
- button "Submit Post"
- text: Search API Search data from a remote API
- textbox "Search users..."
- button "Search" [disabled]
- heading "Search Results:" [level=3]
- paragraph: No results found. Try searching for something else.
- text: Delayed Requests Handle long-running API calls
- button "Fetch Delayed Data"
- paragraph: Click the button to start a request with a 3-second delay.
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
  37 |     await this.refreshPostsButton.click();
> 38 |     await expect(this.postsList).toBeVisible();
     |                                  ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
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