export type Status = 'PENDENTE' | 'EM_PLANEJAMENTO' | 'EM_EXECUCAO' | 'CONCLUIDA';

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  status: Status;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  children?: Task[];
}
