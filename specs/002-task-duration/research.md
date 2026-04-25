# Pesquisa: Adicionar Horário e Duração à Tarefa

## Decision 1: Representação de Tempo e Duração

- **Decision**: `startTime` (DateTime/String ISO) e `durationMinutes` (Integer).
- **Rationale**:
    - `startTime`: A maioria das bibliotecas de calendário (FullCalendar) e banco de dados (PostgreSQL) trabalham nativamente com ISO strings ou tipos `DateTime`.
    - `durationMinutes`: Inteiro é o formato mais simples e menos propenso a erros para cálculos de conflitos e manipulação de datas no front e no back.
- **Alternatives considered**:
    - `endTime`: Pode causar inconsistências se a duração mudar. Armazenar a duração é mais robusto para a regra de negócio de "deslocamento relativo".

## Decision 2: Validação de Conflitos (Backend)

- **Decision**: Validação lógica no `taskService` antes de persistir (`findMany` entre `startTime` e `startTime + durationMinutes`).
- **Rationale**: 
    - Garante a integridade dos dados no nível da aplicação.
    - Simples de implementar com Prisma.
- **Alternatives considered**:
    - Triggers de Banco de Dados: Mais complexos de manter e testar.

## Decision 3: UI de Edição de Horário

- **Decision**: Utilizar inputs nativos `<input type="time">` e `<input type="number">` (para minutos).
- **Rationale**: Segue o princípio KISS, provê usabilidade razoável em mobile/desktop sem adicionar dependências pesadas de bibliotecas de calendário/time-picker.
- **Alternatives considered**:
    - Bibliotecas externas como `react-datepicker` ou `timepicker` (podem aumentar desnecessariamente o bundle size).
