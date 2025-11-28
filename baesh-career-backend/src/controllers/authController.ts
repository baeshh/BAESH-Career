import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// TODO: 실제 DB 연동 시 Prisma 사용
// 임시로 메모리 저장소 사용
const users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}> = [];

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = signupSchema.parse(req.body);

    // 중복 이메일 체크
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      createdAt: new Date()
    };

    users.push(user);

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Login failed' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  // TODO: 실제 비밀번호 재설정 로직 구현
  res.json({ message: 'Password reset email sent (not implemented)' });
};

export const resetPassword = async (req: Request, res: Response) => {
  // TODO: 실제 비밀번호 재설정 로직 구현
  res.json({ message: 'Password reset (not implemented)' });
};


