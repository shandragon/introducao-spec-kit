import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { comparePassword, checkLoginLockout, recordLoginAttempt } from '../services/authService';
import { generateToken } from '../lib/auth';

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  if (checkLoginLockout(login)) {
    return res.status(429).json({ message: 'Conta bloqueada temporariamente. Tente novamente em 1 minuto.' });
  }

  const user = await prisma.user.findUnique({ where: { login } });

  if (!user || !(await comparePassword(password, user.password))) {
    recordLoginAttempt(login, false);
    return res.status(401).json({ message: 'Falha na autenticação' });
  }

  recordLoginAttempt(login, true);
  const token = generateToken({ id: user.id, login: user.login });
  res.json({ token, user: { id: user.id, login: user.login } });
};

export const logout = async (req: Request, res: Response) => {
  res.json({ success: true });
};
