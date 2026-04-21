import express from 'express';
import tasks from '@routes/tasks';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Version 1 online' });
});

router.use('/tasks', tasks);

export default router;