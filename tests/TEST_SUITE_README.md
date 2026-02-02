# Notes Application Test Suite

## Overview

This is a comprehensive Playwright test suite for the Notes Application at `https://practice.expandtesting.com/notes/app`. The test suite implements the **Page Object Model (POM)** pattern and is organized into **SMOKE** and **REGRESSION** test categories.

---

## 📁 Project Structure

```
tests/
├── pages/
│   ├── BasePage.js              # Base class for all page objects
│   ├── LoginPage.js             # Login page interactions
│   ├── RegisterPage.js          # Registration page interactions
│   └── DashboardPage.js         # Dashboard/Notes management interactions
│
├── auth.smoke.spec.js           # Authentication smoke tests
├── auth.regression.spec.js      # Authentication regression tests
├── notes.smoke.spec.js          # Notes management smoke tests
├── notes.regression.spec.js     # Notes management regression tests
├── seed.spec.js                 # Seed file for test setup
└── example.spec.js              # Example test file
```

---

## 🏗️ Page Object Model (POM) Architecture

### BasePage.js
The base class containing common methods used across all page objects:
- Navigation methods (`goto()`, `getCurrentUrl()`)
- Element interaction methods (`click()`, `fillInput()`, `getText()`)
- Waiting methods (`waitForElement()`, `waitForURL()`)
- Assertion helpers (`isVisible()`)

### LoginPage.js
Handles all interactions on the login page:
- `navigateToLogin()` - Navigate to login page
- `login(email, password)` - Perform login
- `clickForgotPassword()` - Navigate to password reset
- `getErrorMessage()` - Retrieve error messages
- `clickRegisterLink()` - Navigate to registration page

### RegisterPage.js
Handles all interactions on the registration page:
- `navigateToRegister()` - Navigate to register page
- `register(email, name, password, confirmPassword)` - Complete registration
- `getErrorMessage()` - Retrieve validation errors
- Methods to clear individual fields for validation testing

### DashboardPage.js
Handles all interactions on the notes dashboard:
- `createNote(title, content)` - Create a new note
- `updateNote(newTitle, newContent)` - Update existing note
- `deleteNote()` - Delete a note with confirmation
- `searchNotes(query)` - Search notes by title
- `filterByCategory(category)` - Filter notes by category
- `toggleNote()` - Toggle note status (active/inactive)
- `getNotesCount()` - Get total notes count
- `getSuccessMessage()` - Retrieve success notifications
- `getErrorMessage()` - Retrieve error notifications

---

## 🎯 Test Categories

### SMOKE TESTS ✅
Smoke tests cover **critical user journeys** that must always work:

#### Authentication Smoke Tests (`auth.smoke.spec.js`)
- ✅ **1.1** User Registration with Valid Credentials
- ✅ **1.2** User Registration with Mismatched Passwords
- ✅ **1.3** User Registration with Empty Fields
- ✅ **1.4** User Login with Valid Credentials
- ✅ **1.5** User Login with Invalid Email
- ✅ **1.6** User Login with Incorrect Password
- ✅ **1.7** User Login with Empty Fields

#### Notes Management Smoke Tests (`notes.smoke.spec.js`)
- ✅ **3.1** Create a New Note (Main flow)
- ✅ **3.2** Edit an Existing Note
- ✅ **3.3** Delete a Note
- ✅ **3.4** Create Note with Empty Content

---

### REGRESSION TESTS 🔄
Regression tests provide **comprehensive coverage** of edge cases and error scenarios:

#### Authentication Regression Tests (`auth.regression.spec.js`)
**User Registration Scenarios:**
- 1.1 Register with Existing Email
- 1.2 Register with Invalid Email Format
- 1.3 Register with Weak Password
- 1.4 Form Fields Preserved on Error
- 1.5 Register with Special Characters in Name
- 1.16 Reject Email Without @ Symbol
- 1.17 Reject Email with Spaces

**User Login Scenarios:**
- 1.6 Login with Empty Email
- 1.7 Login with Empty Password
- 1.8 Form Persists Email on Error
- 1.9 Login with Very Long Email
- 1.10 Login Button State During Submission

**Navigation Between Auth Pages:**
- 1.11 Navigate from Login to Register
- 1.12 Navigate from Register to Login
- 1.13 Forgot Password Link Visible
- 1.14 Google Login Button Visible
- 1.15 LinkedIn Register Button Visible

#### Notes Management Regression Tests (`notes.regression.spec.js`)
**Create Note Scenarios:**
- 3.1 Create Note with Title and Content
- 3.2 Create Note with Very Long Title
- 3.3 Create Note with Very Long Content
- 3.4 Create Multiple Notes Sequentially
- 3.5 Create Note with Special Characters
- 3.6 Create Note with Unicode/Emoji Characters

**Edit Note Scenarios:**
- 3.7 Edit Note - Change Title Only
- 3.8 Edit Note - Change Content Only
- 3.9 Edit Note with Empty Title Should Error
- 3.18 Note Title is Required
- 3.19 Note with Whitespace Only Title

**Delete Note Scenarios:**
- 3.10 Delete Note with Confirmation
- 3.11 Cancel Delete Operation
- 3.12 Delete Multiple Notes Sequentially

