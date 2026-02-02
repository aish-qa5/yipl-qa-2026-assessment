/**
 * Base Page Object
 * Contains common methods and properties used across all page objects
 */
export class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://practice.expandtesting.com/notes/app';
  }

  /**
   * Navigate to a URL
   * @param {string} path - The path to navigate to (relative to baseUrl)
   */
  async goto(path = '') {
    await this.page.goto(`${this.baseUrl}${path}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  }

  /**
   * Get the current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    return this.page.title();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Fill input field
   */
  async fillInput(selector, value) {
    const input = this.page.locator(selector);
    await input.fill(value);
  }

  /**
   * Click element
   */
  async click(selector) {
    await this.page.locator(selector).click();
  }

  /**
   * Get text from element
   */
  async getText(selector) {
    return this.page.locator(selector).textContent();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    return this.page.locator(selector).isVisible();
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForURL(urlPattern, timeout = 5000) {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Get alert/notification message
   */
  async getAlertMessage() {
    try {
      const alert = this.page.locator('[class*="alert"], [class*="message"], [class*="toast"]');
      await alert.waitFor({ timeout: 3000 });
      return await alert.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForNavigation();
  }
}
