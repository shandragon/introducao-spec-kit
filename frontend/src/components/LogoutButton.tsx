import React from 'react';
import { useAuth } from '../context/AuthContext';

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className="logout-button">
      Sair
    </button>
  );
};
