import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as profileService from '../services/profileService';

export const ProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.getProfile()
      .then(profile => {
        setName(profile.name || '');
        setEmail(profile.email || '');
        setLoading(false);
      })
      .catch(err => {
        toast.error('Erro ao carregar perfil');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await profileService.updateProfile({ name, email });
      toast.success('Perfil atualizado com sucesso!');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao atualizar perfil');
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="profile-section">
      <h3>Dados Pessoais</h3>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Nome</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Seu nome"
          />
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="seu@email.com"
          />
        </div>
        <button type="submit" className="primary">Salvar Alterações</button>
      </form>
    </div>
  );
};
