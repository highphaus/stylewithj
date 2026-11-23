import { Response } from 'express';
import { Order, OrderStatus, PaymentStatus } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { User, UserRole } from '../models/User.js';
import { Branch } from '../models/Branch.js';
import { Settings } from '../models/Settings.js';
import { AuditLog } from '../models/AuditLog.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

export const getDashboardOverview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      confirmedOrders,
      preparingOrders,
      deliveredOrders,
      cancelledOrders,
      allOrders,
      totalProducts,
      totalCustomers,
      branches
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ orderStatus: OrderStatus.PENDING }),
      Order.countDocuments({ orderStatus: OrderStatus.CONFIRMED }),
      Order.countDocuments({ orderStatus: OrderStatus.PREPARING }),
      Order.countDocuments({ orderStatus: OrderStatus.DELIVERED }),
      Order.countDocuments({ orderStatus: OrderStatus.CANCELLED }),
      Order.find({ paymentStatus: PaymentStatus.PAID }).select('totalAmount branch createdAt'),
      Product.countDocuments({ isActive: true }),
      User.countDocuments({ role: UserRole.CUSTOMER }),
      Branch.find({ isActive: true }).select('name branchCode city')
    ]);

    // Total revenue
    const totalRevenue = allOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    // Branch-wise revenue breakdown
    const branchRevenueMap: Record<string, { name: string; revenue: number; orderCount: number }> = {};
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
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

    // Top selling products
    const bestSellers = await Product.find({ isActive: true }).sort({ averageRating: -1, reviewCount: -1 }).limit(5);

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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error compiling dashboard overview' });
  }
};

export const getCustomers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const customers = await User.find({ role: UserRole.CUSTOMER }).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, customers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching customers' });
  }
};

export const getStoreSettings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({ success: true, settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching store settings' });
  }
};

export const updateStoreSettings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    res.status(200).json({ success: true, message: 'Settings updated successfully', settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error updating settings' });
  }
};

export const getAuditLogs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json({ success: true, logs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error retrieving audit logs' });
  }
};

