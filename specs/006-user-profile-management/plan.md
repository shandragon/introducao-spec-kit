# Plano de Implementação: [FUNCIONALIDADE]

**Branch**: `feature/[###-nome-da-funcionalidade]` | **Data**: [DATA] | **Especificação**: [link]
**Entrada**: Especificação da funcionalidade de `/specs/[###-nome-da-funcionalidade]/spec.md`

**Nota**: Este template é preenchido pelo comando `/speckit.plan`. Veja `.specify/templates/plan-template.md` para o fluxo de execução.

## Resumo

[Extrair da especificação da funcionalidade: requisito principal + abordagem técnica da pesquisa]

## Contexto Técnico

<!--
  AÇÃO REQUERIDA: Substitua o conteúdo desta seção com os detalhes técnicos
  para o projeto. A estrutura aqui é apresentada em caráter consultivo para guiar
  o processo de iteração.
-->

**Linguagem/Versão**: [ex: Python 3.11, Swift 5.9, Rust 1.75 ou PRECISA DE ESCLARECIMENTO]  
**Principais Dependências**: [ex: FastAPI, UIKit, LLVM ou PRECISA DE ESCLARECIMENTO]  
**Armazenamento**: [se aplicável, ex: PostgreSQL, CoreData, arquivos ou N/A]  
**Testes**: [ex: pytest, XCTest, cargo test ou PRECISA DE ESCLARECIMENTO]  
**Plataforma Alvo**: [ex: servidor Linux, iOS 15+, WASM ou PRECISA DE ESCLARECIMENTO]
**Tipo de Projeto**: [ex: biblioteca/cli/web-service/app-mobile/compilador/app-desktop ou PRECISA DE ESCLARECIMENTO]  
**Metas de Performance**: [específico do domínio, ex: 1000 req/s, 10k linhas/seg, 60 fps ou PRECISA DE ESCLARECIMENTO]  
**Restrições**: [específico do domínio, ex: <200ms p95, <100MB memória, capaz de operar offline ou PRECISA DE ESCLARECIMENTO]  
**Escala/Escopo**: [específico do domínio, ex: 10k usuários, 1M LOC, 50 telas ou PRECISA DE ESCLARECIMENTO]

## Verificação da Constituição

*GATE: Deve passar antes da pesquisa da Fase 0. Verifique novamente após o design da Fase 1.*

[Portões determinados com base no arquivo da constituição]

## Estrutura do Projeto

### Documentação (desta funcionalidade)

```text
specs/[###-funcionalidade]/
├── plan.md              # Este arquivo (saída do comando /speckit.plan)
├── research.md          # Saída da Fase 0 (comando /speckit.plan)
├── data-model.md        # Saída da Fase 1 (comando /speckit.plan)
├── quickstart.md        # Saída da Fase 1 (comando /speckit.plan)
├── contracts/           # Saída da Fase 1 (comando /speckit.plan)
└── tasks.md             # Saída da Fase 2 (comando /speckit.tasks - NÃO criado pelo /speckit.plan)
```

### Código Fonte (raiz do repositório)
<!--
  AÇÃO REQUERIDA: Substitua a árvore de espaços reservados abaixo pelo layout concreto
  para esta funcionalidade. Exclua as opções não utilizadas e expanda a estrutura escolhida com
  caminhos reais (ex: apps/admin, packages/something). O plano entregue não deve
  incluir os rótulos de Opção.
-->

```text
# [REMOVER SE NÃO UTILIZADO] Opção 1: Projeto único (PADRÃO)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVER SE NÃO UTILIZADO] Opção 2: Aplicação Web (quando "frontend" + "backend" detectados)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVER SE NÃO UTILIZADO] Opção 3: Mobile + API (quando "iOS/Android" detectados)
api/
└── [mesmo que o backend acima]

ios/ ou android/
└── [estrutura específica da plataforma: módulos de funcionalidade, fluxos de UI, testes de plataforma]
```

**Decisão de Estrutura**: [Documentar a estrutura selecionada e referenciar os
diretórios reais capturados acima]

## Acompanhamento de Complexidade

> **Preencha APENAS se a Verificação da Constituição tiver violações que devem ser justificadas**

| Violação | Por que é necessária | Alternativa simples rejeitada porque |
|-----------|------------|-------------------------------------|
| [ex: 4º projeto] | [necessidade atual] | [por que 3 projetos são insuficientes] |
| [ex: Padrão Repository] | [problema específico] | [por que o acesso direto ao BD é insuficiente] |
