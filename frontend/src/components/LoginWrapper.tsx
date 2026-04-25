import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { useAuth } from '../context/AuthContext';

export const LoginWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (loginInput: string, passwordInput: string) => {
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginInput, password: passwordInput })
      });

      if (!response.ok) throw new Error('Falha no login');
      
      const { token, user } = await response.json();
      login(token, user);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login falhou');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};
