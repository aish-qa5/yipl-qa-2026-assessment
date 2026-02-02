# Test Execution Guide for Notes Application

## Quick Start Commands

### 1️⃣ SMOKE TESTS (Run These First - Critical Path)

```bash
# Run all smoke tests (authentication + notes CRUD)
npm test -- tests/auth.smoke.spec.js tests/notes.smoke.spec.js

# Run only authentication smoke tests
npm test -- tests/auth.smoke.spec.js

# Run only notes smoke tests
npm test -- tests/notes.smoke.spec.js

# Run with headed browser (see what's happening)
npm test -- tests/auth.smoke.spec.js tests/notes.smoke.spec.js --headed

# Run with UI mode (interactive)
npm test -- --ui
```

### 2️⃣ REGRESSION TESTS (Comprehensive Coverage)

```bash
# Run all regression tests
npm test -- tests/auth.regression.spec.js tests/notes.regression.spec.js

# Run only authentication regression tests
npm test -- tests/auth.regression.spec.js

# Run only notes regression tests
npm test -- tests/notes.regression.spec.js

# Run all tests (smoke + regression)
npm test
```

### 3️⃣ DEBUGGING & TROUBLESHOOTING

```bash
# Run with debug mode (step through code)
npm test -- --debug tests/auth.smoke.spec.js

# Run specific test within file
npm test -- tests/auth.smoke.spec.js -g "User Registration with Valid Credentials"

# Run with trace (records activity)
npm test -- --trace on

# Run with specific browser
npm test -- --project=chromium
npm test -- --project=firefox
npm test -- --project=webkit

# Generate and view HTML report
npm test
npx playwright show-report

# View trace recording
npx playwright show-trace <trace-file-path>
```

---

## 📋 Test Categories & Descriptions

### SMOKE TESTS ✅ (High Priority)
These are your **critical path tests** that must always pass.

| Test # | File | Description | Expected Outcome |
|--------|------|-------------|-----------------|
| 1.1 | auth.smoke.spec.js | Register with valid credentials | Account created |
| 1.2 | auth.smoke.spec.js | Register with mismatched passwords | Error shown |
| 1.3 | auth.smoke.spec.js | Register with empty fields | Validation error |
| 1.4 | auth.smoke.spec.js | Login with valid credentials | Dashboard shown |
| 1.5 | auth.smoke.spec.js | Login with invalid email | Error shown |
| 1.6 | auth.smoke.spec.js | Login with incorrect password | Error shown |
| 1.7 | auth.smoke.spec.js | Login with empty fields | Validation error |
| 3.1 | notes.smoke.spec.js | Create new note | Note appears in list |
| 3.2 | notes.smoke.spec.js | Edit existing note | Changes saved |
| 3.3 | notes.smoke.spec.js | Delete note | Note removed from list |
| 3.4 | notes.smoke.spec.js | Create note with empty content | Note created |

### REGRESSION TESTS 🔄 (Comprehensive)
These are your **edge case and error scenario tests**.

#### Authentication Regression (21 tests)
- Email validation (various formats)
- Password requirements
- Form field persistence
- Navigation between pages
- Social login buttons visible

#### Notes Management Regression (21 tests)
- Create notes with special characters and Unicode
- Edit operations (title, content separately)
- Delete with confirmation and cancellation
- Search functionality (matching, no results, case-insensitive)
- Category filtering
- Note toggle/status
- Validation scenarios

---

## 🏃 Running Tests by Scenario

### Sign Up / Registration Testing
```bash
# All sign up tests
npm test -- tests/auth.smoke.spec.js -g "Sign Up"
npm test -- tests/auth.regression.spec.js -g "Registration"

# Specific registration scenario
npm test -- tests/auth.smoke.spec.js -g "Valid Credentials"
npm test -- tests/auth.regression.spec.js -g "Existing Email"
```

### Login Testing
```bash
# All login tests
npm test -- tests/auth.smoke.spec.js -g "Login"
npm test -- tests/auth.regression.spec.js -g "Login"

# Specific login scenarios
npm test -- tests/auth.smoke.spec.js -g "Valid Credentials"
npm test -- tests/auth.regression.spec.js -g "Empty"
```

### Notes CRUD Testing
```bash
# All notes tests
npm test -- tests/notes.smoke.spec.js
npm test -- tests/notes.regression.spec.js

# Create notes
npm test -- tests/notes.regression.spec.js -g "Create"

# Edit notes
npm test -- tests/notes.regression.spec.js -g "Edit"

# Delete notes
npm test -- tests/notes.regression.spec.js -g "Delete"

# Search/Filter
npm test -- tests/notes.regression.spec.js -g "Search"
```

---

## 📊 Expected Test Results

### Smoke Tests Summary
```
✅ Authentication - SMOKE TESTS (7 tests)
  ✓ Sign Up Flow (3 tests)
    - User Registration with Valid Credentials
    - User Registration with Mismatched Passwords
    - User Registration with Empty Fields
  ✓ Login Flow (4 tests)
    - User Login with Valid Credentials
    - User Login with Invalid Email
    - User Login with Incorrect Password
    - User Login with Empty Fields

✅ Notes Management - SMOKE TESTS (4 tests)
  - Create a New Note
  - Edit an Existing Note
  - Delete a Note
  - Create Note with Empty Content

Total: 11 Tests
Expected Pass Rate: 100% (critical path must work)
```

