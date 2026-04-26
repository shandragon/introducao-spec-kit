# Modelo de Dados: Melhoria da Visualização em Árvore Cronológica

Esta funcionalidade não requer alterações no banco de dados (PostgreSQL/Prisma). Ela utiliza o modelo de `Tarefa` existente e introduz estruturas de dados virtuais no frontend para o agrupamento cronológico.

## Entidades Virtuais (Frontend)

### ChronologicalGroup
Representa um agrupamento de tarefas por período.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| label | String | Nome do mês (ex: "Janeiro"), Dia (ex: "15 de Maio") ou "Sem Data" |
| tasks | Task[] | Lista de tarefas pertencentes a este grupo (mantendo hierarquia pai/filha se houver) |
| subGroups | ChronologicalGroup[] | Sub-agrupamentos (ex: dias dentro de um mês) |

## Lógica de Agrupamento
1. **Nível 1 (Mês)**: Agrupado por `startOfMonth(task.startTime)`.
2. **Nível 2 (Dia)**: Agrupado por `startOfDay(task.startTime)`.
3. **Casos Especiais**: Tarefas sem `startTime` definida são agrupadas em um bloco "Sem Data" ao final da lista.
4. **Hierarquia**: Dentro de cada dia, as relações pai/filho originais devem ser preservadas visualmente através de aninhamento.
5. **Ordenação**: Todos os níveis temporais são ordenados cronologicamente de forma crescente com base no `startTime`.
