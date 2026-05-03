# Pesquisa Técnica: Gerenciamento de Perfil de Usuário

## Pesquisas e Decisões

### Decisão 1: Fluxo de Troca de Senha
- **O que foi escolhido**: Implementar um endpoint PUT/PATCH que recebe `currentPassword`, `newPassword` e `confirmPassword`.
- **Racional**: Segurança padrão exige a senha atual para prevenir que uma sessão aberta em um computador compartilhado seja usada para sequestrar a conta. O `bcrypt.compare` será usado para validar a senha atual.
- **Alternativas consideradas**: Troca de senha sem a senha atual (rejeitado por segurança).

### Decisão 2: Validação de E-mail e Unicidade
- **O que foi escolhido**: Confiar na restrição `@unique` do Prisma no banco de dados e tratar o erro `P2002` no backend.
- **Racional**: O banco de dados é a fonte da verdade definitiva para unicidade. Validar via SELECT antes do UPDATE pode sofrer de condições de corrida (race conditions).
- **Alternativas consideradas**: Validação apenas no frontend (insuficiente).

### Decisão 3: Feedback Visual no Frontend
- **O que foi escolhido**: Utilizar `react-hot-toast` para notificações de sucesso e erro.
- **Racional**: A biblioteca já está nas dependências do projeto e oferece uma experiência de usuário (UX) fluida e não intrusiva, conforme os princípios de UI/UX centrada no usuário.
- **Alternativas consideradas**: `alert()` nativo (rejeitado por UI pobre), criar um componente de alerta customizado (rejeitado por YAGNI dado que já existe o toast).

### Decisão 4: Persistência da Sessão
- **O que foi escolhido**: Manter o token JWT atual após a atualização do nome/email. No caso de troca de senha bem-sucedida, o usuário NÃO será deslogado imediatamente, a menos que o backend invalide tokens antigos (o que está fora do escopo inicial).
- **Racional**: KISS - manter o fluxo mais simples possível. Se o token contém o e-mail e este mudou, o frontend pode precisar de uma atualização do estado de autenticação ou re-login. **Decisão**: Após troca de e-mail ou senha, o sistema solicitará novo login para garantir a integridade da sessão.
