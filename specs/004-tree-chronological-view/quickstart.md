# Quickstart: Melhoria da Visualização em Árvore Cronológica

## Cenários de Teste

### Cenário 1: Agrupamento Cronológico Básico
1. Criar tarefas para 10 de Janeiro e 15 de Fevereiro.
2. Acessar a visualização de Árvore.
3. Ativar o modo "Cronológico".
4. Validar se aparecem dois blocos de mês ("Janeiro" e "Fevereiro").
5. Validar se, ao expandir "Janeiro", aparece o bloco "Dia 10".

### Cenário 2: Alternância de Modos
1. Criar uma tarefa pai e uma tarefa filha no mesmo dia.
2. No modo "Hierárquico", validar a indentação pai/filha.
3. No modo "Cronológico", validar se ambas aparecem dentro do bloco do dia (conforme decisão de design).

### Cenário 3: Performance
1. Injetar 500 tarefas via console ou script de teste.
2. Medir o tempo de troca de aba para a Árvore Cronológica.
3. Confirmar que a renderização ocorre em < 300ms.
