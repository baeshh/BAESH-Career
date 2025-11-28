import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';

// TODO: 실제 DB 연동 시 Prisma 사용
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    // TODO: DB에서 사용자 프로필 조회
    res.json({
      message: 'Get profile (not implemented)',
      userId: req.userId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    // TODO: DB에서 사용자 프로필 업데이트
    res.json({
      message: 'Update profile (not implemented)',
      userId: req.userId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};


