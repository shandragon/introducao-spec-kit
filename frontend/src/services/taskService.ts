import { CreateTask, Task, Status } from '../../../shared/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export interface ChronologicalGroup {
  label: string;
  tasks: Task[];
  subGroups: ChronologicalGroup[];
}

export const listTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const createTask = async (task: CreateTask): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

export const updateTaskDate = async (id: string, date: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date }),
  });
  if (!response.ok) throw new Error('Failed to update task date');
  return response.json();
};

export const updateTaskStatus = async (id: string, status: Status): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update task status');
  return response.json();
};

export const updateTaskDetails = async (id: string, details: { title: string; description?: string }): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}/details`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  });
  if (!response.ok) throw new Error('Failed to update task details');
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
};

export const groupTasksChronologically = (tasks: Task[]): ChronologicalGroup[] => {
  const tasksWithDate = tasks.filter(t => t.startTime && t.startTime.length >= 10);
  const tasksWithoutDate = tasks.filter(t => !t.startTime || t.startTime.length < 10);

  const groups: Record<string, Record<string, Task[]>> = {};

  tasksWithDate.forEach(task => {
    const date = task.startTime.substring(0, 10);
    const month = date.substring(0, 7); 
    if (!groups[month]) groups[month] = {};
    if (!groups[month][date]) groups[month][date] = [];
    groups[month][date].push(task);
  });

  const chronologicalGroups: ChronologicalGroup[] = Object.keys(groups).sort().map(monthKey => {
    const [year, month] = monthKey.split('-').map(Number);
    const monthDate = new Date(year, month - 1);
    const monthLabel = format(monthDate, 'MMMM', { locale: ptBR });

    const subGroups = Object.keys(groups[monthKey]).sort().map(dayKey => {
      const dayTasks = groups[monthKey][dayKey].sort((a, b) => a.startTime.localeCompare(b.startTime));
      const taskMap = new Map<string, Task & { children: Task[] }>(dayTasks.map(t => [t.id, { ...t, children: [] }]));
      const roots: Task[] = [];
      
      taskMap.forEach(task => {
        if (task.parentId && taskMap.has(task.parentId)) {
          taskMap.get(task.parentId)!.children!.push(task);
        } else {
          roots.push(task);
        }
      });
      return { label: `Dia ${dayKey.split('-')[2]}`, tasks: roots, subGroups: [] };
    });
    return { label: monthLabel, tasks: [], subGroups };
  });

  if (tasksWithoutDate.length > 0) {
    chronologicalGroups.push({ label: 'Sem Data', tasks: tasksWithoutDate, subGroups: [] });
  }

  return chronologicalGroups;
};
