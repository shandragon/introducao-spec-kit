# Quickstart: Gerenciamento de Perfil de Usuário

## Visão Geral
Esta funcionalidade permite que o usuário gerencie seus dados básicos e a segurança de sua conta através de uma interface dedicada de perfil.

## Comandos de Desenvolvimento

### Backend
1. Execute os testes unitários do serviço de perfil:
   ```bash
   cd backend && npx vitest run tests/unit/profileService.test.ts
   ```
2. Execute os testes de integração da API:
   ```bash
   cd backend && npx vitest run tests/integration/profile.test.ts
   ```

### E2E
1. Execute os testes de ponta-a-ponta:
   ```bash
   npx playwright test tests/e2e/profile.spec.ts
   ```

## Fluxo de Trabalho Recomendado

1. **Backend First**: Implementar o `profileService.ts` e validar com TDD.
2. **API Layer**: Criar as rotas e controladores em `backend/src/controllers/profileController.ts`.
3. **Frontend Component**: Criar a página de perfil e os formulários no frontend.
4. **Integração**: Conectar o frontend à API e validar fluxos de erro e sucesso com `react-hot-toast`.
5. **E2E**: Validar a jornada completa com Playwright.
