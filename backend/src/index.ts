import express, { Request, Response, NextFunction } from 'express';
import * as taskController from './controllers/taskController';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.listTasks);
app.patch('/tasks/:id', taskController.updateTaskDate);
app.patch('/tasks/:id/status', taskController.updateTaskStatus);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
