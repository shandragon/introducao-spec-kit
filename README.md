# Task Organizer App

Aplicação web para gestão de tarefas com foco em organização temporal e hierárquica. O sistema permite a visualização de tarefas em calendário, árvore e listas individuais, com suporte a sub-tarefas e reagendamento inteligente via drag-and-drop.

## 🚀 Tecnologias e Stack Técnica

O projeto utiliza uma stack moderna focada em produtividade, tipagem forte e performance:

- **Frontend**: [React](https://reactjs.org/) com [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **UI & Interação**: [dnd-kit](https://dndkit.com/) (Drag-and-Drop) e [FullCalendar](https://fullcalendar.io/)
- **Containerização**: [Docker](https://www.docker.com/) com Multi-stage builds
- **Testes**: [Vitest](https://vitest.dev/) (Unit/Integration) e [Playwright](https://playwright.dev/) (E2E)

## 🏗️ Arquitetura e Princípios

Este projeto é guiado pela **Constituição Spec Kit**, seguindo rigorosamente:
1. **TDD Mandatório**: O desenvolvimento é orientado a testes (Red-Green-Refactor).
2. **KISS/YAGNI**: Foco na simplicidade e no essencial para o MVP.
3. **Deslocamento Relativo**: Reagendar uma tarefa pai propaga o deslocamento temporal para todas as suas filhas automaticamente.
4. **Gitflow**: Fluxo de trabalho baseado em branches de feature (`feature/[ID]-[nome]`).
5. **Semantic Commits**: Mensagens de commit seguindo o padrão Conventional Commits.

## 🛠️ Como Executar

A forma recomendada de executar o projeto é utilizando o Docker para garantir isolamento e paridade entre ambientes.

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo

1. **Configurar Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto (ou use os valores padrão do `docker-compose.yml`):
   ```env
   POSTGRES_USER=user
   POSTGRES_PASSWORD=password
   POSTGRES_DB=task_db
   DATABASE_URL="postgresql://user:password@db:5432/task_db?schema=public"
   ```

2. **Subir os Containers**:
   ```bash
   docker-compose up --build
   ```
   *Este comando constrói as imagens utilizando multi-stage build para otimização e inicia o Frontend, Backend e o Banco de Dados.*

3. **Executar Migrações do Banco**:
   ```bash
   docker-compose exec backend npx prisma migrate dev --name init
   ```

### Acesso
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001/api/v1`

## 🧪 Testes e Qualidade

Para garantir a integridade conforme a constituição do projeto:

- **Executar Testes Unitários/Integração**:
  ```bash
  docker-compose exec backend npm run test
  ```
- **Executar Testes E2E**:
  ```bash
  npm run test:e2e
  ```

## 📂 Estrutura do Projeto

```text
├── backend/             # Node.js + Express + Prisma (Multi-stage Docker)
├── frontend/            # React + TypeScript (Multi-stage Docker)
├── specs/               # Especificações, Planos e Documentação Técnica
├── docker-compose.yml   # Orquestração de serviços
└── README.md            # Este arquivo
```

---
*Este projeto foi gerado e é mantido seguindo os padrões do Spec Kit.*
