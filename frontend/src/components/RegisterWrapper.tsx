import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';

export const RegisterWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (name: string, email: string, login: string, password: string, confirmPassword: string) => {
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, login, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha no cadastro');
      }
      
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error: any) {
      alert(error.message || 'Cadastro falhou');
    }
  };

  return <RegisterForm onRegister={handleRegister} />;
};
