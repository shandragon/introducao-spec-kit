# Modelo de Dados: Gerenciamento de Perfil de Usuário

## Entidades e Atributos

### User (Existente)

| Atributo | Tipo | Descrição | Regras de Validação |
|----------|------|-----------|----------------------|
| name | String? | Nome de exibição do usuário | Máximo 255 caracteres |
| email | String? | Endereço de e-mail | Formato válido, Único no sistema |
| password | String | Hash da senha (bcrypt) | Mínimo 8 caracteres (na entrada), deve conter letras e números |

## Relacionamentos

- **User** 1 : N **Task** (Inalterado)

## Transições de Estado e Validações

### Atualização de Perfil (Nome/E-mail)
- O e-mail deve ser validado no formato regex.
- O sistema deve verificar a unicidade do e-mail no banco de dados.

### Troca de Senha
- A senha atual enviada deve coincidir com o hash armazenado (`bcrypt.compare`).
- A nova senha deve ser diferente da atual.
- A nova senha e a confirmação devem ser idênticas.
