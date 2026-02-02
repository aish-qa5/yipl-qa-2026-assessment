import { BasePage } from './BasePage.js';

/**
 * Dashboard Page Object
 * Handles all interactions on the notes dashboard page
 */
export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.addNoteButton = '[data-testid="add-note"], button:has-text("Add"), button:has-text("Create"), button:has-text("New")';
    this.notesList = '[class*="notes"], [class*="list"], main';
    this.noteItem = '[data-testid*="note"], [class*="note-item"], [class*="card"]';
    this.noteTitleInput = '[data-testid*="title"], input[placeholder*="title"], input[placeholder*="Title"]';
    this.noteContentTextarea = '[data-testid*="content"], textarea[placeholder*="content"], textarea[placeholder*="Content"], textarea[placeholder*="description"]';
    this.saveNoteButton = '[data-testid*="save"], button:has-text("Save"), button:has-text("Add"), button:has-text("Update")';
    this.deleteNoteButton = '[data-testid*="delete"], button:has-text("Delete"), [class*="delete"]';
    this.editNoteButton = '[data-testid*="edit"], button:has-text("Edit"), [class*="edit"]';
    this.toggleNoteButton = '[data-testid*="toggle"], input[type="checkbox"]';
    this.searchInput = '[data-testid*="search"], input[placeholder*="search"], input[placeholder*="Search"]';
    this.categoryFilter = '[data-testid*="category"], select[class*="filter"]';
    this.userProfile = '[data-testid*="profile"], [class*="user"], button:has-text("Profile")';
    this.logoutButton = 'button:has-text("Logout"), a:has-text("Logout")';
    this.successMessage = '[class*="success"], [class*="alert-success"], [role="status"]';
    this.errorMessage = '[class*="error"], [class*="alert-danger"], [role="alert"]';
    this.confirmDeleteDialog = '[class*="modal"], [class*="dialog"], [role="dialog"]';
    this.confirmDeleteButton = 'button:has-text("Confirm"), button:has-text("Yes"), button:has-text("Delete")';
    this.cancelButton = 'button:has-text("Cancel"), button:has-text("No")';
  }

  /**
   * Navigate to dashboard
   */
  async navigateToDashboard() {
    await this.goto('/dashboard');
  }

  /**
   * Check if user is logged in (dashboard visible)
   */
  async isLoggedIn() {
    try {
      await this.page.waitForURL('**/dashboard', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click add note button
   */
  async clickAddNote() {
    const selectors = [
      '[data-testid="add-note"]',
      'button:has-text("Add")',
      'button:has-text("Create")',
      'button:has-text("New")',
      'button:has-text("add note")',
      '[class*="add"]'
    ];

    let found = false;
    for (const selector of selectors) {
      try {
        const locator = this.page.locator(selector).first();
        if (await locator.isVisible({ timeout: 1000 }).catch(() => false)) {
          await locator.click({ timeout: 1000 });
          found = true;
          break;
        }
      } catch {
        // Continue to next selector
      }
    }
    
    if (!found) {
      throw new Error('Add note button not found');
    }
  }

  /**
   * Enter note title
   */
  async enterNoteTitle(title) {
    await this.page.waitForSelector(this.noteTitleInput);
    await this.fillInput(this.noteTitleInput, title);
  }

  /**
   * Enter note content
   */
  async enterNoteContent(content) {
    await this.page.waitForSelector(this.noteContentTextarea);
    const textarea = this.page.locator(this.noteContentTextarea).first();
    await textarea.fill(content);
  }

  /**
   * Click save note button
   */
  async clickSaveNote() {
    await this.click(this.saveNoteButton);
  }

  /**
   * Create a new note
   */
  async createNote(title, content) {
    await this.clickAddNote();
    await this.enterNoteTitle(title);
    await this.enterNoteContent(content);
    await this.clickSaveNote();
  }

  /**
   * Get all notes count
   */
  async getNotesCount() {
    const notes = this.page.locator(this.noteItem);
    return await notes.count();
  }

  /**
   * Get note by title
   */
  async getNoteByTitle(title) {
    return this.page.locator(this.noteItem, { has: this.page.locator(`text=${title}`) }).first();
  }

  /**
   * Click on a note to edit
   */
  async clickNoteByTitle(title) {
    const note = await this.getNoteByTitle(title);
    await note.click();
  }

  /**
   * Update note
   */
  async updateNote(newTitle, newContent) {
    await this.enterNoteTitle(newTitle);
    await this.enterNoteContent(newContent);
    await this.clickSaveNote();
  }

  /**
   * Delete note by clicking delete button
   */
  async deleteNote() {
    const deleteBtn = this.page.locator(this.deleteNoteButton).first();
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
      // Wait for confirmation dialog
      await this.page.waitForSelector(this.confirmDeleteDialog);
      await this.click(this.confirmDeleteButton);
    }
  }

  /**
   * Cancel delete operation
   */
  async cancelDelete() {
    await this.click(this.cancelButton);
  }

  /**
   * Toggle note status
   */
  async toggleNote() {
    const toggle = this.page.locator(this.toggleNoteButton).first();
    await toggle.click();
  }

  /**
   * Search for notes
   */
  async searchNotes(query) {
    const selectors = [
      '[data-testid*="search"]',
      'input[placeholder*="search"]',
      'input[placeholder*="Search"]',
      'input[type="text"][placeholder*="search" i]'
    ];

    for (const selector of selectors) {
      try {
        const searchInput = this.page.locator(selector).first();
        if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
          await searchInput.fill(query);
          return;
        }
      } catch {
        // Continue to next selector
      }
    }

    // If none found, throw error
    throw new Error('Search input not found');
  }

  /**
   * Clear search
   */
  async clearSearch() {
    const selectors = [
      '[data-testid*="search"]',
      'input[placeholder*="search"]',
      'input[placeholder*="Search"]',
      'input[type="text"][placeholder*="search" i]'
    ];

    for (const selector of selectors) {
      try {
        const searchInput = this.page.locator(selector).first();
        if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
          await searchInput.clear();
          return;
        }
      } catch {
        // Continue to next selector
      }
    }

    // If none found, throw error
    throw new Error('Search input not found for clearing');
  }

  /**
   * Filter by category
   */
  async filterByCategory(category) {
    const categorySelect = this.page.locator(this.categoryFilter);
    if (await categorySelect.isVisible()) {
      await categorySelect.selectOption(category);
    }
  }

  /**
   * Get success message
   */
  async getSuccessMessage() {
    try {
      const msg = this.page.locator(this.successMessage);
      await msg.waitFor({ timeout: 3000 });
      return await msg.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Get error message
   */
  async getErrorMessage() {
    try {
      const msg = this.page.locator(this.errorMessage);
      await msg.waitFor({ timeout: 3000 });
      return await msg.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Click on user profile menu
   */
  async clickUserProfile() {
    await this.click(this.userProfile);
  }

  /**
   * Logout user
   */
  async logout() {
    await this.click(this.logoutButton);
  }

  /**
   * Check if note exists in list
   */
  async noteExists(title) {
    const note = this.page.locator(this.noteItem, { has: this.page.locator(`text=${title}`) });
    return await note.isVisible();
  }

  /**
   * Get visible notes count (after search/filter)
   */
  async getVisibleNotesCount() {
    const notes = this.page.locator(this.noteItem);
    let count = 0;
    const noteCount = await notes.count();
    for (let i = 0; i < noteCount; i++) {
      const isVisible = await notes.nth(i).isVisible();
      if (isVisible) count++;
    }
    return count;
  }

  /**
   * Clear all filters
   */
  async clearAllFilters() {
    await this.clearSearch();
    // Reset category filter if needed
    const categorySelect = this.page.locator(this.categoryFilter);
    if (await categorySelect.isVisible()) {
      await categorySelect.selectOption({ index: 0 });
    }
  }
}
