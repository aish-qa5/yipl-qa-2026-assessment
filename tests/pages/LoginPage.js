import { BasePage } from './BasePage.js';

/**
 * Login Page Object
 * Handles all interactions on the login page
 */
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors - using data-testid attributes for stability
    this.emailInput = '[data-testid="login-email"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit"]';
    this.forgotPasswordLink = '[href*="forgot-password"]';
    this.registerLink = '[href*="register"]';
    this.googleLoginButton = '[href*="google"]';
    this.linkedinLoginButton = '[href*="linkedin"]';
    this.errorMessage = '[class*="alert"], [role="alert"]';
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.goto('/login');
  }

  /**
   * Enter email address
   */
  async enterEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Enter password
   */
  async enterPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.click(this.loginButton);
  }

  /**
   * Perform login with email and password
   */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if email input is visible
   */
  async isEmailInputVisible() {
    return this.isVisible(this.emailInput);
  }

  /**
   * Check if password input is visible
   */
  async isPasswordInputVisible() {
    return this.isVisible(this.passwordInput);
  }

  /**
   * Check if login button is visible
   */
  async isLoginButtonVisible() {
    return this.isVisible(this.loginButton);
  }

  /**
   * Check if forgot password link is visible
   */
  async isForgotPasswordLinkVisible() {
    return this.isVisible(this.forgotPasswordLink);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword() {
    await this.click(this.forgotPasswordLink);
  }

  /**
   * Click register link
   */
  async clickRegisterLink() {
    await this.click(this.registerLink);
  }

  /**
   * Click Google login button
   */
  async clickGoogleLogin() {
    await this.click(this.googleLoginButton);
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
        const errorText = await this.page.getByText('Incorrect email address or password').textContent({ timeout: 3000 });
        if (errorText && errorText.trim()) return errorText.trim();
      } catch {}

      try {
        const errorText = await this.page.getByText(/required|invalid|incorrect/i).first().textContent({ timeout: 3000 });
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
   * Get password input value
   */
  async getPasswordInputValue() {
    return this.page.locator(this.passwordInput).inputValue();
  }
}
