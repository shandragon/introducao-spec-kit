import { Request, Response } from 'express';
import * as taskService from '@services/taskService';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, date, parentId } = req.body;
    const task = await taskService.createTask({ title, description, date: new Date(date), parentId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const listTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.listTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to list tasks' });
  }
};

export const updateTaskDate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { date } = req.body;
    const task = await taskService.updateTaskDate(id, new Date(date));
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task date' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body;
    const task = await taskService.updateTaskStatus(id, status);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { title, description } = req.body;
    const task = await taskService.updateTask(id, { title, description });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
