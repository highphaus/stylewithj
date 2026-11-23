import { Request, Response } from 'express';
import { Order, OrderStatus, PaymentStatus } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import { verifyRazorpayPaymentSignature } from '../services/razorpayService.js';
import { dispatchOrderCreatedNotifications } from '../services/notificationService.js';

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderNumber } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ success: false, message: 'Missing Razorpay verification tokens.' });
      return;
    }

    const isValid = verifyRazorpayPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) {
      res.status(400).json({ success: false, message: 'Invalid payment signature. Payment verification failed.' });
      return;
    }

    // Locate the order
    const order = await Order.findOne({
      $or: [{ razorpayOrderId: razorpay_order_id }, { orderNumber }]
    });

    if (!order) {
      res.status(404).json({ success: false, message: 'Associated order not found.' });
      return;
    }

    // Check if already processed
    if (order.paymentStatus === PaymentStatus.PAID) {
      res.status(200).json({ success: true, message: 'Payment already recorded.', orderNumber: order.orderNumber });
      return;
    }

    order.paymentStatus = PaymentStatus.PAID;
    order.orderStatus = OrderStatus.CONFIRMED;
    order.razorpayPaymentId = razorpay_payment_id;
    order.timeline.push({
      status: OrderStatus.CONFIRMED,
      timestamp: new Date(),
      updatedBy: 'Razorpay Gateway',
      note: `Online payment of ₹${order.totalAmount} captured successfully (Ref: ${razorpay_payment_id}).`
    });

    await order.save();

    // Record payment log
    await Payment.create({
      orderId: order._id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: order.totalAmount,
      currency: 'INR',
      status: 'PAID',
      method: 'RAZORPAY'
    });

    await dispatchOrderCreatedNotifications(order);

    res.status(200).json({
      success: true,
      message: 'Payment verified and order confirmed successfully!',
      orderNumber: order.orderNumber,
      orderId: order._id
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Payment verification error' });
  }
};

export const handleRazorpayWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = req.body.event;
    console.log(`[Razorpay Webhook] Event received: ${event}`);

    if (event === 'payment.captured') {
      const paymentEntity = req.body.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;

      const order = await Order.findOne({ razorpayOrderId });
      if (order && order.paymentStatus !== PaymentStatus.PAID) {
        order.paymentStatus = PaymentStatus.PAID;
        order.orderStatus = OrderStatus.CONFIRMED;
        order.razorpayPaymentId = paymentEntity.id;
        order.timeline.push({
          status: OrderStatus.CONFIRMED,
          timestamp: new Date(),
          updatedBy: 'Razorpay Webhook',
          note: `Webhook verified payment: ${paymentEntity.id}`
        });
        await order.save();
        await dispatchOrderCreatedNotifications(order);
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error: any) {
    console.error('[Razorpay Webhook Error]:', error);
    res.status(500).json({ message: 'Webhook processing error' });
  }
};

