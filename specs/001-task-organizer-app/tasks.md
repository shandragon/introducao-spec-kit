# Tarefas: Aplicativo Organizador de Tarefas

**Entrada**: Documentos de design de `specs/001-task-organizer-app/`
**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório), research.md, data-model.md, contracts/api.md

**Testes**: TDD é MANDATÓRIO conforme a constituição do projeto. Todas as tarefas de implementação devem ser precedidas por testes que falham.

**Organização**: As tarefas são agrupadas por história de usuário para permitir a implementação e teste independentes.

## Formato: `[ID] [P?] [História] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[História]**: A qual história de usuário esta tarefa pertence (ex: US1, US2, US3)
- Inclua caminhos de arquivo exatos nas descrições

## Convenções de Caminho

- **App Web**: `backend/src/`, `frontend/src/`, `tests/`
- Orquestração Docker na raiz do repositório

## Fase 1: Configuração (Infraestrutura Compartilhada)

**Propósito**: Inicialização do projeto e configuração de containerização

- [x] T001 Criar estrutura do projeto (backend, frontend, shared)
- [x] T002 [P] Configurar Dockerfile do backend com build multi-stage em backend/Dockerfile
- [x] T003 [P] Configurar Dockerfile do frontend com build multi-stage em frontend/Dockerfile
- [x] T004 [P] Configurar docker-compose.yml para backend, frontend e postgres na raiz
- [x] T005 [P] Inicializar projeto Node.js e instalar dependências (express, prisma, vitest) em backend/package.json
- [x] T006 [P] Inicializar projeto React e instalar dependências (dnd-kit, fullcalendar, vitest) em frontend/package.json
- [x] T007 [P] Configurar Playwright para testes E2E em tests/e2e/playwright.config.ts

---

## Fase 2: Fundacional (Pré-requisitos Bloqueantes)

**Propósito**: Infraestrutura central e configuração do banco de dados

**⚠️ CRÍTICO**: Nenhum trabalho de história de usuário pode começar até que esta fase esteja concluída

- [x] T008 Definir esquema Prisma para a entidade Task em backend/prisma/schema.prisma
- [x] [X] T009 Configurar tipos TypeScript compartilhados em shared/types.ts
- [x] [X] T010 Implementar servidor Express base com tratamento de erros em backend/src/index.ts
- [x] [X] T011 Configurar cliente Prisma e conexão com o banco de dados em backend/src/lib/prisma.ts

**Checkpoint**: Fundação pronta - containers rodando e banco de dados conectado

---

## Fase 3: História de Usuário 1 - Gestão de Tarefas e Calendário (Prioridade: P1) 🎯 MVP

**Objetivo**: Visualização de calendário com criação de tarefas e reagendamento básico via drag-and-drop

**Teste Independente**: Criar uma tarefa, verificar se aparece no calendário, arrastá-la para outro dia e verificar se a atualização da data persiste.

### Testes para História de Usuário 1 (TDD MANDATÓRIO) ⚠️

- [x] T012 [P] [US1] Teste unitário para criação e listagem de tarefas em backend/tests/unit/taskService.test.ts
- [x] T013 [P] [US1] Teste de integração para POST /tasks em backend/tests/integration/tasks.test.ts
- [x] T014 [P] [US1] Teste de integração para PATCH /tasks/:id (atualização de data) em backend/tests/integration/tasks.test.ts
- [x] T036 [P] [US1] Teste de integração para DELETE /tasks/:id em backend/tests/integration/tasks.test.ts
- [x] T037 [P] [US1] Teste de integração para atualização de título e descrição em backend/tests/integration/tasks.test.ts

### Implementação para História de Usuário 1

- [x] T015 [US1] Implementar serviço de Tarefa (Criar, Listar, AtualizarData) em backend/src/services/taskService.ts
- [x] T038 [US1] Implementar exclusão e edição completa no TaskService e Controller em backend/src/services/taskService.ts
- [x] T016 [US1] Implementar controller e rotas de Tarefa em backend/src/controllers/taskController.ts
- [x] T017 [P] [US1] Criar componente de Calendário usando FullCalendar em frontend/src/components/Calendar.tsx
- [x] T018 [US1] Implementar serviço de API para tarefas em frontend/src/services/taskService.ts
- [x] T035 [US1] Criar componente de Formulário/Modal de Criação de Tarefa em frontend/src/components/TaskForm.tsx
- [x] T019 [US1] Implementar lógica de reagendamento Drag-and-Drop em frontend/src/hooks/useTaskDragDrop.ts
- [x] T020 [US1] Teste E2E para criação de tarefa e movimento no calendário em tests/e2e/calendar.spec.ts

**Checkpoint**: História de Usuário 1 funcional - Tarefas podem ser gerenciadas via Calendário

---

## Fase 4: História de Usuário 2 - Estrutura Hierárquica de Tarefas (Prioridade: P2)

