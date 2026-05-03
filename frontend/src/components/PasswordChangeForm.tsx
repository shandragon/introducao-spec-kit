import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import * as profileService from '../services/profileService';

export const PasswordChangeForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('A nova senha deve ter pelo menos 8 caracteres');
      return;
    }

    try {
      await profileService.changePassword({ currentPassword, newPassword, confirmPassword });
      toast.success('Senha alterada com sucesso! Por favor, faça login novamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Logout logic could be added here or just let the session expire
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || 'Erro ao alterar senha');
    }
  };

  return (
    <div className="profile-section" style={{ marginTop: '30px' }}>
      <h3>Alterar Senha</h3>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Senha Atual</label>
          <input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Nova Senha</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Confirmar Nova Senha</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="primary">Alterar Senha</button>
      </form>
    </div>
  );
};
