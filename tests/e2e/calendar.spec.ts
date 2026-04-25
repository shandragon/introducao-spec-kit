import { test, expect } from '@playwright/test';

test.describe('Task Organizer Calendar', () => {
  test('should create a task and see it on the calendar', async ({ page }) => {
    await page.goto('/');
    
    // Click on a date (e.g., April 25, 2026)
    // Note: This depends on the exact internal structure of FullCalendar in the DOM
    await page.click('[data-date="2026-04-25"]');
    
    // Fill the form
    await page.fill('input[placeholder="Ex: Lavar o carro"]', 'E2E Task');
    await page.fill('textarea', 'Detail description');
    await page.click('button:has-text("Criar Tarefa")');
    
    // Verify it appears
    const task = page.locator('.fc-event-title', { hasText: 'E2E Task' });
    await expect(task).toBeVisible();
  });

  test('should move a task via drag and drop', async ({ page }) => {
    await page.goto('/');
    
    // Create task first or use existing
    await page.click('[data-date="2026-04-25"]');
    await page.fill('input[placeholder="Ex: Lavar o carro"]', 'Movable Task');
    await page.click('button:has-text("Criar Tarefa")');
    
    const source = page.locator('.fc-event', { hasText: 'Movable Task' });
    const target = page.locator('[data-date="2026-04-26"]');
    
    await source.dragTo(target);
    
    // Check if it's on the new date
    await expect(target.locator('.fc-event', { hasText: 'Movable Task' })).toBeVisible();
  });
});
