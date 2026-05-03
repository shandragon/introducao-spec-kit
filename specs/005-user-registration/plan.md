# Plano de Implementação: Cadastro de Usuário

## Visão Geral
Este plano descreve as etapas para implementar a funcionalidade de cadastro de usuário, divididas por contexto de aplicação.

## Estrutura do Plano

### Fase 0: Pesquisa e Configuração
- [ ] Definir extensão do esquema `User` (adicionar `name`, `email`).
- [ ] Validar utilitários de hash existentes em `backend/src/services/authService.ts`.

### Fase 1: Banco de Dados e Backend
- [ ] **DB**: Estender `User` no `backend/prisma/schema.prisma` com `name` e `email`.
- [ ] **DB**: Executar `npx prisma migrate dev` para aplicar alterações no banco.
- [ ] **Backend**: Implementar `authService.register` chamando `hashPassword`.
- [ ] **Backend**: Criar `authController.register` e registrar rota em `backend/src/routes/auth.ts`.
- [ ] Propor commit: `feat(backend): implementação do endpoint de registro de usuário`

### Fase 2: Frontend
- [ ] Criar `RegisterForm.tsx` (baseado em `frontend/src/components/LoginForm.tsx`).
- [ ] Criar rota/tela de cadastro para navegação.
- [ ] Integrar formulário com a API de registro.
- [ ] Propor commit: `feat(frontend): tela e lógica de cadastro de usuário`

## Verificação e Testes
- [ ] Testes unitários para `authService.register`.
- [ ] Testes de integração para o fluxo completo (DB + API).
- [ ] Testes E2E: Login -> Navegar para Cadastro -> Preencher -> Redirecionar.
