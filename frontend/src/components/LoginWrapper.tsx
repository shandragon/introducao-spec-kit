import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha no login');
      }
      
      const { token, user } = data;
      login(token, user);
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Login falhou');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};
