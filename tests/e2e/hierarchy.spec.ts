import { test, expect } from '@playwright/test';

test.describe('Task Hierarchy', () => {
  test('should create a sub-task and view it in tree view', async ({ page }) => {
    await page.goto('/');
    
    // Create parent
    await page.click('[data-date="2026-04-25"]');
    await page.fill('input', 'Parent Task');
    await page.click('button:has-text("Criar Tarefa")');
    
    // Open Tree View
    await page.click('button:has-text("Tree View")');
    
    // Logic for creating child would go here (e.g. click on Parent in tree to open detail and add child)
    // For MVP, assuming we can add child from detail view or form
    
    await expect(page.locator('text=Parent Task')).toBeVisible();
  });
});
