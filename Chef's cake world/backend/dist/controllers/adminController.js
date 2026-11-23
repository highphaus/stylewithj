"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogs = exports.updateStoreSettings = exports.getStoreSettings = exports.getCustomers = exports.getDashboardOverview = void 0;
const Order_js_1 = require("../models/Order.js");
const Product_js_1 = require("../models/Product.js");
const User_js_1 = require("../models/User.js");
const Branch_js_1 = require("../models/Branch.js");
const Settings_js_1 = require("../models/Settings.js");
const AuditLog_js_1 = require("../models/AuditLog.js");
const getDashboardOverview = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [totalOrders, todayOrders, pendingOrders, confirmedOrders, preparingOrders, deliveredOrders, cancelledOrders, allOrders, totalProducts, totalCustomers, branches] = await Promise.all([
            Order_js_1.Order.countDocuments(),
            Order_js_1.Order.countDocuments({ createdAt: { $gte: today } }),
            Order_js_1.Order.countDocuments({ orderStatus: Order_js_1.OrderStatus.PENDING }),
            Order_js_1.Order.countDocuments({ orderStatus: Order_js_1.OrderStatus.CONFIRMED }),
            Order_js_1.Order.countDocuments({ orderStatus: Order_js_1.OrderStatus.PREPARING }),
            Order_js_1.Order.countDocuments({ orderStatus: Order_js_1.OrderStatus.DELIVERED }),
            Order_js_1.Order.countDocuments({ orderStatus: Order_js_1.OrderStatus.CANCELLED }),
            Order_js_1.Order.find({ paymentStatus: Order_js_1.PaymentStatus.PAID }).select('totalAmount branch createdAt'),
            Product_js_1.Product.countDocuments({ isActive: true }),
            User_js_1.User.countDocuments({ role: User_js_1.UserRole.CUSTOMER }),
            Branch_js_1.Branch.find({ isActive: true }).select('name branchCode city')
        ]);
        // Total revenue
        const totalRevenue = allOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
        // Branch-wise revenue breakdown
        const branchRevenueMap = {};
        for (const b of branches) {
            branchRevenueMap[b._id.toString()] = { name: b.name, revenue: 0, orderCount: 0 };
        }
        for (const ord of allOrders) {
            const bId = ord.branch?.branchId?.toString();
            if (bId && branchRevenueMap[bId]) {
                branchRevenueMap[bId].revenue += ord.totalAmount;
                branchRevenueMap[bId].orderCount += 1;
            }
        }
        // Recent 10 orders
        const recentOrders = await Order_js_1.Order.find().sort({ createdAt: -1 }).limit(10);
        // Top selling products
        const bestSellers = await Product_js_1.Product.find({ isActive: true }).sort({ averageRating: -1, reviewCount: -1 }).limit(5);
        res.status(200).json({
            success: true,
            stats: {
                totalOrders,
                todayOrders,
                pendingOrders,
                confirmedOrders,
                preparingOrders,
                deliveredOrders,
                cancelledOrders,
                totalRevenue,
                totalProducts,
                totalCustomers
            },
            branchPerformance: Object.values(branchRevenueMap),
            recentOrders,
            bestSellers
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error compiling dashboard overview' });
    }
};
exports.getDashboardOverview = getDashboardOverview;
const getCustomers = async (req, res) => {
    try {
        const customers = await User_js_1.User.find({ role: User_js_1.UserRole.CUSTOMER }).select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, customers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching customers' });
    }
};
exports.getCustomers = getCustomers;
const getStoreSettings = async (req, res) => {
    try {
        let settings = await Settings_js_1.Settings.findOne();
        if (!settings) {
            settings = await Settings_js_1.Settings.create({});
        }
        res.status(200).json({ success: true, settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching store settings' });
    }
};
exports.getStoreSettings = getStoreSettings;
const updateStoreSettings = async (req, res) => {
    try {
        let settings = await Settings_js_1.Settings.findOne();
        if (!settings) {
            settings = await Settings_js_1.Settings.create(req.body);
        }
        else {
            settings = await Settings_js_1.Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
        }
        res.status(200).json({ success: true, message: 'Settings updated successfully', settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error updating settings' });
    }
};
exports.updateStoreSettings = updateStoreSettings;
const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog_js_1.AuditLog.find().sort({ createdAt: -1 }).limit(100);
        res.status(200).json({ success: true, logs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error retrieving audit logs' });
    }
};
exports.getAuditLogs = getAuditLogs;
