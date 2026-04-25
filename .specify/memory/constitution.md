<!--
Sync Impact Report:
- Version change: 1.3.0 → 1.4.0
- List of modified principles:
  - None
- Added sections:
  - XIII. Consistência de Estilo no Frontend
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (No changes needed, generic gate)
  - ✅ .specify/templates/spec-template.md (No changes needed)
  - ✅ .specify/templates/tasks-template.md (No changes needed)
- Follow-up TODOs: None.
-->

# Introdução Spec Kit Constitution

## Core Principles

### I. Test-Driven Development (TDD) Mandatório
Toda funcionalidade deve ser precedida por testes automatizados. O ciclo Red-Green-Refactor é obrigatório. Nenhum código de produção deve ser escrito sem um teste que falhe primeiro. A validação do comportamento é o requisito primário para qualquer entrega.

### II. Simplicidade (KISS/YAGNI)
Priorizar a solução mais simples que resolve o problema. Evitar abstrações prematuras e funcionalidades não solicitadas (You Ain't Gonna Need It). O design deve ser emergente e evolutivo, guiado pelos testes.

### III. Automação e Padrões Spec Kit
Seguir rigorosamente as convenções de estrutura e workflow do Spec Kit. Utilizar os comandos `speckit.*` para manter a integridade do projeto. A consistência entre ferramentas e código é fundamental para a agilidade do desenvolvimento. Branches e commits devem seguir os padrões de Gitflow e Commits Semânticos definidos nesta constituição.

### IV. Documentação como Verdade
Manter planos, especificações e tarefas rigorosamente atualizados. A documentação no diretório `.specify/` e nas pastas de specs deve refletir fielmente o estado e a intenção do sistema em tempo real.

### V. Qualidade e Revisão
Todo código e artefato de design deve passar por validação automática e revisão de conformidade com os princípios desta constituição. A conformidade não é opcional; desvios devem ser explicitamente justificados e aprovados.

### VI. Excelência Técnica e Qualidade de Código
O código deve ser limpo, legível e seguir os princípios SOLID. Nomes de variáveis e funções devem ser autoexplicativos. Linting e formatação automática são obrigatórios para garantir consistência estilística e evitar dívidas técnicas.

### VII. UI/UX Centrada no Usuário
Interfaces devem ser intuitivas, responsivas e visualmente polidas. A acessibilidade é um requisito, não um recurso adicional. Toda interação deve fornecer feedback visual imediato e seguir padrões de design consistentes para reduzir a carga cognitiva do usuário.

### VIII. Performance e Eficiência
O sistema deve ser otimizado para baixa latência e consumo mínimo de recursos. Metas de performance devem ser definidas nos planos de implementação. Gargalos devem ser identificados via profiling e resolvidos antes da entrega final.

### IX. Estratégia Abrangente de Testes
Além do TDD para lógica de negócio, o projeto exige testes de integração para contratos de API e testes de ponta-a-ponta (E2E) para jornadas críticas de usuário. A cobertura de testes deve focar em caminhos de sucesso e cenários de erro.

### X. Fluxo de Trabalho Gitflow
O projeto adota o modelo Gitflow para gerenciamento de branches. As branches principais são `master` (produção) e `develop` (integração). Novas funcionalidades devem ser desenvolvidas em branches `feature/[ID]-[nome]`. Correções de bugs em produção usam `hotfix/*` e preparações de versão usam `release/*`. O ID deve ser o número sequencial da feature.

### XI. Mensagens de Commit Semântico
Todas as mensagens de commit devem seguir o padrão Conventional Commits. O formato obrigatório é `<tipo>(<escopo>): <descrição curta>`. Tipos permitidos: `feat` (nova funcionalidade), `fix` (correção de erro), `docs` (documentação), `style` (formatação), `refactor` (mudança de código sem alteração de comportamento), `test` (testes), `chore` (tarefas de manutenção/build).

### XII. Idioma Oficial (Português do Brasil)
O idioma oficial do projeto para toda a documentação, especificações, planos e comentários de alto nível é o Português do Brasil (PT-BR). Isso garante clareza e acessibilidade para a equipe principal. Termos técnicos em inglês podem ser mantidos quando forem padrão da indústria, mas a narrativa e a estrutura devem ser em português.

### XIII. Consistência de Estilo no Frontend
A interface deve manter um design uniforme em todas as telas. Elementos de UI, como botões, formulários e tipografia, devem seguir rigorosamente o mesmo padrão visual e comportamento em toda a aplicação. A consistência reduz a carga cognitiva do usuário e fortalece a identidade visual da aplicação.

## Restrições Técnicas

O projeto utiliza TypeScript/Node.js como stack base para ferramentas e automação. O versionamento de código deve seguir estritamente o fluxo de branches Gitflow (`feature/[ID]-[nome]`). As mensagens de commit devem ser semânticas conforme o padrão definido. Todas as dependências externas devem ser validadas quanto à segurança e licença antes da adoção.

## Processo de Emenda

Mudanças nesta constituição exigem uma análise de impacto em todos os templates e comandos do projeto. Alterações que quebrem fluxos existentes ou removam princípios fundamentais exigem incremento de versão MAJOR. Adições e refinamentos incrementam MINOR ou PATCH conforme a magnitude da mudança.

## Governance

Esta constituição é a autoridade máxima do projeto e prevalece sobre decisões técnicas ad-hoc. Todos os membros do projeto são responsáveis por garantir o cumprimento destes princípios. Desvios excepcionais devem ser documentados na seção "Complexity Tracking" dos planos de implementação, detalhando a justificativa e as alternativas consideradas.

**Version**: 1.4.0 | **Ratified**: 2026-04-19 | **Last Amended**: 2026-04-25
