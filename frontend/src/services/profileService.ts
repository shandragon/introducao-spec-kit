import { fetchWithAuth } from './api';

export interface UserProfile {
  name: string;
  email: string;
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await fetchWithAuth('/profile');
  if (!response.ok) throw new Error('Falha ao carregar perfil');
  const data = await response.json();
  return { name: data.name, email: data.email };
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
  const response = await fetchWithAuth('/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha ao atualizar perfil');
  }
};

export const changePassword = async (data: any): Promise<void> => {
  const response = await fetchWithAuth('/profile/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha ao alterar senha');
  }
};
