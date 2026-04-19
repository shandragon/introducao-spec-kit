# Tasks: Task Organizer App

**Input**: Design documents from `specs/001-task-organizer-app/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/api.md

**Tests**: TDD is MANDATORY as per project constitution. All implementation tasks must be preceded by failing tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`, `tests/`
- Docker orchestration at repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and containerization setup

- [x] T001 Create project structure (backend, frontend, shared)
- [x] T002 [P] Setup backend Dockerfile with multi-stage build in backend/Dockerfile
- [x] T003 [P] Setup frontend Dockerfile with multi-stage build in frontend/Dockerfile
- [x] T004 [P] Setup docker-compose.yml for backend, frontend, and postgres at root
- [x] T005 [P] Initialize Node.js project and install dependencies (express, prisma, vitest) in backend/package.json
- [x] T006 [P] Initialize React project and install dependencies (dnd-kit, fullcalendar, vitest) in frontend/package.json
- [x] T007 [P] Configure Playwright for E2E tests in tests/e2e/playwright.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and database setup

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Define Prisma schema for Task entity in backend/prisma/schema.prisma
- [x] T009 Setup shared TypeScript types in shared/types.ts
- [x] T010 Implement base Express server with error handling in backend/src/index.ts
- [x] T011 Configure Prisma client and database connection in backend/src/lib/prisma.ts

**Checkpoint**: Foundation ready - containers running and database connected

---

## Phase 3: User Story 1 - Gestão de Tarefas e Calendário (Priority: P1) 🎯 MVP

**Goal**: Calendar view with task creation and basic drag-and-drop rescheduling

**Independent Test**: Create a task, verify it appears in the calendar, drag it to another day, and verify the date update persists.

### Tests for User Story 1 (MANDATORY TDD) ⚠️

- [x] T012 [P] [US1] Unit test for task creation and listing in backend/tests/unit/taskService.test.ts
- [x] T013 [P] [US1] Integration test for POST /tasks in backend/tests/integration/tasks.test.ts
- [x] T014 [P] [US1] Integration test for PATCH /tasks/:id (date update) in backend/tests/integration/tasks.test.ts

### Implementation for User Story 1

- [x] T015 [US1] Implement Task service (Create, List, UpdateDate) in backend/src/services/taskService.ts
- [x] T016 [US1] Implement Task controller and routes in backend/src/controllers/taskController.ts
- [x] T017 [P] [US1] Create Calendar component using FullCalendar in frontend/src/components/Calendar.tsx
- [x] T018 [US1] Implement API service for tasks in frontend/src/services/taskService.ts
- [x] T019 [US1] Implement Drag-and-Drop rescheduling logic in frontend/src/hooks/useTaskDragDrop.ts
- [ ] T020 [US1] E2E test for task creation and calendar movement in tests/e2e/calendar.spec.ts

**Checkpoint**: User Story 1 is functional - Tasks can be managed via Calendar

---

## Phase 4: User Story 2 - Estrutura Hierárquica de Tarefas (Priority: P2)

**Goal**: Parent/Child task relationships, Tree View, and recursive date displacement

**Independent Test**: Create a sub-task, verify it appears under the parent in Tree View. Move parent and verify sub-tasks move accordingly.

### Tests for User Story 2 (MANDATORY TDD) ⚠️

- [x] T021 [P] [US2] Unit test for recursive date displacement logic in backend/tests/unit/taskService.test.ts
- [x] T022 [P] [US2] Integration test for creating tasks with parentId in backend/tests/integration/tasks.test.ts

### Implementation for User Story 2

- [x] T023 [US2] Update Task service to handle parentId and recursive displacement in backend/src/services/taskService.ts
- [x] T024 [P] [US2] Create TreeView component in frontend/src/components/TreeView.tsx
- [x] T025 [US2] Implement hierarchical rendering in frontend/src/components/TreeView.tsx
- [ ] T026 [US2] E2E test for hierarchy management and recursive D&D in tests/e2e/hierarchy.spec.ts

**Checkpoint**: User Story 2 is functional - Hierarchical tasks and Tree View are ready

---

## Phase 5: User Story 3 - Controle de Status e Visualização Individual (Priority: P3)

**Goal**: Status lifecycle management and detailed task view

**Independent Test**: Click a task to see details, change status, and verify it updates in all views.

### Tests for User Story 3 (MANDATORY TDD) ⚠️

- [x] T027 [P] [US3] Unit test for status transition logic in backend/tests/unit/taskService.test.ts
- [x] T028 [P] [US3] Integration test for status update endpoint in backend/tests/integration/tasks.test.ts

### Implementation for User Story 3

- [x] T029 [P] [US3] Create TaskDetail component in frontend/src/components/TaskDetail.tsx
- [x] T030 [US3] Implement status update logic and UI feedback in frontend/src/components/TaskDetail.tsx
- [ ] T031 [US3] E2E test for status transitions and detail view in tests/e2e/taskDetails.spec.ts

**Checkpoint**: User Story 3 is functional - Full task lifecycle and details available

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and documentation

- [ ] T032 [P] Update documentation and README.md with container usage examples
- [ ] T033 [P] Perform code cleanup and refactoring in backend/ and frontend/
- [ ] T034 Validate all success criteria (SC-001 to SC-004) in production-like containers

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)** -> **Foundational (Phase 2)**
2. **Foundational (Phase 2)** -> **User Story 1 (Phase 3)**
3. **User Story 1** can be followed by **User Story 2** and **User Story 3**.

### Parallel Opportunities

- Dockerfiles (T002, T003) and Project Init (T005, T006) can run in parallel.
- Within each story, backend tests (T012, T013, T014) can often run in parallel if they use different routes/logic.
- Frontend components (T017, T024, T029) can be scaffolded in parallel.

---

## Implementation Strategy

### MVP First (User Story 1)

Focus on getting the Calendar and Task creation running in Docker. This delivers the core value of temporal organization.

### Incremental Delivery

1. **Foundation**: Database and API scaffolding.
2. **US1**: Core Calendar functionality (MVP).
3. **US2**: Adds complexity with hierarchy and recursive D&D.
4. **US3**: Completes the UX with status management and details.

---

## Notes

- All implementation MUST follow TDD (Tests fail first).
- Use `dnd-kit` and `FullCalendar` as decided in research.md.
- Ensure Docker multi-stage builds are used for optimized images.
