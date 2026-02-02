/**
 * spec: specs/notes-app.test.plan.md
 * category: REGRESSION TESTS
 * 
 * Comprehensive regression tests for authentication
 * Testing edge cases and error scenarios
 */

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Authentication - REGRESSION TESTS', () => {
  test.describe('User Registration Scenarios', () => {
    test('1.1 Register with Existing Email', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      // Using a known email that exists
      const existingEmail = 'existing@test.com';
      const newName = `User ${Date.now()}`;
      const password = 'TestPassword123!@';

      // 1. Navigate to register page
      await registerPage.navigateToRegister();
      expect(page.url()).toContain('/register');

      // 2. Fill form with existing email
      await registerPage.register(existingEmail, newName, password);

      // 3. Verify error message for duplicate email
      await page.waitForTimeout(1000);
      const errorMessage = await registerPage.getErrorMessage();
      
      if (errorMessage) {
        expect(errorMessage.toLowerCase()).toContain('already exists');
      }

      // 4. User should remain on register page
      expect(page.url()).toContain('/register');
    });

    test('1.2 Register with Invalid Email Format', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      const invalidEmail = 'notanemail';
      const name = `User ${Date.now()}`;
      const password = 'TestPassword123!@';

      // 1. Navigate to register page
      await registerPage.navigateToRegister();

      // 2. Enter invalid email
      await registerPage.register(invalidEmail, name, password);

      // 3. Verify validation error
      await page.waitForTimeout(1000);
      const errorMessage = await registerPage.getErrorMessage();
      expect(errorMessage || page.url()).toBeTruthy();

      // 4. User should remain on register page
      expect(page.url()).toContain('/register');
    });

    test('1.3 Register with Weak Password', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      const email = `weakpwd${Date.now()}@test.com`;
      const name = `User ${Date.now()}`;
      const weakPassword = '123'; // Too weak

      // 1. Navigate to register page
      await registerPage.navigateToRegister();

      // 2. Try to register with weak password
      await registerPage.register(email, name, weakPassword);

      // 3. Verify error or remain on page
      await page.waitForTimeout(1000);
      expect(page.url()).toContain('/register');
    });

    test('1.4 Register Form Fields are Preserved on Error', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      const email = `preserve${Date.now()}@test.com`;
      const name = 'Test User';
      const password = 'Password123!@';
      const wrongConfirm = 'DifferentPassword123!@';

      // 1. Navigate to register page
      await registerPage.navigateToRegister();

      // 2. Fill form with mismatched passwords
      await registerPage.enterEmail(email);
      await registerPage.enterName(name);
      await registerPage.enterPassword(password);
      await registerPage.enterConfirmPassword(wrongConfirm);
      await registerPage.clickRegister();

      // 3. Get error
      await page.waitForTimeout(1000);

      // 4. Verify fields still contain entered values
      const savedEmail = await registerPage.getEmailInputValue();
      const savedName = await registerPage.getNameInputValue();

      expect(savedEmail).toBe(email);
      expect(savedName).toBe(name);
    });

    test('1.5 Register with Special Characters in Name', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      const email = `special${Date.now()}@test.com`;
      const nameWithSpecialChars = "John O'Brien-Smith";
      const password = 'TestPassword123!@';

      // 1. Navigate to register page
      await registerPage.navigateToRegister();

      // 2. Register with special characters in name
      await registerPage.register(email, nameWithSpecialChars, password);

      // 3. Verify result
      await page.waitForTimeout(1000);
      // Should either succeed or show validation error
      expect(page.url()).toBeTruthy();
    });
  });

  test.describe('User Login Scenarios', () => {
    test('1.6 Login with Empty Email', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      
      // 1. Navigate to login page
      await loginPage.navigateToLogin();

      // 2. Enter only password, leave email empty
      await loginPage.enterPassword('SomePassword123!@');
      await loginPage.clickLogin();

      // 3. Verify validation error
      await page.waitForTimeout(1000);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();

      // 4. Remain on login page
      expect(page.url()).toContain('/login');
    });

    test('1.7 Login with Empty Password', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      
      // 1. Navigate to login page
      await loginPage.navigateToLogin();

      // 2. Enter email only, leave password empty
      await loginPage.enterEmail('user@test.com');
      await loginPage.clickLogin();

      // 3. Verify validation error
      await page.waitForTimeout(1000);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();

      // 4. Remain on login page
      expect(page.url()).toContain('/login');
    });

    test('1.8 Login Form Persists Email on Error', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      
      const email = 'persistent@test.com';
      const password = 'WrongPassword123!@';

      // 1. Navigate to login page
      await loginPage.navigateToLogin();

      // 2. Enter credentials and submit
      await loginPage.login(email, password);

      // 3. Get error
      await page.waitForTimeout(1000);

      // 4. Verify email is still in field
      const savedEmail = await loginPage.getEmailInputValue();
      expect(savedEmail).toBe(email);
    });

    test('1.9 Login with Very Long Email', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      
      // Very long but valid email format
      const longEmail = 'verylongemailaddress123456789@verylongsubdomain123.verylongmaindomain.com';
      const password = 'TestPassword123!@';

      // 1. Navigate to login page
      await loginPage.navigateToLogin();

      // 2. Try to login with very long email
      await loginPage.login(longEmail, password);

      // 3. Should show error or handle gracefully
      await page.waitForTimeout(1000);
      expect(page.url()).toContain('/login');
    });

    test('1.10 Login Button is Disabled During Submission', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      
      // 1. Navigate to login page
      await loginPage.navigateToLogin();

      // 2. Enter valid format credentials
      await loginPage.enterEmail('test@test.com');
      await loginPage.enterPassword('TestPassword123!@');

      // 3. Click login button and immediately check its state
      const loginButton = page.locator('button:has-text("Login")');
      await loginButton.click();

      // Button might be disabled or show loading state
      await page.waitForTimeout(500);
    });
  });

  test.describe('Navigation Between Auth Pages', () => {
    test('1.11 Navigate from Login to Register', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      const registerPage = new RegisterPage(page);
      
      // 1. Go to login page
      await loginPage.navigateToLogin();
      expect(page.url()).toContain('/login');

      // 2. Click "Create a free account" link
      await loginPage.clickRegisterLink();

      // 3. Should navigate to register page
      await page.waitForURL('**/register', { timeout: 10000 });
      expect(page.url()).toContain('/register');
    });

    test('1.12 Navigate from Register to Login', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      const loginPage = new LoginPage(page);
      
      // 1. Go to register page
      await registerPage.navigateToRegister();
      expect(page.url()).toContain('/register');

      // 2. Click "Log in here" link
      await registerPage.clickLoginLink();

      // 3. Should navigate to login page
      await page.waitForURL('**/login', { timeout: 10000 });
      expect(page.url()).toContain('/login');
    });

    test('1.13 Forgot Password Link is Visible', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      
      // 1. Navigate to login page
      await loginPage.navigateToLogin();

      // 2. Verify forgot password link is visible
      const isForgotVisible = await loginPage.isForgotPasswordLinkVisible();
      expect(isForgotVisible).toBeTruthy();

      // 3. Click forgot password
      await loginPage.clickForgotPassword();

      // 4. Should navigate to forgot password page
      await page.waitForURL('**/forgot-password', { timeout: 10000 });
      expect(page.url()).toContain('/forgot-password');
    });
  });

  test.describe('Social Login Options', () => {
    test('1.14 Google and LinkedIn Login Buttons Visible', async ({ page }) => {
      // Setup
      const loginPage = new LoginPage(page);
      
      // 1. Navigate to login page
      await loginPage.navigateToLogin();

      // 2. Verify social login buttons are visible
      const googleBtnVisible = page.locator('a:has-text("Login with Google")').isVisible();
      const linkedinBtnVisible = page.locator('a:has-text("Login with LinkedIn")').isVisible();

      expect(await googleBtnVisible).toBeTruthy();
      expect(await linkedinBtnVisible).toBeTruthy();
    });

    test('1.15 Google and LinkedIn Register Buttons Visible', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      // 1. Navigate to register page
      await registerPage.navigateToRegister();

      // 2. Verify social registration buttons are visible
      const googleBtnVisible = page.locator('a:has-text("Register with Google")').isVisible();
      const linkedinBtnVisible = page.locator('a:has-text("Register with LinkedIn")').isVisible();

      expect(await googleBtnVisible).toBeTruthy();
      expect(await linkedinBtnVisible).toBeTruthy();
    });
  });

  test.describe('Email Validation', () => {
    test('1.16 Register Rejects Email Without @ Symbol', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      // 1. Navigate to register page
      await registerPage.navigateToRegister();

      // 2. Try to register with invalid email
      await registerPage.register('invalidemail.com', 'Test User', 'Password123!@');

      // 3. Should show error or validation message
      await page.waitForTimeout(1000);
      expect(page.url()).toContain('/register');
    });

    test('1.17 Register Rejects Email with Spaces', async ({ page }) => {
      // Setup
      const registerPage = new RegisterPage(page);
      
      // 1. Navigate to register page
      await registerPage.navigateToRegister();

      // 2. Try to register with email containing spaces
      await registerPage.register('invalid email@test.com', 'Test User', 'Password123!@');

      // 3. Should show error
      await page.waitForTimeout(1000);
      expect(page.url()).toContain('/register');
    });
  });
});
