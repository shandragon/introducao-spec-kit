export type Status = 'PENDENTE' | 'EM_PLANEJAMENTO' | 'EM_EXECUCAO' | 'CONCLUIDA';

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

export type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

