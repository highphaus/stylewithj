import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log(`[Chef's Cake World] Enterprise Backend Server running on port ${PORT}`);
    console.log(`[API Docs] Health endpoint available at http://localhost:${PORT}/api/health`);
  });

  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`[Server Error] Port ${PORT} is already in use by another running process.`);
      console.error(`Please terminate the process on port ${PORT} or configure a different PORT in backend/.env.`);
      process.exit(1);
    } else {
      console.error('[Server Error]:', error);
      process.exit(1);
    }
  });

  const shutdown = () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();

