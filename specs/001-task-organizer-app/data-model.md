# Data Model: Task Organizer App

## Entities

### Task (Tarefa)

Representa o núcleo do sistema. Utiliza uma relação auto-referenciada para suportar a hierarquia.

| Field | Type | Description | Validations |
|-------|------|-------------|-------------|
| `id` | UUID | Identificador único | - |
| `title` | String | Título da tarefa | Not empty, max 255 chars |
| `description` | Text | Detalhes da tarefa | Optional |
| `date` | DateTime | Data de agendamento | Required for calendar view |
| `status` | Enum | [PENDENTE, EM_PLANEJAMENTO, EM_EXECUCAO, CONCLUIDA] | Default: PENDENTE |
| `parentId` | UUID | ID da tarefa pai | Must exist if provided |
| `createdAt` | DateTime | Data de criação | - |
| `updatedAt` | DateTime | Data da última atualização | - |

## Relationships

- **Parent-Children**: Uma `Task` pode ter opcionalmente um `parentId` (referenciando outra `Task`). Uma `Task` pai pode possuir múltiplas `Task` filhas.
- **Cascading**: A exclusão de uma tarefa pai deve resultar na exclusão em cascata de todas as suas tarefas filhas (ou sua dissociação, dependendo da regra de negócio - aqui adotaremos exclusão para manter a árvore limpa no MVP).

## State Transitions

- Qualquer tarefa pode transitar entre os status definidos.
- **Regra de Conclusão**: Uma tarefa pai só pode ser marcada como `CONCLUIDA` se todas as suas tarefas filhas estiverem `CONCLUIDA`? (Otimização para o futuro, não obrigatório no MVP).
