# Contratos de API: Autenticação

## Login
`POST /api/v1/auth/login`
- **Request**: `{ email: string, password: string }`
- **Response**: `{ token: string, user: { id: string, email: string } }`

## Logout
`POST /api/v1/auth/logout`
- **Request**: (Nenhum)
- **Response**: `{ success: boolean }`
