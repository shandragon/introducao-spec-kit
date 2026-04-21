# Especificação da Funcionalidade: [NOME DA FUNCIONALIDADE]

**Branch da Funcionalidade**: `feature/[###-nome-da-funcionalidade]`  
**Criado em**: [DATA]  
**Status**: Rascunho  
**Entrada**: Descrição do usuário: "$ARGUMENTS"

## Cenários de Usuário e Testes *(obrigatório)*

<!--
  IMPORTANTE: As histórias de usuário devem ser PRIORIZADAS como jornadas de usuário ordenadas por importância.
  Cada história/jornada de usuário deve ser TESTÁVEL INDEPENDENTEMENTE - o que significa que, se você implementar apenas UMA delas,
  você ainda deve ter um MVP (Produto Mínimo Viável) viável que entregue valor.
  
  Atribua prioridades (P1, P2, P3, etc.) para cada história, onde P1 é a mais crítica.
  Pense em cada história como uma fatia independente de funcionalidade que pode ser:
  - Desenvolvida independentemente
  - Testada independentemente
  - Implantada independentemente
  - Demonstrada aos usuários independentemente
-->

### História de Usuário 1 - [Título Curto] (Prioridade: P1)

[Descreva esta jornada de usuário em linguagem simples]

**Por que esta prioridade**: [Explique o valor e por que ela tem este nível de prioridade]

**Teste Independente**: [Descreva como isso pode ser testado independentemente - ex: "Pode ser totalmente testado por [ação específica] e entrega [valor específico]"]

**Cenários de Aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]
2. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

### História de Usuário 2 - [Título Curto] (Prioridade: P2)

[Descreva esta jornada de usuário em linguagem simples]

**Por que esta prioridade**: [Explique o valor e por que ela tem este nível de prioridade]

**Teste Independente**: [Descreva como isso pode ser testado independentemente]

**Cenários de Aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

### História de Usuário 3 - [Título Curto] (Prioridade: P3)

[Descreva esta jornada de usuário em linguagem simples]

**Por que esta prioridade**: [Explique o valor e por que ela tem este nível de prioridade]

**Teste Independente**: [Descreva como isso pode ser testado independentemente]

**Cenários de Aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

[Adicione mais histórias de usuário conforme necessário, cada uma com uma prioridade atribuída]

### Casos de Borda

<!--
  AÇÃO REQUERIDA: O conteúdo nesta seção representa espaços reservados.
  Preencha-os com os casos de borda corretos.
-->

- O que acontece quando [condição de limite]?
- Como o sistema lida com [cenário de erro]?

## Requisitos *(obrigatório)*

<!--
  AÇÃO REQUERIDA: O conteúdo nesta seção representa espaços reservados.
  Preencha-os com os requisitos funcionais corretos.
-->

### Requisitos Funcionais

- **RF-001**: O sistema DEVE [capacidade específica, ex: "permitir que os usuários criem contas"]
- **RF-002**: O sistema DEVE [capacidade específica, ex: "validar endereços de e-mail"]  
- **RF-003**: Os usuários DEVEM ser capazes de [interação chave, ex: "redefinir sua senha"]
- **RF-004**: O sistema DEVE [requisito de dados, ex: "persistir as preferências do usuário"]
- **RF-005**: O sistema DEVE [comportamento, ex: "registrar todos os eventos de segurança"]

*Exemplo de marcação de requisitos obscuros:*

- **RF-006**: O sistema DEVE autenticar usuários via [PRECISA DE ESCLARECIMENTO: método de autenticação não especificado - e-mail/senha, SSO, OAuth?]
- **RF-007**: O sistema DEVE reter os dados do usuário por [PRECISA DE ESCLARECIMENTO: período de retenção não especificado]

### Entidades Chave *(inclua se a funcionalidade envolver dados)*

- **[Entidade 1]**: [O que ela representa, atributos principais sem implementação]
- **[Entidade 2]**: [O que ela representa, relacionamentos com outras entidades]

## Critérios de Sucesso *(obrigatório)*

<!--
  AÇÃO REQUERIDA: Defina critérios de sucesso mensuráveis.
  Estes devem ser independentes de tecnologia e mensuráveis.
-->

### Resultados Mensuráveis

- **CS-001**: [Métrica mensurável, ex: "Usuários podem concluir a criação de conta em menos de 2 minutos"]
- **CS-002**: [Métrica mensurável, ex: "O sistema lida com 1000 usuários simultâneos sem degradação"]
- **CS-003**: [Métrica de satisfação do usuário, ex: "90% dos usuários concluem com sucesso a tarefa principal na primeira tentativa"]
- **CS-004**: [Métrica de negócio, ex: "Reduzir os tickets de suporte relacionados a [X] em 50%"]

## Suposições

<!--
  AÇÃO REQUERIDA: O conteúdo nesta seção representa espaços reservados.
  Preencha-os com as suposições corretas baseadas em padrões razoáveis
  escolhidos quando a descrição da funcionalidade não especificou certos detalhes.
-->

- [Suposição sobre usuários alvo, ex: "Os usuários possuem conectividade estável com a internet"]
- [Suposição sobre limites de escopo, ex: "O suporte móvel está fora do escopo da v1"]
- [Suposição sobre dados/ambiente, ex: "O sistema de autenticação existente será reutilizado"]
- [Dependência de sistema/serviço existente, ex: "Requer acesso à API de perfil de usuário existente"]
