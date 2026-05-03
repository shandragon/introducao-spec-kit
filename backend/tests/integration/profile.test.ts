import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import profileRouter from '../../src/routes/profile';
import prisma from '../../src/lib/prisma';
import * as authService from '../../src/services/authService';

// Mock express app
const app = express();
app.use(express.json());

// Middleware to inject mock user
app.use((req, res, next) => {
  (req as any).user = { id: 'user-1' };
  next();
});

app.use('/profile', profileRouter);

// Mock prisma
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

describe('Profile API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update profile via PUT /profile', async () => {
    const updateData = { name: 'João Silva', email: 'joao@example.com' };
    (prisma.user.update as any).mockResolvedValue({ id: 'user-1', ...updateData });

    const response = await request(app)
      .put('/profile')
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Perfil atualizado com sucesso');
    expect(response.body.user.name).toBe(updateData.name);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: updateData,
    });
  });

  it('should return 409 if email is already in use', async () => {
    const updateData = { email: 'existing@example.com' };
    const error = new Error('Unique constraint failed');
    (error as any).code = 'P2002';
    (prisma.user.update as any).mockRejectedValue(error);

    const response = await request(app)
      .put('/profile')
      .send(updateData);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('E-mail já está em uso');
  });

  describe('PUT /profile/password', () => {
    it('should change password with correct current password', async () => {
      const data = { currentPassword: 'old', newPassword: 'new', confirmPassword: 'new' };
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', password: 'hashed-old' });
      vi.mocked(authService.comparePassword).mockResolvedValue(true);
      vi.mocked(authService.hashPassword).mockResolvedValue('hashed-new');
      (prisma.user.update as any).mockResolvedValue({ id: 'user-1', password: 'hashed-new' });

      const response = await request(app)
        .put('/profile/password')
        .send(data);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Senha alterada com sucesso. Por favor, faça login novamente.');
    });

    it('should return 401 if current password is wrong', async () => {
      const data = { currentPassword: 'wrong', newPassword: 'new', confirmPassword: 'new' };
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', password: 'hashed-old' });
      vi.mocked(authService.comparePassword).mockResolvedValue(false);

      const response = await request(app)
        .put('/profile/password')
        .send(data);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Senha atual incorreta');
    });

    it('should return 400 if passwords do not match', async () => {
      const data = { currentPassword: 'old', newPassword: 'new', confirmPassword: 'different' };

      const response = await request(app)
        .put('/profile/password')
        .send(data);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Senhas não coincidem');
    });
  });
});
