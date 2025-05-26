import { Page, Locator, expect } from '@playwright/test';

export class AjaxPage {
  readonly page: Page;
  readonly refreshPostsButton: Locator;
  readonly postsList: Locator;
  readonly titleInput: Locator;
  readonly bodyInput: Locator;
  readonly submitButton: Locator;
  readonly submittedData: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly noResults: Locator;
  readonly delayedButton: Locator;
  readonly delayedData: Locator;

  constructor(page: Page) {
    this.page = page;
    this.refreshPostsButton = page.getByTestId('refresh-posts');
    this.postsList = page.getByTestId('posts-list');
    this.titleInput = page.getByTestId('title-input');
    this.bodyInput = page.getByTestId('body-input');
    this.submitButton = page.getByTestId('submit-button');
    this.submittedData = page.getByTestId('submitted-data');
    this.searchInput = page.getByTestId('search-input');
    this.searchButton = page.getByTestId('search-button');
    this.noResults = page.getByTestId('no-results');
    this.delayedButton = page.getByTestId('delayed-button');
    this.delayedData = page.getByTestId('delayed-data');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/ajax');
  }

  async refreshPosts() {
    await this.refreshPostsButton.click();
    await expect(this.postsList).toBeVisible();
  }

  async submitPost(title: string, body: string) {
    await this.titleInput.fill(title);
    await this.bodyInput.fill(body);
    await this.submitButton.click();
    await expect(this.submittedData).toContainText('Successfully Submitted:');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await expect(this.noResults).toContainText(/no results found/i);
  }

  async testDelayedLoad() {
    await this.delayedButton.click();
    await expect(this.delayedData).toContainText('Loaded Data:');
  }
}