### Regression Tests Summary
```
✅ Authentication - REGRESSION TESTS (21 tests)
  - User Registration Scenarios (6 tests)
  - User Login Scenarios (5 tests)
  - Navigation Between Auth Pages (3 tests)
  - Social Login Options (2 tests)
  - Email Validation (5 tests)

✅ Notes Management - REGRESSION TESTS (21 tests)
  - Create Note Scenarios (6 tests)
  - Edit Note Scenarios (3 tests)
  - Delete Note Scenarios (3 tests)
  - Search Note Scenarios (4 tests)
  - Note Toggle/Status Scenarios (1 test)
  - Validation Scenarios (2 tests)
  - Category/Filter Scenarios (2 tests)

Total: 42 Tests
Expected Pass Rate: 85%+ (some tests may require proper auth setup)
```

---

## 🔍 Understanding Test Results

### All Tests Passed ✅
```
✓ 53 passed (1m 23s)

What it means: Your application is working as expected!
Action: Good to merge and deploy
```

### Some Tests Failed ⚠️
```
✗ 48 passed, 5 failed (1m 45s)

What it means: Some functionality has issues
Action: 
1. Check which tests failed
2. Review test logs
3. Investigate the failing feature
4. Fix and rerun
```

### Tests Not Running ❌
```
0 tests, some tests skipped

What it means: Authentication issues or environment problems
Action:
1. Check if you're logged in
2. Verify test credentials exist
3. Check network connectivity
4. Review error messages in terminal
```

---

## 📈 Test Execution Recommendations

### Development Phase
```bash
# 1. Run smoke tests continuously
npm test -- tests/auth.smoke.spec.js tests/notes.smoke.spec.js --watch

# 2. Focus on specific features
npm test -- tests/notes.smoke.spec.js -g "Create"

# 3. Use debug mode for failures
npm test -- --debug tests/auth.smoke.spec.js
```

### Before Code Review
```bash
# 1. Run all smoke tests
npm test -- tests/auth.smoke.spec.js tests/notes.smoke.spec.js

# 2. Run relevant regression tests
npm test -- tests/notes.regression.spec.js

# 3. View HTML report
npx playwright show-report
```

### Before Production Release
```bash
# 1. Run complete test suite
npm test

# 2. Generate reports
npx playwright show-report

# 3. Archive results
# Save test-results/ and playwright-report/ directories
```

---

## 🛠️ Customization

### Add New Test
```javascript
// In auth.smoke.spec.js or appropriate file
test('New Test Name', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Your test code here
  
  expect(condition).toBeTruthy();
});
```

### Modify Selectors
```javascript
// In pages/LoginPage.js (or relevant page object)
constructor(page) {
  super(page);
  this.emailInput = 'input[placeholder="Email"]'; // Update this
  this.loginButton = 'button[type="submit"]';    // Update this
}
```

### Change Timeouts
```bash
# Edit playwright.config.js
use: {
  timeout: 30 * 1000, // Default 30s
  navigationTimeout: 30 * 1000,
},
```

---

## ⚙️ Configuration

### Test Configuration File
Edit `playwright.config.js` to:
- Change timeout values
- Add/remove browsers (chromium, firefox, webkit)
- Modify retries
- Change reporter settings

```javascript
// Example configuration
fullyParallel: true,        // Run tests in parallel
retries: process.env.CI ? 2 : 0,  // Retry on CI
timeout: 30 * 1000,         // Test timeout
navigationTimeout: 30 * 1000,     // Navigation timeout
```

### Environment Variables
```bash
# Create .env file (if needed)
TEST_EMAIL=demo@test.com
TEST_PASSWORD=password123
BASE_URL=https://practice.expandtesting.com/notes/app
```

---

## 📝 Test Report Files

### Generated After Test Run
```
playwright-report/     - HTML report (open index.html)
test-results/         - Raw test results
  - <test-name>/
    - trace.zip       - Test recording
    - video.webm      - Video of test
    - screenshots/    - Test screenshots
```

### View Results
```bash
# Open HTML report
npx playwright show-report

# Open specific trace
npx playwright show-trace test-results/path-to-trace.zip
```

---

## 🎯 Success Criteria

### Smoke Tests
- ✅ All 11 smoke tests must PASS
- ✅ Tests run in < 5 minutes
- ✅ No manual intervention needed

### Regression Tests
- ✅ 80%+ of regression tests PASS
- ✅ Test run completes within reasonable time
- ✅ Critical flows work end-to-end

### Overall Quality
- ✅ Login flow works reliably
- ✅ Note creation works reliably
- ✅ Note deletion works reliably
- ✅ Search/filter functionality works
- ✅ Form validation works

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout in playwright.config.js |
| Element not found | Check if selector is correct, use --headed mode |
| Authentication fails | Verify test credentials exist in test environment |
| Navigation fails | Check URL patterns match your environment |
| Network errors | Check internet connection and app availability |
| Flaky tests | Add more explicit waits, use better selectors |

---

## 📞 Quick Help

```bash
# List all available tests
npm test -- --list

# Run with more verbose output
npm test -- --reporter=list

# Run single test
npm test -- -g "test name pattern"

# Run tests matching pattern
npm test -- -g "Login"

# Update snapshots (if using snapshot testing)
npm test -- --update-snapshots

# Run in slow motion to debug
npm test -- --headed --slow-mo=1000
```

---

**Last Updated**: February 2, 2026  
**Playwright Version**: Latest  
**Node Version**: 14+  
**Status**: ✅ Ready for Testing
