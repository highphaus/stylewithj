"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthenticate = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = require("../models/User.js");
const authenticate = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
            return;
        }
        const secret = process.env.JWT_SECRET || 'chefscakeworld_default_jwt_secret_2026';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = await User_js_1.User.findById(decoded.id);
        if (!user || !user.isActive) {
            res.status(401).json({ success: false, message: 'User account not found or suspended.' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
    }
};
exports.authenticate = authenticate;
const optionalAuthenticate = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (token) {
            const secret = process.env.JWT_SECRET || 'chefscakeworld_default_jwt_secret_2026';
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const user = await User_js_1.User.findById(decoded.id);
            if (user && user.isActive) {
                req.user = user;
            }
        }
        next();
    }
    catch {
        next();
    }
};
exports.optionalAuthenticate = optionalAuthenticate;
