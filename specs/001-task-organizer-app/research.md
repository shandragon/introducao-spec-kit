# Research: Task Organizer App

## Decision 1: Bibliotecas de UI e Drag-and-Drop

- **Decision**: Utilizar `dnd-kit` para Drag-and-Drop e `FullCalendar` para a visualização de calendário.
- **Rationale**: 
    - `dnd-kit` é modular, leve e focado em acessibilidade, permitindo implementações customizadas de calendários e árvores.
    - `FullCalendar` (versão React) oferece uma robusta gestão de eventos por data, facilitando o SC-001.
- **Alternatives considered**: 
    - `react-beautiful-dnd`: Descontinuado.

## Decision 2: Persistência Hierárquica (Pai/Filha)

- **Decision**: Modelo **Adjacency List** com **Recursive Common Table Expressions (CTE)** no PostgreSQL.
- **Rationale**: 
    - Simplicidade (KISS): Fácil de implementar e manter. Prisma ORM suporta relações auto-referenciadas de forma nativa.
- **Alternatives considered**: 
    - **Closure Tables**.

## Decision 3: Estratégia de Containerização

- **Decision**: Utilizar **Docker** com **Multi-stage builds** e **Docker Compose**.
- **Rationale**: 
    - Separação de Responsabilidades: Frontend, Backend e DB em containers distintos.
    - Build Multi-stage: Garante imagens finais leves (produção) ao separar o ambiente de build do ambiente de execução.
    - Orquestração: Docker Compose simplifica o levantamento de todo o ambiente de desenvolvimento local.
- **Alternatives considered**: 
    - Execução nativa (sem containers): Mais rápido para setup inicial, mas propenso a problemas de "funciona na minha máquina".

## Decision 4: Estratégia de Testes TDD

- **Decision**: Vitest para Unit/Integration e Playwright para E2E.
- **Rationale**: 
    - Playwright é essencial para validar as interações complexas de Drag-and-Drop no ambiente containerizado.
