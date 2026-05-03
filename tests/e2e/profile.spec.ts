import { test, expect } from '@playwright/test';

test.describe('User Profile Management', () => {
  test.beforeEach(async ({ page }) => {
    // Basic login flow (assuming a test user exists or we create one)
    await page.goto('/register');
    await page.fill('input[placeholder="Nome"]', 'Test User');
    await page.fill('input[placeholder="E-mail"]', 'test@example.com');
    await page.fill('input[placeholder="Usuário"]', 'testuser' + Date.now());
    await page.fill('input[placeholder="Senha"]', 'password123');
    await page.click('button:has-text("Cadastrar")');
    await expect(page).toHaveURL('/');
  });

  test('should update user name and email', async ({ page }) => {
    await page.click('a:has-text("Perfil")');
    await expect(page).toHaveURL('/profile');

    await page.fill('input[placeholder="Seu nome"]', 'Updated Name');
    await page.fill('input[placeholder="seu@email.com"]', 'updated@example.com');
    await page.click('button:has-text("Salvar Alterações")');

    await expect(page.locator('text=Perfil atualizado com sucesso!')).toBeVisible();
    
    // Refresh and check persistence
    await page.reload();
    await expect(page.locator('input[placeholder="Seu nome"]')).toHaveValue('Updated Name');
    await expect(page.locator('input[placeholder="seu@email.com"]')).toHaveValue('updated@example.com');
  });

  test('should change password successfully', async ({ page }) => {
    await page.click('a:has-text("Perfil")');
    
    await page.fill('label:has-text("Senha Atual") + input', 'password123');
    await page.fill('label:has-text("Nova Senha") + input', 'newpassword123');
    await page.fill('label:has-text("Confirmar Nova Senha") + input', 'newpassword123');
    await page.click('button:has-text("Alterar Senha")');

    await expect(page.locator('text=Senha alterada com sucesso!')).toBeVisible();
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('should fail if passwords do not match', async ({ page }) => {
    await page.click('a:has-text("Perfil")');
    
    await page.fill('label:has-text("Senha Atual") + input', 'password123');
    await page.fill('label:has-text("Nova Senha") + input', 'newpassword123');
    await page.fill('label:has-text("Confirmar Nova Senha") + input', 'wrongpassword');
    await page.click('button:has-text("Alterar Senha")');

    await expect(page.locator('text=As senhas não coincidem')).toBeVisible();
  });
});
