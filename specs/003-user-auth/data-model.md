# Modelo de Dados: Autenticação de Usuário

## Entidade: User
Representa um usuário cadastrado no sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String | UUID, chave primária |
| email | String | Identificador único, obrigatório |
| password | String | Hash da senha, obrigatório |

## Validações
- Email deve seguir formato válido.
- Senha deve ter no mínimo 8 caracteres.

## Relacionamentos
- `User` 1:N `Task` (um usuário tem várias tarefas).
