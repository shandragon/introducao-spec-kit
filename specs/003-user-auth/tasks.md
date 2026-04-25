# Lista de Tarefas: Autenticação de Usuário

**Feature**: Autenticação de Usuário
**Branch**: `feature/003-user-auth`

## Fase 1: Setup

- [X] T001 Instalar dependências para JWT (jsonwebtoken, bcrypt) no backend/package.json
- [X] T001.1 Definir interface User em shared/types.ts

## Fase 2: Foundational

- [X] T002 Executar prisma migrate para registrar modelo User no backend/prisma/schema.prisma
- [X] T003 Criar serviço de autenticação com bcrypt em backend/src/services/authService.ts
- [X] T004 Criar middleware de autenticação JWT em backend/src/lib/auth.ts
- [X] T004.1 Implementar lógica de bloqueio de 3 tentativas em backend/src/services/authService.ts
- [X] T004.2 Configurar expiração do token JWT em backend/src/lib/auth.ts

## Fase 3: User Story 1 - Realizar Login [US1]

- [X] T005 [P] [US1] Criar endpoint de login em backend/src/controllers/authController.ts
- [X] T006 [US1] Registrar rotas de autenticação em backend/src/routes/auth.ts
- [X] T007 [US1] Criar componente de formulário de login em frontend/src/components/LoginForm.tsx
- [X] T008 [US1] Implementar AuthProvider no frontend/src/context/AuthContext.tsx

## Fase 4: User Story 2 - Sair do Sistema [US2]

- [X] T009 [US2] Criar endpoint de logout em backend/src/controllers/authController.ts
- [X] T010 [US2] Implementar botão de logout no frontend/src/components/LogoutButton.tsx

## Fase 5: Polish & Cross-Cutting

- [X] T011 Proteger rotas do frontend com PrivateRoute em frontend/src/components/PrivateRoute.tsx
- [X] T012 Integrar proteção de rotas nas rotas da aplicação em frontend/src/App.tsx

---

## Dependências
- [US1] (Login) -> Depende de [Setup/Foundational]
- [US2] (Logout) -> Depende de [US1]

## Exemplos de Execução Paralela
- [P] T005 (Login Endpoint) e T007 (Login UI) podem ser desenvolvidos paralelamente.

## Estratégia de Implementação
- **MVP**: Focar no fluxo de login (US1) antes do logout (US2).
