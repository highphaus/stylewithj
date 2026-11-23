import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chefscakeworld';
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });
    console.log(`[Database] MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error: any) {
    console.warn(`[Database] Warning: Could not connect to MongoDB Atlas (${error.message}). Running in mock/in-memory fallback mode for local development.`);
  }
};

