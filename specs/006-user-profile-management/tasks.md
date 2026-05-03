# Tarefas: Gerenciamento de Perfil de Usuário

**Entrada**: Documentos de design de `specs/006-user-profile-management/`
**Pré-requisitos**: plan.md, spec.md, research.md, data-model.md, contracts/

## Fase 1: Configuração (Infraestrutura Compartilhada)

**Propósito**: Preparação da estrutura de arquivos e rotas base

- [ ] T001 Criar estrutura de diretórios para perfil conforme o plano em `backend/src/controllers/`, `backend/src/services/` e `frontend/src/pages/`
- [ ] T002 [P] Registrar novas rotas de perfil em `backend/src/routes/v1.ts`

---

## Fase 2: Fundacional (Pré-requisitos Bloqueantes)

**Propósito**: Infraestrutura central de dados e autenticação

- [ ] T003 Garantir que o modelo `User` em `backend/prisma/schema.prisma` está atualizado (campos `name` e `email` já existem conforme `data-model.md`)
- [ ] T004 [P] Criar middleware de extração de ID de usuário do JWT em `backend/src/lib/auth.ts` (se não existir de forma genérica)

**Checkpoint**: Fundação pronta - a implementação das histórias de usuário pode agora começar.

---

## Fase 3: História de Usuário 1 - Atualização de Perfil (Prioridade: P1) 🎯 MVP

**Objetivo**: Permitir que o usuário visualize e edite seu nome e e-mail.

**Teste Independente**: Acessar `/profile`, alterar dados, salvar e verificar persistência via API e Interface.

### Testes para História de Usuário 1 (TDD) ⚠️

- [ ] T005 [P] [US1] Criar teste unitário para `profileService.updateProfile` em `backend/tests/unit/profileService.test.ts`
- [ ] T006 [P] [US1] Criar teste de integração para `PUT /api/v1/profile` em `backend/tests/integration/profile.test.ts`
- [ ] T007 [P] [US1] Criar teste unitário para o componente `ProfileForm` em `frontend/tests/unit/ProfileForm.test.tsx`

### Implementação para História de Usuário 1

- [ ] T008 [US1] Implementar lógica de atualização de nome e e-mail em `backend/src/services/profileService.ts`
- [ ] T009 [US1] Implementar controlador `updateProfile` em `backend/src/controllers/profileController.ts`
- [ ] T010 [US1] Criar rotas de perfil em `backend/src/routes/profile.ts`
- [ ] T011 [US1] Implementar `profileService.ts` no frontend em `frontend/src/services/profileService.ts`
- [ ] T012 [US1] Criar componente `ProfileForm.tsx` em `frontend/src/components/ProfileForm.tsx`
- [ ] T013 [US1] Criar página `ProfilePage.tsx` em `frontend/src/pages/ProfilePage.tsx` e configurar rota no `App.tsx`

**Checkpoint**: História de Usuário 1 totalmente funcional.

---

## Fase 4: História de Usuário 2 - Troca de Senha Segura (Prioridade: P1)

**Objetivo**: Alterar a senha atual validando a senha antiga.

**Teste Independente**: Tentar trocar senha com senha antiga errada (deve falhar) e com correta (deve logar com a nova).

### Testes para História de Usuário 2 (TDD) ⚠️

- [ ] T014 [P] [US2] Criar teste unitário para `profileService.changePassword` em `backend/tests/unit/profilePassword.test.ts`
- [ ] T015 [P] [US2] Criar teste de integração para `PUT /api/v1/profile/password` em `backend/tests/integration/profilePassword.test.ts`

### Implementação para História de Usuário 2

- [ ] T016 [US2] Implementar lógica de validação de senha atual e hash da nova senha em `backend/src/services/profileService.ts`
- [ ] T017 [US2] Implementar controlador `changePassword` em `backend/src/controllers/profileController.ts`
- [ ] T018 [US2] Criar componente `PasswordChangeForm.tsx` em `frontend/src/components/PasswordChangeForm.tsx`
- [ ] T019 [US2] Integrar `PasswordChangeForm` na `ProfilePage.tsx`

**Checkpoint**: Histórias 1 e 2 funcionais.

---

## Fase 5: Polimento e Questões Transversais

**Propósito**: Feedback visual, segurança e documentação final

- [ ] T020 [P] Integrar `react-hot-toast` nos formulários de perfil para feedback de sucesso/erro
- [ ] T021 [P] Validar unicidade de e-mail e exibir erro amigável no frontend
- [ ] T022 [P] Adicionar validações de regex para e-mail e complexidade de senha no frontend
- [ ] T023 [P] Executar validação final do `quickstart.md`
- [ ] T024 [P] Criar teste E2E para a jornada completa de perfil em `tests/e2e/profile.spec.ts`

---

## Dependências e Ordem de Execução

- **Configuração e Fundacional**: Devem preceder as histórias de usuário.
- **US1 e US2**: Podem ser desenvolvidas em paralelo no backend, mas o frontend depende da conclusão da US1 (página base).
- **Testes**: Devem ser executados (e falhar) antes da implementação de cada service/controlador (TDD).

---

## Notas

- Utilize `bcrypt.compare` para validar a senha atual.
- Utilize `bcrypt.hash` para a nova senha.
- Garanta que a diretiva `!important` não seja usada no CSS dos formulários (Constituição XIV).
- Todas as mensagens de erro/sucesso devem ser em Português do Brasil (Constituição XII).
