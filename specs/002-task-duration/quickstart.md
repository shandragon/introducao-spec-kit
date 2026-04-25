# Quickstart: Adicionar Horário e Duração à Tarefa

## Agendamento de Tarefa

Para agendar uma tarefa com horário e duração, envie o seguinte payload para `POST /api/v1/tasks`:

```json
{
  "title": "Nova Tarefa",
  "date": "2026-04-26T00:00:00.000Z",
  "startTime": "2026-04-26T14:00:00.000Z",
  "durationMinutes": 90
}
```

## Validação

O sistema validará o conflito automaticamente. Em caso de sobreposição, o endpoint retornará `409 Conflict`.
