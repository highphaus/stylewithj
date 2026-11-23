"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const productRoutes_js_1 = __importDefault(require("./routes/productRoutes.js"));
const categoryRoutes_js_1 = __importDefault(require("./routes/categoryRoutes.js"));
const branchRoutes_js_1 = __importDefault(require("./routes/branchRoutes.js"));
const cartRoutes_js_1 = __importDefault(require("./routes/cartRoutes.js"));
const orderRoutes_js_1 = __importDefault(require("./routes/orderRoutes.js"));
const paymentRoutes_js_1 = __importDefault(require("./routes/paymentRoutes.js"));
const customCakeRoutes_js_1 = __importDefault(require("./routes/customCakeRoutes.js"));
const adminRoutes_js_1 = __importDefault(require("./routes/adminRoutes.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const createApp = () => {
    const app = (0, express_1.default)();
    // Security headers
    app.use((0, helmet_1.default)());
    // CORS configuration
    const allowedOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://www.chefscakeworld.com',
        'https://chefscakeworld.com',
        process.env.CLIENT_URL || ''
    ].filter(Boolean);
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, or SSR)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(null, true); // Permissive in dev/staging
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-guest-id']
    }));
    // Rate Limiting
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        standardHeaders: true,
        legacyHeaders: false,
        message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
    });
    app.use('/api', limiter);
    // Middleware
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, morgan_1.default)('dev'));
    // Healthcheck
    app.get('/api/health', (req, res) => {
        res.status(200).json({
            status: 'UP',
            service: "Chef's Cake World Backend",
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    });
    // Mount API modules
    app.use('/api/auth', authRoutes_js_1.default);
    app.use('/api/products', productRoutes_js_1.default);
    app.use('/api/categories', categoryRoutes_js_1.default);
    app.use('/api/branches', branchRoutes_js_1.default);
    app.use('/api/cart', cartRoutes_js_1.default);
    app.use('/api/orders', orderRoutes_js_1.default);
    app.use('/api/payments', paymentRoutes_js_1.default);
    app.use('/api/custom-cakes', customCakeRoutes_js_1.default);
    app.use('/api/admin', adminRoutes_js_1.default);
    // Global Error Handler
    app.use(errorHandler_js_1.errorHandler);
    return app;
};
exports.createApp = createApp;
