# Contratos de API: Melhoria da Visualização em Árvore Cronológica

Esta funcionalidade utiliza os endpoints de listagem de tarefas existentes. Não há novos endpoints no backend.

## Interface do Frontend (Helper Functions)

### `groupTasksChronologically(tasks: Task[]): ChronologicalGroup[]`
Lógica central de transformação da lista plana de tarefas em uma estrutura aninhada de Mês > Dia > Tarefa.

- **Entrada**: Array de objetos `Task`.
- **Saída**: Array de objetos `ChronologicalGroup`.

## Componentes de UI

### `ChronologicalTreeView`
Componente principal que alterna entre o estado de agrupamento.
- **Props**: `tasks: Task[]`, `mode: 'hierarchical' | 'chronological'`.

### `DateBlock`
Renderiza um bloco (mês ou dia) com suporte a colapso.
- **Props**: `label: string`, `children: ReactNode`, `isExpanded: boolean`.
