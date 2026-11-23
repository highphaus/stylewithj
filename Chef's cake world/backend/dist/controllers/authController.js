"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = require("../models/User.js");
const generateToken = (userId, role) => {
    const secret = process.env.JWT_SECRET || 'chefscakeworld_default_jwt_secret_2026';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jsonwebtoken_1.default.sign({ id: userId, role }, secret, { expiresIn });
};
const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            res.status(400).json({ success: false, message: 'Please provide all required fields (name, email, phone, password).' });
            return;
        }
        const existingUser = await User_js_1.User.findOne({
            $or: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }]
        });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'An account with this email or phone number already exists.' });
            return;
        }
        const user = await User_js_1.User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            password,
            role: User_js_1.UserRole.CUSTOMER
        });
        const token = generateToken(user._id.toString(), user.role);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            success: true,
            message: 'Registration successful! Welcome to Chef\'s Cake World.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error creating account.' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        if (!emailOrPhone || !password) {
            res.status(400).json({ success: false, message: 'Please provide email/phone and password.' });
            return;
        }
        const identifier = emailOrPhone.trim();
        const user = await User_js_1.User.findOne({
            $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
        }).select('+password');
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials. Incorrect password.' });
            return;
        }
        if (!user.isActive) {
            res.status(403).json({ success: false, message: 'Your account is deactivated. Contact store support.' });
            return;
        }
        const token = generateToken(user._id.toString(), user.role);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                branchId: user.branchId
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Login error.' });
    }
};
exports.login = login;
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
};
exports.logout = logout;
const getMe = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ success: false, message: 'Not authenticated.' });
        return;
    }
    res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            role: req.user.role,
            branchId: req.user.branchId
        }
    });
};
exports.getMe = getMe;
