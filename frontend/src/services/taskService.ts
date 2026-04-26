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
  const withStartTime = tasks.filter(t => t.startTime && t.startTime.length >= 10);
  const withoutStartTime = tasks.filter(t => !t.startTime || t.startTime.length < 10);

  // Group by month
  const monthsMap = new Map<string, Task[]>();
  withStartTime.forEach(task => {
    const monthKey = task.startTime.substring(0, 7); // yyyy-MM
    if (!monthsMap.has(monthKey)) monthsMap.set(monthKey, []);
    monthsMap.get(monthKey)?.push(task);
  });

  const sortedMonthKeys = Array.from(monthsMap.keys()).sort();

  const chronologicalGroups: ChronologicalGroup[] = sortedMonthKeys.map(monthKey => {
    const parts = monthKey.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    
    // Create date from year and month
    const monthDate = new Date(year, month - 1); 
    const monthLabel = format(monthDate, 'MMMM', { locale: ptBR });
    const monthTasks = monthsMap.get(monthKey) || [];

    // Group by day within month
    const daysMap = new Map<string, Task[]>();
    monthTasks.forEach(task => {
      const dayKey = task.startTime.substring(0, 10); // yyyy-MM-dd
      if (!daysMap.has(dayKey)) daysMap.set(dayKey, []);
      daysMap.get(dayKey)?.push(task);
    });

    const sortedDayKeys = Array.from(daysMap.keys()).sort();

    const dayGroups: ChronologicalGroup[] = sortedDayKeys.map(dayKey => {
      const parts = dayKey.split('-');
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      const dayDate = new Date(y, m - 1, d);
      const dayLabel = `Dia ${format(dayDate, 'dd')}`;
      const dayTasks = daysMap.get(dayKey) || [];

      // Sort dayTasks by startTime
      dayTasks.sort((a, b) => a.startTime.localeCompare(b.startTime));

      // Rebuild hierarchy
      const taskMap = new Map<string, Task>();
      dayTasks.forEach(t => taskMap.set(t.id, { ...t, children: [] }));

      const rootTasks: Task[] = [];
      taskMap.forEach(task => {
        if (task.parentId && taskMap.has(task.parentId)) {
          taskMap.get(task.parentId)?.children?.push(task);
        } else {
          rootTasks.push(task);
        }
      });

      return {
        label: dayLabel,
        tasks: rootTasks,
        subGroups: []
      };
    });

    return {
      label: monthLabel,
      tasks: [],
      subGroups: dayGroups
    };
  });

  if (withoutStartTime.length > 0) {
    chronologicalGroups.push({
      label: 'Sem Data',
      tasks: withoutStartTime,
      subGroups: []
    });
  }

  return chronologicalGroups;
};
