import express from 'express';
import { authenticate } from '../middleware/auth';
import { getProfile, updateProfile } from '../controllers/userController';

const router = express.Router();

router.use(authenticate); // 모든 라우트에 인증 필요

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;


