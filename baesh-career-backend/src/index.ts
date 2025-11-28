import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { loadAwsConfig } from './utils/awsConfig';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import sessionRoutes from './routes/sessions';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// AWS 환경 변수 로드 (프로덕션 환경)
(async () => {
  if (process.env.NODE_ENV === 'production') {
    await loadAwsConfig();
  }
})();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BAESH Career Backend API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/ai', aiRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

