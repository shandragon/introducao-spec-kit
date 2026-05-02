import { Request, Response } from 'express';
import * as taskService from '@services/taskService';

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { title, description, date, startTime, durationMinutes, parentId } = req.body;
    
    // Provide defaults if not provided in request
    const taskData = {
        title,
        description,
        date: new Date(date),
        startTime: startTime ? new Date(startTime) : undefined,
        durationMinutes: durationMinutes ? parseInt(durationMinutes) : undefined,
        parentId
    };

    const task = await taskService.createTask(userId, taskData);
    res.status(201).json(task);
  } catch (error: any) {
    console.error("Error in createTask:", error);
    if (error.message === 'CONFLITO') {
      res.status(409).json({ error: 'Conflito de horário' });
    } else {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
};

export const listTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const tasks = await taskService.listTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to list tasks' });
  }
};

export const updateTaskDate = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params as { id: string };
    const { date } = req.body;
    const task = await taskService.updateTaskDate(userId, id, new Date(date));
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task date' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params as { id: string };
    const { status } = req.body;
    const task = await taskService.updateTaskStatus(userId, id, status);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params as { id: string };
    const { title, description } = req.body;
    const task = await taskService.updateTask(userId, id, { title, description });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params as { id: string };
    await taskService.deleteTask(userId, id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
