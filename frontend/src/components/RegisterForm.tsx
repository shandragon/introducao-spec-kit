import React, { useState } from 'react';

interface RegisterFormProps {
  onRegister: (name: string, email: string, login: string, password: string, confirmPassword: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    setError(null);
    onRegister(name, email, login, password, confirmPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Cadastro</h1>
        {error && <p className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Usuário" value={login} onChange={(e) => setLogin(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="primary">Cadastrar</button>
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <a href="/login" className="button">Voltar ao Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};
