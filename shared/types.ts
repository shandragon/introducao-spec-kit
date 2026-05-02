export type Status = 'PENDENTE' | 'EM_PLANEJAMENTO' | 'EM_EXECUCAO' | 'CONCLUIDA';

export interface User {
  id: string;
  login: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  status: Status;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  children?: Task[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  login: string;
  password?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}


