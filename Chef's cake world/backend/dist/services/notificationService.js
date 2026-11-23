"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchOrderStatusChangeNotification = exports.dispatchOrderCreatedNotifications = void 0;
const Notification_js_1 = require("../models/Notification.js");
const dispatchOrderCreatedNotifications = async (order) => {
    try {
        const summary = `Order #${order.orderNumber} for ₹${order.totalAmount} has been placed. Branch: ${order.branch.branchName}. Delivery: ${order.deliveryDate} (${order.deliverySlot})`;
        // 1. Customer notification
        await Notification_js_1.Notification.create({
            recipientId: order.customer.userId || undefined,
            channel: 'EMAIL',
            title: `Order Confirmed: #${order.orderNumber}`,
            message: `Dear ${order.customer.name}, your Chef's Cake World order #${order.orderNumber} is confirmed! Scheduled for ${order.deliveryDate} (${order.deliverySlot}).`,
            data: { orderId: order._id, orderNumber: order.orderNumber }
        });
        // 2. Branch Staff Notification
        await Notification_js_1.Notification.create({
            role: 'BRANCH_STAFF',
            channel: 'IN_APP',
            title: `New Order Received: #${order.orderNumber}`,
            message: `New preparation order #${order.orderNumber} allocated to ${order.branch.branchName}. Required for: ${order.deliveryDate}.`,
            data: { orderId: order._id, branchId: order.branch.branchId }
        });
        // 3. Central Administrator Notification
        await Notification_js_1.Notification.create({
            role: 'ADMIN',
            channel: 'IN_APP',
            title: `New System Order: #${order.orderNumber}`,
            message: summary,
            data: { orderId: order._id }
        });
        console.log(`[NotificationService] Dispatched notifications for Order #${order.orderNumber}`);
    }
    catch (error) {
        console.error('[NotificationService] Error dispatching notifications:', error);
    }
};
exports.dispatchOrderCreatedNotifications = dispatchOrderCreatedNotifications;
const dispatchOrderStatusChangeNotification = async (order, previousStatus, newStatus) => {
    try {
        await Notification_js_1.Notification.create({
            recipientId: order.customer.userId || undefined,
            channel: 'IN_APP',
            title: `Order Update: #${order.orderNumber}`,
            message: `Your order status has changed to "${newStatus}". Branch: ${order.branch.branchName}.`,
            data: { orderId: order._id, previousStatus, newStatus }
        });
        console.log(`[NotificationService] Status updated for Order #${order.orderNumber} -> ${newStatus}`);
    }
    catch (error) {
        console.error('[NotificationService] Error sending status update notification:', error);
    }
};
exports.dispatchOrderStatusChangeNotification = dispatchOrderStatusChangeNotification;
