# Modelo de Dados: Melhoria da Visualização em Árvore Cronológica

Esta funcionalidade não requer alterações no banco de dados (PostgreSQL/Prisma). Ela utiliza o modelo de `Tarefa` existente e introduz estruturas de dados virtuais no frontend para o agrupamento cronológico.

## Entidades Virtuais (Frontend)

### ChronologicalGroup
Representa um agrupamento de tarefas por período.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| label | String | Nome do mês (ex: "Janeiro") ou Dia (ex: "15 de Maio") |
| tasks | Task[] | Lista de tarefas pertencentes a este grupo |
| subGroups | ChronologicalGroup[] | Sub-agrupamentos (ex: dias dentro de um mês) |

## Lógica de Agrupamento
1. **Nível 1 (Mês)**: Agrupado por `startOfMonth(task.date)`.
2. **Nível 2 (Dia)**: Agrupado por `startOfDay(task.date)`.
3. **Ordenação**: Todos os níveis são ordenados cronologicamente de forma crescente.
