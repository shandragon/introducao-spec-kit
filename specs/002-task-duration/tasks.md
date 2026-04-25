# Tarefas: Adicionar Horário e Duração à Tarefa

**Entrada**: Documentos de design de `/specs/002-task-duration/`
**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório), research.md, data-model.md

**Testes**: TDD é MANDATÓRIO conforme a constituição do projeto. Todas as tarefas de implementação devem ser precedidas por testes que falham.

## Fase 1: Configuração

- [x] T001 Adicionar campos `startTime` e `durationMinutes` ao esquema Prisma em backend/prisma/schema.prisma
- [x] T002 Executar migração do banco de dados para aplicar novos campos

---

## Fase 2: Fundacional

- [x] T003 Atualizar tipos compartilhados em shared/types.ts para incluir `startTime` e `durationMinutes`

---

## Fase 3: História de Usuário 1 - Definição de Horário e Duração (Prioridade: P1)

**Objetivo**: Permitir que o usuário defina o horário de início e a duração da tarefa.

### Testes (TDD MANDATÓRIO) ⚠️

- [ ] T004 [P] [US1] Teste unitário para validação de formato de horário em backend/tests/unit/taskValidation.test.ts
- [ ] T005 [P] [US1] Teste de integração para criação de tarefa com hora e duração em backend/tests/integration/tasks.test.ts

### Implementação

- [ ] T006 [US1] Atualizar `taskService.createTask` para aceitar `startTime` e `durationMinutes` em backend/src/services/taskService.ts
- [ ] T007 [US1] Atualizar `taskController.createTask` para receber os novos campos em backend/src/controllers/taskController.ts
- [ ] T008 [US1] Atualizar `TaskForm` no frontend para incluir inputs de horário e duração em frontend/src/components/TaskForm.tsx
- [ ] T009 [US1] Atualizar `Calendar` no frontend para exibir eventos com horário e duração em frontend/src/components/Calendar.tsx

**Checkpoint**: Tarefas podem ser criadas com horário e duração.

---

## Fase 4: História de Usuário 2 - Validação de Conflitos (Prioridade: P2)

**Objetivo**: Impedir sobreposição de horários.

### Testes (TDD MANDATÓRIO) ⚠️

- [ ] T010 [P] [US2] Teste de integração para conflito de horários em backend/tests/integration/tasks.test.ts

### Implementação

- [ ] T011 [US2] Implementar lógica de detecção de conflitos no `taskService` em backend/src/services/taskService.ts
- [ ] T012 [US2] Atualizar controlador para retornar erro 409 em caso de conflito em backend/src/controllers/taskController.ts
- [ ] T013 [US2] Exibir alerta de conflito na UI do `TaskForm` ou calendário em frontend/src/components/TaskForm.tsx

**Checkpoint**: Conflitos de agendamento são validados no backend e exibidos na UI.

---

## Fase N: Polimento

- [ ] T014 [P] Validar critérios de sucesso CS-001 a CS-003

---

## Dependências e Ordem de Execução

- **US1** -> **US2** (Validação de conflitos depende de ter horários persistidos).

## Estratégia de Implementação

1. **Migração**: Atualizar esquema e DB primeiro.
2. **US1 (MVP)**: Implementar criação com novos campos e exibição no calendário.
3. **US2**: Adicionar lógica de validação de conflitos.
