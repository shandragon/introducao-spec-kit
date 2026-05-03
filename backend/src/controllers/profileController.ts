import { Request, Response } from 'express';
import * as profileService from '../services/profileService';
import prisma from '../lib/prisma';

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ id: user.id, login: user.login, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { name, email } = req.body;

  try {
    const user = await profileService.updateProfile(userId, { name, email });
    res.json({ message: 'Perfil atualizado com sucesso', user: { name: user.name, email: user.email } });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'E-mail já está em uso' });
    }
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Senhas não coincidem' });
  }

  try {
    await profileService.changePassword(userId, { currentPassword, newPassword });
    res.json({ message: 'Senha alterada com sucesso. Por favor, faça login novamente.' });
  } catch (error: any) {
    if (error.message === 'Senha atual incorreta') {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }
    res.status(500).json({ message: 'Erro ao alterar senha' });
  }
};
