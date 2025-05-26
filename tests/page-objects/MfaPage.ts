import { Page, Locator } from '@playwright/test';

export class MfaPage {
  readonly page: Page;
  readonly codeInput: Locator;
  readonly verifyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.codeInput = page.getByPlaceholder('Enter MFA Code');
    this.verifyButton = page.getByRole('button', { name: 'Verify' });
  }

  async goto() {
    await this.page.goto('/authentication-flows/mfa');
  }

  async verify(code: string) {
    await this.codeInput.fill(code);
    await this.verifyButton.click();
  }
}