**Search Note Scenarios:**
- 3.13 Search Notes - Matching Results
- 3.14 Search Notes - No Results Found
- 3.15 Clear Search Results
- 3.16 Search is Case Insensitive

**Note Toggle/Status Scenarios:**
- 3.17 Toggle Note Status Active/Inactive

**Category/Filter Scenarios:**
- 3.20 Filter Notes by Category
- 3.21 Clear Category Filter

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Verify Playwright installation
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run smoke tests only
npm test auth.smoke.spec.js notes.smoke.spec.js

# Run regression tests only
npm test auth.regression.spec.js notes.regression.spec.js

# Run specific test file
npm test tests/auth.smoke.spec.js

# Run tests with UI mode
npm test -- --ui

# Run tests in debug mode
npm test -- --debug

# Run tests with headed browser
npm test -- --headed

# Run with specific browser
npm test -- --project=chromium
npm test -- --project=firefox
npm test -- --project=webkit
```

---

## 📊 Test Execution

### View Test Report
```bash
# Generate and open HTML report
npx playwright show-report
```

### Debug Failed Tests
```bash
# Run tests in debug mode to step through code
npm test -- --debug

# Use Playwright Inspector
npm test -- --debug tests/auth.smoke.spec.js
```

### Run Tests with Traces
```bash
# Tests already configured to save traces on first retry
# View traces using:
npx playwright show-trace path/to/trace.zip
```

---

## 🔧 Page Object Model Usage Example

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';

test.describe('Authentication', () => {
  test('User Login Flow', async ({ page }) => {
    // Create page objects
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to login
    await loginPage.navigateToLogin();

    // Perform login
    await loginPage.login('user@test.com', 'Password123!@');

    // Verify dashboard is loaded
    const isLoggedIn = await dashboardPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('Create and Delete Note', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Create note
    await dashboardPage.createNote('My Note', 'Note content');

    // Get notes count
    const countAfterCreate = await dashboardPage.getNotesCount();
    expect(countAfterCreate).toBeGreaterThan(0);

    // Delete note
    await dashboardPage.deleteNote();

    // Verify deletion
    const countAfterDelete = await dashboardPage.getNotesCount();
    expect(countAfterDelete).toBeLessThan(countAfterCreate);
  });
});
```

---

## ✨ Key Features

### 1. **Page Object Model (POM)**
- Centralized element selectors
- Reusable methods
- Easy maintenance and updates

### 2. **Organized Test Categories**
- **SMOKE**: Critical path tests (run first)
- **REGRESSION**: Comprehensive edge case coverage

### 3. **Error Handling**
- Tests include try-catch for graceful failure handling
- Specific error message assertions
- Validation of user feedback

### 4. **Test Data Generation**
- Unique timestamps for test data isolation
- Special characters and Unicode testing
- Long string handling

### 5. **Comprehensive Coverage**
- **Authentication**: Sign up, login, validation, navigation
- **Notes CRUD**: Create, read, update, delete operations
- **Search & Filter**: Note filtering and search functionality
- **Validation**: Error messages and form validation
- **UI State**: Button states, loading states, confirmations

---

## 🎓 Test Naming Convention

Tests follow the pattern from the test plan:
- `1.1 User Registration with Valid Credentials` (corresponds to spec number)
- `3.5 Create Note with Special Characters`

This makes it easy to:
- Cross-reference with test plan
- Track requirements
- Identify test purpose

---

## 📝 Best Practices Implemented

✅ **Page Object Pattern** - Centralized element management  
✅ **Explicit Waits** - Reliable element waiting  
✅ **Error Handling** - Graceful test failure management  
✅ **Test Isolation** - Each test is independent  
✅ **Descriptive Names** - Clear test purpose  
✅ **DRY Principle** - Reusable page object methods  
✅ **Organized Structure** - Logical test grouping  
✅ **Setup/Teardown** - `beforeEach` hooks for test preparation  

---

## 🐛 Troubleshooting

### Test Authentication Issues
- Some tests require valid user accounts
- Update test credentials in smoke tests if needed
- Use test environment URLs

### Element Not Found
- Check selectors in page objects
- Use `--headed` mode to see what's happening
- Use `--debug` mode to step through code

### Timeout Errors
- Increase timeout in `playwright.config.js`
- Add explicit waits for slower operations
- Check network conditions

### Selector Issues
- Use browser DevTools to inspect elements
- Update selectors in page object files
- Consider using more stable selectors (data-testid)

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Guide](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Test Assertions](https://playwright.dev/docs/test-assertions)

---

## 📞 Support

For issues or questions:
1. Check Playwright documentation
2. Review test logs in `test-results/`
3. View HTML report: `npx playwright show-report`
4. Run tests in debug mode: `npm test -- --debug`

---

## ✅ Checklist for Running Tests

- [ ] Install dependencies: `npm install`
- [ ] Install browsers: `npx playwright install`
- [ ] Configure test environment variables if needed
- [ ] Run smoke tests first: `npm test auth.smoke.spec.js notes.smoke.spec.js`
- [ ] Check test results and fix any failures
- [ ] Run full regression suite: `npm test`
- [ ] Review HTML report: `npx playwright show-report`
- [ ] Commit passing tests to repository

---

**Created**: February 2, 2026  
**Test Framework**: Playwright with JavaScript  
**Pattern**: Page Object Model (POM)  
**Categories**: Smoke & Regression Tests
