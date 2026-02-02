# Automation Execution Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running Tests](#running-tests)
5. [Test Organization](#test-organization)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Operating System**: Windows, macOS, or Linux
- **Disk Space**: At least 1GB (for Playwright browsers)
- **RAM**: Minimum 4GB recommended

### Browser Requirements
- Chromium
- Firefox
- WebKit
(Installed automatically by Playwright)

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Task 4/Automation test scripts"
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install --with-deps
```

This command:
- Downloads Chromium, Firefox, and WebKit browsers
- Installs system dependencies required by Playwright

### 4. Verify Installation
```bash
npx playwright --version
```

---

## Configuration

### Project Structure
```
tests/
├── pages/
│   ├── BasePage.js              # Base page object class
│   ├── LoginPage.js             # Login page interactions
│   ├── RegisterPage.js          # Registration page interactions
│   └── DashboardPage.js         # Dashboard page interactions
│
├── smoke/
│   ├── auth.smoke.spec.js       # Authentication smoke tests
│   └── notes.smoke.spec.js      # Notes CRUD smoke tests
│
└── regression/
    ├── auth.regression.spec.js  # Authentication regression tests
    └── notes.regression.spec.js # Notes regression tests
```

### Configuration Files
- **playwright.config.js**: Main Playwright configuration
  - Test directory: `./tests`
  - Parallel workers: 4 (on CI)
  - Reporters: HTML report
  - Retries: 2 (on CI only)

---

## Running Tests

### Execute All Tests
```bash
npm test
```

### Run Specific Test Suite

#### Smoke Tests Only
```bash
# All smoke tests
npm test -- tests/smoke/

# Authentication smoke tests only
npm test -- tests/smoke/auth.smoke.spec.js

# Notes smoke tests only
npm test -- tests/smoke/notes.smoke.spec.js
```

#### Regression Tests Only
```bash
# All regression tests
npm test -- tests/regression/

# Authentication regression tests only
npm test -- tests/regression/auth.regression.spec.js

# Notes regression tests only
npm test -- tests/regression/notes.regression.spec.js
```

### Run Specific Test Cases
```bash
# Run tests matching a pattern
npm test -- -g "User Registration with Valid Credentials"

# Run a single file
npm test -- tests/smoke/auth.smoke.spec.js
```

### Debugging & Troubleshooting Commands

#### Headed Mode (Watch Tests Run)
```bash
npm test -- --headed
```
Runs tests in headed mode so you can see browser interactions.

#### UI Mode (Interactive)
```bash
npm test -- --ui
```
Opens Playwright Inspector for interactive test execution and debugging.

#### Debug Mode
```bash
npm test -- --debug
```
Stops execution and opens debugger for step-by-step execution.

#### Trace Mode
```bash
npm test -- --trace on
```
Records traces of test execution for detailed analysis.

#### View HTML Report
```bash
npx playwright show-report
```
Opens the HTML test report in your default browser.

---

## Test Organization

### Test Types

#### 🔴 Smoke Tests
**Purpose**: Quick validation of critical functionality
**Location**: `tests/smoke/`
**Coverage**:
- User authentication (login, registration, logout)
- Basic CRUD operations on notes

**Run all smoke tests**:
```bash
npm test tests/smoke/
```

#### 🟠 Regression Tests
**Purpose**: Comprehensive validation of all features
**Location**: `tests/regression/`
**Coverage**:
- Edge cases
- Error handling
- Complex user workflows
- Data validation

**Run all regression tests**:
```bash
npm test tests/regression/
```

### Test File Naming Convention
- `*.smoke.spec.js`: Smoke test files
- `*.regression.spec.js`: Regression test files
- Pattern: `feature.type.spec.js` (e.g., `auth.smoke.spec.js`)

---

## CI/CD Pipeline

### GitHub Actions Workflow
The project includes automated nightly test execution via GitHub Actions.

#### Workflow: Daily Nightly Tests
- **Schedule**: 11 PM Nepal Standard Time (UTC+5:45)
- **File**: `.github/workflows/daily-nightly-tests.yml`
- **Features**:
  - Automatic daily test runs
  - Parallel execution (4 workers)
  - Test result artifacts retention (30 days)
  - Manual trigger capability

#### View Workflow Results
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Daily Nightly Tests (Nepal Time)**
4. View past runs and results

#### Trigger Workflow Manually
1. Go to **Actions** tab
2. Select **Daily Nightly Tests (Nepal Time)**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

---

## Troubleshooting

### Issue: Playwright Browsers Not Found
**Solution**:
```bash
npx playwright install --with-deps
```

### Issue: Tests Fail with "Browser not found"
**Solution**:
```bash
# Clear cache and reinstall
rm -rf ~/.cache/ms-playwright
npx playwright install --with-deps
```

### Issue: Timeout Errors
**Possible Causes**:
- Application is slow or unresponsive
- Network issues
- Browser resource constraints

**Solutions**:
```bash
# Increase timeout in tests
# or run with fewer parallel workers
npm test -- --workers=1
```

### Issue: Port Already in Use (CI/CD)
**Solution**:
Playwright tests use dynamic port allocation. If issues persist, check for:
```bash
# Find process using port
lsof -i :PORT_NUMBER
```

### Issue: Tests Pass Locally but Fail in CI
**Common Causes**:
- Environment variable differences
- Browser version differences
- Timing issues

**Solutions**:
- Check CI environment variables
- Update Playwright browsers: `npx playwright install`
- Add explicit waits for dynamic content

### Getting Help
1. Check test output and error messages
2. View HTML report: `npx playwright show-report`
3. Enable trace mode for detailed debugging
4. Review test logs in GitHub Actions

---

## Best Practices

### Writing Tests
- Use Page Object Model pattern
- Keep tests focused and independent
- Use meaningful test descriptions
- Avoid hard-coded waits; use Playwright waits

### Running Tests
- Always run smoke tests first
- Use headed mode for debugging
- Check reports after execution
- Keep CI/CD pipeline clean

### Maintenance
- Update Playwright regularly: `npm update @playwright/test`
- Review and update selectors if UI changes
- Monitor test execution times
- Archive old test reports

---

## Additional Resources

### Documentation
- [Playwright Official Documentation](https://playwright.dev)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Reports
- **HTML Report**: Generated after test runs
- **View**: `npx playwright show-report`
- **Location**: `playwright-report/`

### Support
- Check GitHub Issues in repository
- Review test logs and traces
- Consult Playwright documentation

---

**Last Updated**: February 2, 2026
**Version**: 1.0
