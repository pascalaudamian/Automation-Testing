import { Page, Locator } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly countrySelect: Locator;
  readonly hobbiesSelect: Locator;
  readonly termsCheckbox: Locator;
  readonly signUpButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.countrySelect = page.locator('select[name="country"]');
    this.hobbiesSelect = page.locator('select[name="hobbies"]');
    this.termsCheckbox = page.getByRole('checkbox', { name: /terms/i });
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
    this.successMessage = page.locator('text=Account created successfully!');
  }

  async goto() {
    await this.page.goto('/authentication-flows/signup');
  }

  async fillForm({
    name,
    email,
    password,
    confirmPassword,
    country,
    hobby,
  }: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    hobby: string;
  }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.countrySelect.selectOption(country);
    await this.hobbiesSelect.selectOption(hobby);
    await this.termsCheckbox.check();
  }

  async submit() {
    await this.signUpButton.click();
  }

  async isSuccessMessageVisible() {
    return this.successMessage.isVisible();
  }
}

