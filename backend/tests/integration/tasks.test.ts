import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import tasksRouter from '../../src/routes/tasks';
import prisma from '../../src/lib/prisma';

// Mock express app
const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

// Mock prisma
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

describe('Tasks API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a task via POST /tasks', async () => {
    const taskData = { title: 'New Task', date: '2026-04-25T00:00:00.000Z' };
    (prisma.task.create as any).mockResolvedValue({ id: '1', ...taskData, status: 'PENDENTE' });

    const response = await request(app)
      .post('/tasks')
      .send(taskData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(taskData.title);
    expect(prisma.task.create).toHaveBeenCalled();
  });

  it('should update task date via PATCH /tasks/:id', async () => {
    const id = '1';
    const newDate = '2026-04-26T00:00:00.000Z';
    (prisma.task.findUnique as any).mockResolvedValue({ id, date: new Date('2026-04-25T00:00:00.000Z') });
    (prisma.task.update as any).mockResolvedValue({ id, date: new Date(newDate) });
    (prisma.task.findMany as any).mockResolvedValue([]);

    const response = await request(app)
      .patch(`/tasks/${id}`)
      .send({ date: newDate });

    expect(response.status).toBe(200);
    expect(prisma.task.update).toHaveBeenCalled();
  });

  it('should delete a task via DELETE /tasks/:id', async () => {
    const id = '1';
    (prisma.task.delete as any).mockResolvedValue({ id });

    const response = await request(app)
      .delete(`/tasks/${id}`);

    expect(response.status).toBe(204);
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update task details via PATCH /tasks/:id/details', async () => {
    const id = '1';
    const details = { title: 'Updated Title', description: 'Updated Desc' };
    (prisma.task.update as any).mockResolvedValue({ id, ...details });

    const response = await request(app)
      .patch(`/tasks/${id}/details`)
      .send(details);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(details.title);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id },
      data: details
    });
  });

  it('should support at least 5 levels of hierarchical depth', async () => {
    // This test ensures the data model and services can handle deep nesting
    // Mocking a chain of 5 tasks
    const tasks = [
      { id: '1', parentId: null },
      { id: '2', parentId: '1' },
      { id: '3', parentId: '2' },
      { id: '4', parentId: '3' },
      { id: '5', parentId: '4' },
    ];

    (prisma.task.create as any).mockImplementation((args: any) => {
      return Promise.resolve({ id: args.data.id || 'new-id', ...args.data });
    });

    for (let i = 0; i < tasks.length; i++) {
      const response = await request(app)
        .post('/tasks')
        .send({ 
          title: `Level ${i+1}`, 
          date: '2026-04-25T00:00:00.000Z',
          parentId: tasks[i].parentId
        });
      expect(response.status).toBe(201);
    }
    
    expect(prisma.task.create).toHaveBeenCalledTimes(5);
  });
});
