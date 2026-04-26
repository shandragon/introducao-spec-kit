import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (login: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(login, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Organizer</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Usuário" 
              value={login} 
              onChange={(e) => setLogin(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="primary">Entrar</button>
        </form>
      </div>
    </div>
  );
};
