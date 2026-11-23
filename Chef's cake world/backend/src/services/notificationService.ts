import { Notification } from '../models/Notification.js';
import { IOrderDocument } from '../models/Order.js';

export const dispatchOrderCreatedNotifications = async (order: IOrderDocument): Promise<void> => {
  try {
    const summary = `Order #${order.orderNumber} for ₹${order.totalAmount} has been placed. Branch: ${order.branch.branchName}. Delivery: ${order.deliveryDate} (${order.deliverySlot})`;

    // 1. Customer notification
    await Notification.create({
      recipientId: order.customer.userId || undefined,
      channel: 'EMAIL',
      title: `Order Confirmed: #${order.orderNumber}`,
      message: `Dear ${order.customer.name}, your Chef's Cake World order #${order.orderNumber} is confirmed! Scheduled for ${order.deliveryDate} (${order.deliverySlot}).`,
      data: { orderId: order._id, orderNumber: order.orderNumber }
    });

    // 2. Branch Staff Notification
    await Notification.create({
      role: 'BRANCH_STAFF',
      channel: 'IN_APP',
      title: `New Order Received: #${order.orderNumber}`,
      message: `New preparation order #${order.orderNumber} allocated to ${order.branch.branchName}. Required for: ${order.deliveryDate}.`,
      data: { orderId: order._id, branchId: order.branch.branchId }
    });

    // 3. Central Administrator Notification
    await Notification.create({
      role: 'ADMIN',
      channel: 'IN_APP',
      title: `New System Order: #${order.orderNumber}`,
      message: summary,
      data: { orderId: order._id }
    });

    console.log(`[NotificationService] Dispatched notifications for Order #${order.orderNumber}`);
  } catch (error) {
    console.error('[NotificationService] Error dispatching notifications:', error);
  }
};

export const dispatchOrderStatusChangeNotification = async (
  order: IOrderDocument,
  previousStatus: string,
  newStatus: string
): Promise<void> => {
  try {
    await Notification.create({
      recipientId: order.customer.userId || undefined,
      channel: 'IN_APP',
      title: `Order Update: #${order.orderNumber}`,
      message: `Your order status has changed to "${newStatus}". Branch: ${order.branch.branchName}.`,
      data: { orderId: order._id, previousStatus, newStatus }
    });

    console.log(`[NotificationService] Status updated for Order #${order.orderNumber} -> ${newStatus}`);
  } catch (error) {
    console.error('[NotificationService] Error sending status update notification:', error);
  }
};

