# Pesquisa: Melhoria da Visualização em Árvore Cronológica

**Feature**: Melhoria da Visualização em Árvore Cronológica
**Data**: 2026-04-26

## Decisões

### Decisão 1: Agrupamento no Frontend
* **Rationale**: O backend já fornece a lista de tarefas. Realizar o agrupamento por mês/dia no frontend permite maior flexibilidade para alternar entre os modos "Hierárquico" e "Cronológico" sem requisições adicionais ao servidor.
* **Alternatives considered**: Agrupamento no banco de dados (SQL GROUP BY), que dificultaria a manutenção da estrutura de objetos necessária para o modo hierárquico.

### Decisão 2: Uso de `date-fns` para Manipulação de Datas
* **Rationale**: `date-fns` é leve, modular e segue o paradigma funcional, facilitando o agrupamento de tarefas por `startOfMonth` e `startOfDay`.
* **Alternatives considered**: `Moment.js` (pesado/legado), `Day.js` (boa alternativa, mas `date-fns` é preferida pela imutabilidade).

### Decisão 3: Componentização de "Blocos Encadeados"
* **Rationale**: Criar componentes dedicados `DateBlock` e `MonthBlock` que encapsulam o estilo de "cartão" e gerenciam seu próprio estado de expansão. Isso garante a interface moderna e modular solicitada.
* **Alternatives considered**: Renderização em uma única lista plana com estilos condicionais (difícil de manter e menos performático).

### Decisão 4: Estratégia de Performance (Memoização)
* **Rationale**: Utilizar `React.memo` nos blocos de data e `useMemo` para a lógica de agrupamento. Como o volume pode chegar a 500 tarefas, evitar re-renders desnecessários é crucial para atingir a meta de < 300ms.
* **Alternatives considered**: Virtualização de lista (ex: `react-window`), considerada excessiva para 500 itens, mas que pode ser adotada no futuro se o volume crescer.

## Referências
- React Performance Optimization (Documentation)
- date-fns documentation (grouping helpers)
- Modern Card UI Patterns (Design Guidelines)
