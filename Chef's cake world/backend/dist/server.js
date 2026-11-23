"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_js_1 = require("./app.js");
const db_js_1 = require("./config/db.js");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await (0, db_js_1.connectDB)();
    const app = (0, app_js_1.createApp)();
    const server = app.listen(PORT, () => {
        console.log(`[Chef's Cake World] Enterprise Backend Server running on port ${PORT}`);
        console.log(`[API Docs] Health endpoint available at http://localhost:${PORT}/api/health`);
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