**Objetivo**: Relações de tarefa pai/filha, Visualização em Árvore e deslocamento de data recursivo

**Teste Independente**: Criar uma sub-tarefa, verificar se aparece abaixo do pai na Visualização em Árvore. Mover o pai e verificar se as sub-tarefas movem-se proporcionalmente.

### Testes para História de Usuário 2 (TDD MANDATÓRIO) ⚠️

- [x] T021 [P] [US2] Teste unitário para lógica de deslocamento de data recursivo em backend/tests/unit/taskService.test.ts
- [x] T022 [P] [US2] Teste de integração para criação de tarefas com parentId em backend/tests/integration/tasks.test.ts
- [x] T039 [P] [US2] Teste de integração para validar suporte a 5 níveis de profundidade em backend/tests/integration/tasks.test.ts

### Implementação para História de Usuário 2

- [x] T023 [US2] Atualizar serviço de Tarefa para lidar com parentId e deslocamento recursivo em backend/src/services/taskService.ts
- [x] T024 [P] [US2] Criar componente TreeView em frontend/src/components/TreeView.tsx
- [x] T025 [US2] Implementar renderização hierárquica em frontend/src/components/TreeView.tsx
- [x] T026 [US2] Teste E2E para gestão de hierarquia e D&D recursivo em tests/e2e/hierarchy.spec.ts

**Checkpoint**: História de Usuário 2 funcional - Tarefas hierárquicas e Visualização em Árvore prontas

---

## Fase 5: História de Usuário 3 - Controle de Status e Visualização Individual (Detalhes) (Prioridade: P3)

**Objetivo**: Gestão do ciclo de vida de status e Visualização Individual (Detalhes) da tarefa

**Teste Independente**: Clicar em uma tarefa para ver detalhes na Visualização Individual, alterar o status e verificar se atualiza em todas as visualizações.

### Testes para História de Usuário 3 (TDD MANDATÓRIO) ⚠️

- [x] T027 [P] [US3] Teste unitário para lógica de transição de status em backend/tests/unit/taskService.test.ts
- [x] T028 [P] [US3] Teste de integração para endpoint de atualização de status em backend/tests/integration/tasks.test.ts

### Implementação para História de Usuário 3

- [x] T029 [P] [US3] Criar componente TaskDetail em frontend/src/components/TaskDetail.tsx
- [x] T030 [US3] Implementar lógica de atualização de status e feedback de UI em frontend/src/components/TaskDetail.tsx
- [x] T040 [US3] Implementar botão de exclusão e edição de campos de texto no TaskDetail em frontend/src/components/TaskDetail.tsx
- [x] T041 [US1] Integrar exclusão no serviço de API do frontend em frontend/src/services/taskService.ts
- [x] T031 [US3] Teste E2E para transições de status e visualização de detalhes em tests/e2e/taskDetails.spec.ts

**Checkpoint**: História de Usuário 3 funcional - Ciclo de vida completo e detalhes disponíveis

---

## Fase N: Polimento e Questões Transversais

**Propósito**: Refinamentos finais e documentação

- [x] T032 [P] Atualizar documentação e README.md com exemplos de uso dos containers
- [x] T033 [P] Realizar limpeza de código e refatoração em backend/ e frontend/
- [x] T034 Validar todos os critérios de sucesso (CS-001 a CS-004) em containers similares a produção

---

## Dependências e Ordem de Execução

### Dependências de Fase

1. **Configuração (Fase 1)** -> **Fundacional (Fase 2)**
2. **Fundacional (Fase 2)** -> **História de Usuário 1 (Fase 3)**
3. **História de Usuário 1** pode ser seguida pelas **Histórias de Usuário 2** e **3**.

### Oportunidades de Paralelismo

- Dockerfiles (T002, T003) e Init do Projeto (T005, T006) podem rodar em paralelo.
- Dentro de cada história, testes de backend podem rodar em paralelo se usarem rotas/lógicas diferentes.
- Componentes de frontend (T017, T024, T029) podem ser estruturados em paralelo.

---

## Estratégia de Implementação

### MVP Primeiro (História de Usuário 1)

Foco em colocar o Calendário e a Criação de Tarefas rodando no Docker. Isso entrega o valor central de organização temporal.

### Entrega Incremental

1. **Fundação**: Banco de dados e estrutura de API.
2. **US1**: Funcionalidade central de Calendário (MVP).
3. **US2**: Adiciona complexidade com hierarquia e D&D recursivo.
4. **US3**: Completa a UX com gestão de status e detalhes.

---

## Notas

- Todas as implementações DEVEM seguir TDD (Testes falham primeiro).
- Usar `dnd-kit` e `FullCalendar` conforme decidido em research.md.
- Garantir que builds multi-stage do Docker sejam usados para imagens otimizadas.
- **Bug Fix**: Corrigido deslocamento de data no calendário (off-by-one) em Calendar.tsx, TaskForm.tsx e App.tsx.
