"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chefscakeworld';
        await mongoose_1.default.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            autoIndex: true,
        });
        console.log(`[Database] MongoDB Connected: ${mongoose_1.default.connection.host}`);
    }
    catch (error) {
        console.warn(`[Database] Warning: Could not connect to MongoDB Atlas (${error.message}). Running in mock/in-memory fallback mode for local development.`);
    }
};
exports.connectDB = connectDB;
