import express from 'express';
import tasks from '@routes/tasks';
import auth from '@routes/auth';
import { authenticateToken } from '@lib/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Version 1 online' });
});

router.use('/tasks', authenticateToken, tasks);
router.use('/auth', auth);

export default router;