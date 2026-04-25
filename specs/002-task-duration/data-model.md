# Data Model: Adicionar Horário e Duração à Tarefa

## Entidades Atualizadas

### Task (Tarefa)

A entidade `Task` será estendida para suportar o agendamento de horário e a duração.

| Field | Type | Description | Validations |
|-------|------|-------------|-------------|
| `startTime` | DateTime | Horário de início | Default: 09:00 (se não informado) |
| `durationMinutes` | Int | Duração em minutos | Default: 60 |

## Regras de Negócio de Dados

- A `startTime` será armazenada considerando o fuso horário da aplicação (UTC padrão).
- Conflitos de agendamento serão calculados via:
  - `Task A` conflita com `Task B` se `A.startTime < B.endTime` E `A.endTime > B.startTime`
  - Onde `endTime = startTime + durationMinutes`
