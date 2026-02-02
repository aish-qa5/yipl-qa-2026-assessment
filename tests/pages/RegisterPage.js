import { BasePage } from './BasePage.js';

/**
 * Register Page Object
 * Handles all interactions on the registration page
 */
export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors - using data-testid attributes for stability
    this.emailInput = '[data-testid="register-email"]';
    this.nameInput = '[data-testid="register-name"]';
    this.passwordInput = '[data-testid="register-password"]';
    this.confirmPasswordInput = '[data-testid="register-confirm-password"]';
    this.registerButton = '[data-testid="register-submit"]';
    this.googleRegisterButton = '[href*="google"]';
    this.linkedinRegisterButton = '[href*="linkedin"]';
    this.loginLink = '[href*="login"]';
    this.errorMessage = '[class*="alert"], [role="alert"]';
  }

  /**
   * Navigate to register page
   */
  async navigateToRegister() {
    await this.goto('/register');
  }

  /**
   * Enter email address
   */
  async enterEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Enter name
   */
  async enterName(name) {
    await this.fillInput(this.nameInput, name);
  }

  /**
   * Enter password
   */
  async enterPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Enter confirm password
   */
  async enterConfirmPassword(password) {
    await this.fillInput(this.confirmPasswordInput, password);
  }

  /**
   * Click register button
   */
  async clickRegister() {
    await this.click(this.registerButton);
  }

  /**
   * Perform full registration
   */
  async register(email, name, password, confirmPassword = null) {
    await this.enterEmail(email);
    await this.enterName(name);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword || password);
    await this.clickRegister();
  }

  /**
   * Check if email input is visible
   */
  async isEmailInputVisible() {
    return this.isVisible(this.emailInput);
  }

  /**
   * Check if name input is visible
   */
  async isNameInputVisible() {
    return this.isVisible(this.nameInput);
  }

  /**
   * Check if password input is visible
   */
  async isPasswordInputVisible() {
    return this.isVisible(this.passwordInput);
  }

  /**
   * Check if confirm password input is visible
   */
  async isConfirmPasswordInputVisible() {
    return this.isVisible(this.confirmPasswordInput);
  }

  /**
   * Check if register button is visible
   */
  async isRegisterButtonVisible() {
    return this.isVisible(this.registerButton);
  }

  /**
   * Click login link
   */
  async clickLoginLink() {
    await this.click(this.loginLink);
  }

  /**
   * Get error message
   */
  async getErrorMessage() {
    try {
      // Add small delay to ensure error message appears
      await this.page.waitForTimeout(200);
      
      // Try multiple methods to find error text
      try {
        const errorText = await this.page.getByText('Passwords don\'t match').textContent({ timeout: 3000 });
        if (errorText && errorText.trim()) return errorText.trim();
      } catch {}

      try {
        const errorText = await this.page.getByText(/match|required|already|invalid/i).first().textContent({ timeout: 3000 });
        if (errorText && errorText.trim()) return errorText.trim();
      } catch {}

      try {
        const errorText = await this.page.locator('[class*="alert"]').first().textContent({ timeout: 2000 });
        if (errorText && errorText.trim()) return errorText.trim();
      } catch {}

      try {
        const errorText = await this.page.locator('[role="alert"]').first().textContent({ timeout: 2000 });
        if (errorText && errorText.trim()) return errorText.trim();
      } catch {}

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get email input value
   */
  async getEmailInputValue() {
    return this.page.locator(this.emailInput).inputValue();
  }

  /**
   * Get name input value
   */
  async getNameInputValue() {
    return this.page.locator(this.nameInput).inputValue();
  }

  /**
   * Clear email field
   */
  async clearEmailField() {
    await this.page.locator(this.emailInput).clear();
  }

  /**
   * Clear name field
   */
  async clearNameField() {
    await this.page.locator(this.nameInput).clear();
  }

  /**
   * Clear password field
   */
  async clearPasswordField() {
    await this.page.locator(this.passwordInput).clear();
  }

  /**
   * Clear confirm password field
   */
  async clearConfirmPasswordField() {
    await this.page.locator(this.confirmPasswordInput).clear();
  }
}
