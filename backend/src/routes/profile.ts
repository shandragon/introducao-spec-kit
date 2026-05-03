import express from 'express';
import * as profileController from '../controllers/profileController';

const router = express.Router();

router.get('/', profileController.getProfile);
router.put('/', profileController.updateProfile);
router.put('/password', profileController.changePassword);

export default router;
