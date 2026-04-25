# Especificação da Funcionalidade: Adicionar Horário e Duração à Tarefa

**Branch da Funcionalidade**: `feature/002-task-duration`  
**Criado em**: 2026-04-25  
**Status**: Rascunho  
**Entrada**: Descrição do usuário: "Como usuário do sistema, eu quero adicionar o horario de inicio e a duração da tarefa para obter uma melhor melhor organização das tarefas."

## Cenários de Usuário e Testes *(obrigatório)*

### História de Usuário 1 - Definição de Horário e Duração (Prioridade: P1)

Como usuário, quero especificar um horário de início e a duração para cada tarefa, para que eu possa planejar melhor meu dia dentro do calendário.

**Por que esta prioridade**: É a funcionalidade central solicitada, permitindo um agendamento mais preciso do que apenas a data.

**Teste Independente**: Pode ser testado criando uma tarefa definindo hora de início e duração, verificando se ela ocupa o bloco de tempo correto no calendário.

**Cenários de Aceitação**:

1. **Dado** que estou criando uma tarefa, **Quando** preencho "14:00" como horário de início e "1h30" como duração, **Então** a tarefa deve ser exibida no calendário começando às 14:00 e ocupando 90 minutos.
2. **Dado** uma tarefa existente com hora e duração, **Quando** edito o horário para "15:00", **Então** o bloco no calendário deve ser atualizado para refletir o novo horário mantendo a mesma duração.

---

### História de Usuário 2 - Validação de Conflitos (Prioridade: P2)

Como usuário, quero ser alertado caso eu agende uma tarefa em um horário que conflita com outra tarefa, para evitar sobreposição indesejada.

**Por que esta prioridade**: Garante a organização e evita erros de agendamento.

**Teste Independente**: Pode ser testado tentando criar uma tarefa que sobrepõe outra existente e verificando se o sistema impede ou alerta sobre o conflito.

**Cenários de Aceitação**:

1. **Dado** que já tenho uma tarefa das 14:00 às 15:00, **Quando** tento agendar outra tarefa das 14:30 às 15:30, **Então** o sistema deve exibir um aviso de conflito.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: O sistema DEVE permitir a definição de um horário de início para cada tarefa.
- **RF-002**: O sistema DEVE permitir a definição de uma duração para cada tarefa (em minutos ou horas).
- **RF-003**: O sistema DEVE validar e alertar sobre sobreposições de horários entre tarefas do mesmo dia.
- **RF-004**: O sistema DEVE persistir o horário de início e duração na entidade tarefa.

### Entidades Chave

- **Tarefa**: Adição dos atributos `startTime` (Time) e `durationMinutes` (Int).

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: 100% das tarefas com horário definido são exibidas corretamente no calendário.
- **CS-002**: O sistema deve detectar conflitos de agendamento em menos de 200ms após a tentativa de salvamento.
- **CS-003**: A duração das tarefas deve ser preservada corretamente após operações de arrastar e soltar.

## Suposições

- A duração será armazenada em minutos para simplificar o cálculo.
- O calendário assumirá um único fuso horário para todos os usuários conforme configuração global.
- O sistema não permitirá tarefas que terminam no dia seguinte sem divisão explícita.

## Clarifications
### Session 2026-04-25
- Q: Qual o formato de duração padrão? → A: Minutos (inteiro) para maior flexibilidade.
