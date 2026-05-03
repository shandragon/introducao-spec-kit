# Contratos de API: Perfil de Usuário

## Endpoints

### 1. Obter Perfil
`GET /api/v1/profile`

**Autenticação**: Requer JWT (Bearer Token)

**Resposta (Sucesso - 200 OK)**:
```json
{
  "id": "uuid-string",
  "login": "username",
  "name": "João Silva",
  "email": "joao@example.com"
}
```

---

### 2. Atualizar Perfil
`PUT /api/v1/profile`

**Autenticação**: Requer JWT (Bearer Token)

**Corpo da Requisição**:
```json
{
  "name": "João Silva Alterado",
  "email": "novo-email@example.com"
}
```

**Resposta (Sucesso - 200 OK)**:
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "name": "João Silva Alterado",
    "email": "novo-email@example.com"
  }
}
```

**Erros Comuns**:
- `400 Bad Request`: E-mail inválido.
- `409 Conflict`: E-mail já está em uso.

---

### 3. Alterar Senha
`PUT /api/v1/profile/password`

**Autenticação**: Requer JWT (Bearer Token)

**Corpo da Requisição**:
```json
{
  "currentPassword": "senha-antiga-123",
  "newPassword": "nova-senha-456",
  "confirmPassword": "nova-senha-456"
}
```

**Resposta (Sucesso - 200 OK)**:
```json
{
  "message": "Senha alterada com sucesso. Por favor, faça login novamente."
}
```

**Erros Comuns**:
- `401 Unauthorized`: Senha atual incorreta.
- `400 Bad Request`: Senhas não coincidem ou nova senha não atende aos requisitos.
