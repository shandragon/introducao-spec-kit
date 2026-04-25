# Pesquisa: Autenticação de Usuário

**Feature**: Autenticação de Usuário
**Data**: 2026-04-25

## Decisões

### Decisão 1: JWT (JSON Web Tokens)
* **Rationale**: JWTs são stateless, escaláveis e funcionam bem com APIs RESTful (backend Node/Express e frontend React).
* **Alternatives considered**: Session Cookies (mais difíceis de escalar), OAuth2 (overhead desnecessário para MVP).

### Decisão 2: Proteção de Rotas
* **Frontend**: Utilizar um `AuthProvider` (React Context) para gerenciar o estado da sessão e redirecionar rotas privadas.
* **Backend**: Middleware de autenticação que valida o token JWT nas requisições.

## Referências
- Implementação padrão seguindo documentação de segurança de APIs.
