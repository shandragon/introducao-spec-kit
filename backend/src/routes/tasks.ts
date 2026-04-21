import express from 'express';
import * as taskController from '@controllers/taskController';

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.listTasks);
router.patch('/:id', taskController.updateTaskDate);
router.patch('/:id/status', taskController.updateTaskStatus);

export default router;