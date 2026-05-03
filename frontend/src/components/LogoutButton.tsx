import React from 'react';
import { useAuth } from '../context/AuthContext';

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ children, className }) => {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className={`logout-button ${className || ''}`}>
      {children || 'Sair'}
    </button>
  );
};
