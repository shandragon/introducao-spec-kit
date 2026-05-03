# Plano de Implementação: Gerenciamento de Perfil de Usuário

**Branch**: `feature/006-user-profile-management` | **Data**: 2026-05-03 | **Especificação**: [specs/006-user-profile-management/spec.md]
**Entrada**: Especificação da funcionalidade de `specs/006-user-profile-management/spec.md`

## Resumo

Implementar uma página de perfil para usuários autenticados, permitindo a edição de nome, e-mail e a troca segura de senha. O backend validará a senha atual via `bcrypt` e garantirá a unicidade do e-mail no PostgreSQL via Prisma. O frontend utilizará `react-hot-toast` para feedback visual imediato, mantendo a consistência de estilo da aplicação.

## Contexto Técnico

**Linguagem/Versão**: TypeScript / Node.js 20+  
**Principais Dependências**: React (Frontend), Express (Backend), Prisma ORM, bcrypt (Segurança), react-hot-toast (UI Feedback)  
**Armazenamento**: PostgreSQL  
**Testes**: Vitest (Unitário e Integração), Playwright (E2E)  
**Plataforma Alvo**: Web  
**Tipo de Projeto**: Aplicação Web (Frontend + Backend)  
**Metas de Performance**: Atualização de perfil em < 500ms (P95).  
**Restrições**: Proibição de `!important` no CSS; adesão estrita ao TDD; interface responsiva.  
**Escala/Escopo**: Funcionalidade disponível para todos os usuários cadastrados.

## Verificação da Constituição

*GATE: Deve passar antes da pesquisa da Fase 0. Verifique novamente após o design da Fase 1.*

1. **TDD Mandatório**: Todos os novos serviços e controladores terão cobertura de testes. `[PASS]`
2. **Simplicidade (KISS/YAGNI)**: Design de API enxuto e direto ao ponto. `[PASS]`
3. **Automação Spec Kit**: Todos os artefatos de design foram gerados. `[PASS]`
4. **UI/UX Centrada no Usuário**: Uso planejado de `react-hot-toast` para feedback consistente. `[PASS]`
5. **Excelência Técnica**: Contratos de API bem definidos e tipagem TypeScript. `[PASS]`
6. **Consistência de Estilo**: Layout de formulários seguirá o padrão das páginas existentes. `[PASS]`
7. **Documentação como Verdade**: Documentação atualizada em `specs/006-user-profile-management/`. `[PASS]`

## Estrutura do Projeto

### Documentação (desta funcionalidade)

```text
specs/006-user-profile-management/
├── plan.md              # Este arquivo
├── research.md          # Saída da Fase 0
├── data-model.md        # Saída da Fase 1
├── quickstart.md        # Saída da Fase 1
├── contracts/           # Saída da Fase 1
│   └── profile.md       # Contrato da API de perfil
└── tasks.md             # Saída da Fase 2 (comando /speckit.tasks)
```

### Código Fonte (raiz do repositório)

```text
backend/
├── src/
│   ├── controllers/     # profileController.ts
│   ├── routes/          # profile.ts (novas rotas)
│   └── services/        # profileService.ts
└── tests/
    ├── integration/
    └── unit/

frontend/
├── src/
│   ├── components/      # ProfileForm, PasswordChangeForm
│   ├── pages/           # ProfilePage
│   └── services/        # profileService.ts
└── tests/
```

**Decisão de Estrutura**: Opção 2 (Aplicação Web). Seguiremos a separação clara entre backend e frontend, expondo novos endpoints de API para o gerenciamento de perfil.

## Acompanhamento de Complexidade

> **Preencha APENAS se a Verificação da Constituição tiver violações que devem ser justificadas**

Nenhuma violação identificada.
