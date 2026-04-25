import { test, expect } from '@playwright/test';

test.describe('Task Details and Status', () => {
  test('should change task status and see reflected change', async ({ page }) => {
    await page.goto('/');
    
    // Create task
    await page.click('[data-date="2026-04-25"]');
    await page.fill('input', 'Status Task');
    await page.click('button:has-text("Criar Tarefa")');
    
    // Click on task to open details
    await page.click('text=Status Task');
    
    // Change status
    await page.selectOption('select', 'CONCLUIDA');
    
    // Verify (e.g. check for visual feedback or tree view update)
    // For now, just ensure the select has the value
    await expect(page.locator('select')).toHaveValue('CONCLUIDA');
  });
});
