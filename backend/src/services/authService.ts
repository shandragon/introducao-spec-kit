import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

const SALT_ROUNDS = 10;
const loginAttempts: Record<string, { count: number; lastAttempt: number }> = {};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const register = async (name: string, email: string, login: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: {
      name,
      email,
      login,
      password: hashedPassword,
    },
  });
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const checkLoginLockout = (login: string): boolean => {
  const attempt = loginAttempts[login];
  if (!attempt) return false;
  if (attempt.count >= 3 && Date.now() - attempt.lastAttempt < 60000) {
    return true;
  }
  return false;
};

export const recordLoginAttempt = (login: string, success: boolean) => {
  if (success) {
    delete loginAttempts[login];
  } else {
    const attempt = loginAttempts[login] || { count: 0, lastAttempt: 0 };
    attempt.count += 1;
    attempt.lastAttempt = Date.now();
    loginAttempts[login] = attempt;
  }
};
