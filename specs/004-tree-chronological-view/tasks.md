# Tarefas: Melhoria da Visualização em Árvore Cronológica

**Entrada**: Documentos de design de `specs/004-tree-chronological-view/`
**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório), research.md, data-model.md, contracts/api.md

**Testes**: TDD é MANDATÓRIO conforme a constituição do projeto. Toda implementação de lógica de agrupamento deve ser precedida por testes unitários.

## Fase 1: Setup

- [ ] T001 Instalar dependência date-fns em frontend/package.json
- [ ] T002 Configurar utilitários de data (locales) em frontend/src/lib/date.ts

## Fase 2: Fundacional (Lógica de Agrupamento)

- [ ] T003 Criar testes unitários para a função de agrupamento cronológico em frontend/tests/unit/taskGrouping.test.ts
- [ ] T004 Implementar função helper `groupTasksChronologically` em frontend/src/services/taskService.ts (ou novo arquivo de utils)

## Fase 3: História de Usuário 1 - Visualização Cronológica Agrupada [US1]

- [ ] T005 [P] [US1] Criar componente base `ChronologicalTreeView` em frontend/src/components/ChronologicalTreeView.tsx
- [ ] T006 [US1] Implementar a renderização da estrutura aninhada (Mês > Dia > Tarefa) no componente
- [ ] T007 [US1] Integrar componente na visualização principal da aplicação em frontend/src/App.tsx

## Fase 4: História de Usuário 2 - Interface de Blocos Encadeados [US2]

- [ ] T008 [P] [US2] Criar componente `DateBlock` com suporte a colapso em frontend/src/components/DateBlock.tsx
- [ ] T009 [US2] Implementar estilos modernos para os blocos (cards, sombras, bordas) em frontend/src/App.css
- [ ] T010 [US2] Adicionar animações suaves de transição para expandir/colapsar em frontend/src/App.css

## Fase 5: História de Usuário 3 - Alternância entre Modos [US3]

- [ ] T011 [US3] Adicionar estado `treeMode` ('hierarchical' | 'chronological') no frontend/src/App.tsx
- [ ] T012 [US3] Implementar botões de alternância na barra de navegação da aplicação
- [ ] T013 [US3] Garantir que a troca de modo ocorra sem recarregamento da página e em menos de 300ms

## Fase N: Polimento e Performance

- [ ] T014 Realizar profiling de renderização com 500 tarefas para validar CS-001
- [ ] T015 Ajustar memoização (`useMemo`, `React.memo`) se necessário para atingir metas de performance
- [ ] T016 Teste E2E cobrindo a jornada completa de alternância e visualização em tests/e2e/chronologicalView.spec.ts

---

## Dependências
- [US1] -> Depende de [Fase 2]
- [US2] -> Depende de [US1]
- [US3] -> Depende de [US1]

## Oportunidades de Paralelismo
- [P] T005 e T008 podem ser desenvolvidos de forma independente após a lógica da Fase 2 estar pronta.

## Estratégia de Implementação
- **MVP**: A Fase 3 (US1) entrega o valor principal. As fases 4 e 5 trazem o polimento visual e a flexibilidade de uso.
