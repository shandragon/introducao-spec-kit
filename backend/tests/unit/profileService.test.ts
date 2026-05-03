import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateProfile, changePassword } from '../../src/services/profileService';
import prisma from '../../src/lib/prisma';
import * as authService from '../../src/services/authService';

vi.mock('../../src/lib/prisma', () => ({
  default: {
    user: {
      update: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('../../src/services/authService', () => ({
  comparePassword: vi.fn(),
  hashPassword: vi.fn(),
}));

describe('profileService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('updateProfile', () => {
    it('should update user name and email', async () => {
      const userId = 'user-1';
      const updateData = { name: 'New Name', email: 'new@example.com' };
      const updatedUser = { id: userId, ...updateData };
      
      (prisma.user.update as any).mockResolvedValue(updatedUser);

      const result = await updateProfile(userId, updateData);

      expect(result).toEqual(updatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: updateData,
      });
    });

    it('should update only the name', async () => {
      const userId = 'user-1';
      const updateData = { name: 'New Name' };
      const updatedUser = { id: userId, name: 'New Name', email: 'old@example.com' };
      
      (prisma.user.update as any).mockResolvedValue(updatedUser);

      const result = await updateProfile(userId, updateData);

      expect(result.name).toBe('New Name');
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: updateData,
      });
    });
  });

  describe('changePassword', () => {
    it('should change user password if current password is correct', async () => {
      const userId = 'user-1';
      const passwords = { currentPassword: 'old', newPassword: 'new' };
      const user = { id: userId, password: 'hashed-old' };
      
      (prisma.user.findUnique as any).mockResolvedValue(user);
      (authService.comparePassword as any).mockResolvedValue(true);
      (authService.hashPassword as any).mockResolvedValue('hashed-new');
      (prisma.user.update as any).mockResolvedValue({ ...user, password: 'hashed-new' });

      await changePassword(userId, passwords);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { password: 'hashed-new' },
      });
    });

    it('should throw error if user not found', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);
      await expect(changePassword('invalid', { currentPassword: 'a', newPassword: 'b' }))
        .rejects.toThrow('Usuário não encontrado');
    });

    it('should throw error if current password is incorrect', async () => {
      const user = { id: 'user-1', password: 'hashed-old' };
      (prisma.user.findUnique as any).mockResolvedValue(user);
      (authService.comparePassword as any).mockResolvedValue(false);

      await expect(changePassword('user-1', { currentPassword: 'wrong', newPassword: 'new' }))
        .rejects.toThrow('Senha atual incorreta');
    });
  });
});
