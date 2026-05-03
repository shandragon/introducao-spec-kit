import React from 'react';
import { ProfileForm } from '../components/ProfileForm';
import { PasswordChangeForm } from '../components/PasswordChangeForm';

export const ProfilePage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Meu Perfil</h1>
      <div className="card">
        <ProfileForm />
        <PasswordChangeForm />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => window.location.href = '/'}
          style={{ textDecoration: 'none' }}
        >
          Voltar para Tarefas
        </button>
      </div>
    </div>
  );
};
