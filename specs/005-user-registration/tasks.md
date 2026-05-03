# Tarefas de Implementação: Cadastro de Usuário

## Visão Geral
Este documento lista as tarefas necessárias para implementar a funcionalidade de cadastro de usuário. As tarefas estão organizadas por fases, seguindo as histórias de usuário definidas.

## Fase 1: Setup
- [ ] T001 Criar diretório da funcionalidade em `specs/005-user-registration/`
- [ ] T002 Inicializar git branch `feature/005-user-registration`

## Fase 2: Foundational
- [x] T003 [P] Atualizar `backend/prisma/schema.prisma` com campos `name` e `email` na entidade `User`
- [x] T004 Executar migração de banco de dados rodando 'npm run prisma:migrate' no diretório backend/

## Fase 3: Cadastro de nova conta [US1]
*Objetivo: Permitir que novos usuários se cadastrem com sucesso.*

- [ ] T005 [P] [US1] Implementar `authService.register` em `backend/src/services/authService.ts`
- [ ] T006 [US1] Criar `authController.register` em `backend/src/controllers/authController.ts`
- [ ] T007 [US1] Registrar rota `POST /auth/register` em `backend/src/routes/auth.ts`
- [ ] T008 [P] [US1] Criar componente `RegisterForm.tsx` em `frontend/src/components/RegisterForm.tsx`
- [ ] T009 [US1] Criar tela de cadastro e integrar rota no frontend

## Fase 4: Validação de dados [US2]
*Objetivo: Garantir a integridade e segurança dos dados inseridos.*

- [ ] T010 [P] [US2] Adicionar validação de senha coincidente e campos obrigatórios no `RegisterForm.tsx`
- [ ] T011 [US2] Implementar tratamento de erros (ex: e-mail duplicado) no `authController.register` e no `RegisterForm.tsx`

## Fase 5: Polish & Cross-Cutting
- [ ] T012 Implementar testes unitários para `authService.register`
- [ ] T013 Implementar testes E2E (fluxo: Login -> Cadastro -> Login)
- [ ] T014 Atualizar documentação do projeto (README/agente)

## Estratégia de Implementação
1. **MVP**: Completar Fase 1, 2 e 3 (História 1).
2. **Incremental**: Adicionar validações da Fase 4.
3. **Qualidade**: Finalizar com a Fase 5.

## Dependências
- [US1] requer Fase 2 (Migração DB).
- [US2] requer [US1] para validação de erros de registro.
