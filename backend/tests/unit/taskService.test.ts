import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTask, listTasks, updateTaskDate, updateTaskStatus, updateTask, deleteTask } from '../../src/services/taskService';
import prisma from '../../src/lib/prisma';

vi.mock('../../src/lib/prisma', () => ({
  default: {
    task: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('taskService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a task', async () => {
    const taskData = { title: 'Test Task', date: new Date('2026-04-19') };
    const createdTask = { id: '1', ...taskData, status: 'PENDENTE' };
    (prisma.task.findMany as any).mockResolvedValue([]);
    (prisma.task.create as any).mockResolvedValue(createdTask);

    const result = await createTask(taskData);

    expect(result).toEqual(createdTask);
    expect(prisma.task.create).toHaveBeenCalledWith({ data: expect.objectContaining(taskData) });
  });

  it('should validate time format and duration', async () => {
    const taskData = { 
      title: 'Valid Task', 
      date: new Date(), 
      startTime: new Date('1970-01-01T14:00:00Z'), 
      durationMinutes: 90 
    };
    
    const result = { id: '1', ...taskData, status: 'PENDENTE' };
    (prisma.task.findMany as any).mockResolvedValue([]);
    (prisma.task.create as any).mockResolvedValue(result);

    const created = await createTask(taskData as any);

    expect(created.durationMinutes).toBe(90);
  });

  it('should list tasks', async () => {
    const tasks = [{ id: '1', title: 'Task 1', date: new Date('2026-04-19'), status: 'PENDENTE' }];
    (prisma.task.findMany as any).mockResolvedValue(tasks);

    const result = await listTasks();

    expect(result).toEqual(tasks);
    expect(prisma.task.findMany).toHaveBeenCalled();
  });

  it('should handle recursive date displacement', async () => {
    const parentId = 'parent-1';
    const oldDate = new Date('2026-04-19');
    const newDate = new Date('2026-04-21');
    const children = [{ id: 'child-1', date: new Date('2026-04-20') }];
    
    (prisma.task.findUnique as any).mockResolvedValue({ id: parentId, date: oldDate });
    (prisma.task.update as any).mockResolvedValue({ id: parentId, date: newDate });
    (prisma.task.findMany as any)
      .mockResolvedValueOnce(children)
      .mockResolvedValueOnce([]);

    await updateTaskDate(parentId, newDate);

    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { parentId } });
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 'child-1' },
      data: { date: new Date('2026-04-22') }
    });
  });

  it('should update task status', async () => {
    const id = '1';
    const status = 'CONCLUIDA';
    (prisma.task.update as any).mockResolvedValue({ id, status });

    const result = await updateTaskStatus(id, status);

    expect(result.status).toBe(status);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id },
      data: { status }
    });
  });

  it('should update task details (title and description)', async () => {
    const id = '1';
    const data = { title: 'Updated Title', description: 'Updated Description' };
    (prisma.task.update as any).mockResolvedValue({ id, ...data });

    const result = await updateTask(id, data);

    expect(result.title).toBe(data.title);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id },
      data
    });
  });

  it('should delete a task', async () => {
    const id = '1';
    (prisma.task.delete as any).mockResolvedValue({ id });

    await deleteTask(id);

    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { id }
    });
  });
});
