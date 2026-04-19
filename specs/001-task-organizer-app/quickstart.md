# Quickstart: Task Organizer App

## Pré-requisitos

- Docker e Docker Compose instalados.
- Node.js v20+ (opcional para desenvolvimento local fora de containers).

## Configuração do Ambiente com Docker (Recomendado)

1. **Clonar o repositório**:
   ```bash
   git clone [url]
   cd introducao-spec-kit
   ```

2. **Variáveis de Ambiente**:
   O Docker Compose utilizará as variáveis padrão, mas você pode customizar criando um arquivo `.env` na raiz:
   ```env
   POSTGRES_USER=user
   POSTGRES_PASSWORD=password
   POSTGRES_DB=task_db
   DATABASE_URL="postgresql://user:password@db:5432/task_db?schema=public"
   ```

3. **Levantar o ambiente**:
   ```bash
   docker-compose up --build
   ```
   *Este comando construirá as imagens utilizando multi-stage build e iniciará o Frontend, Backend e PostgreSQL.*

4. **Rodar Migrações (Primeira execução)**:
   ```bash
   docker-compose exec backend npx prisma migrate dev --name init
   ```

## Testes

- **Testes Unitários/Integração (TDD)**:
  ```bash
  docker-compose exec backend npm run test
  ```
- **Testes E2E (Playwright)**:
  ```bash
  npm run test:e2e  # Requer Playwright instalado localmente ou container específico
  ```

## Visualização

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001/api/v1`
