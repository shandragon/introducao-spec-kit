import prisma from '../lib/prisma';
import { comparePassword, hashPassword } from './authService';

export const updateProfile = async (userId: string, data: { name?: string; email?: string }) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const changePassword = async (userId: string, data: { currentPassword: string; newPassword: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordCorrect = await comparePassword(data.currentPassword, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Senha atual incorreta');
  }

  const hashedNewPassword = await hashPassword(data.newPassword);

  return await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });
};
