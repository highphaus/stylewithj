"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRazorpayWebhook = exports.verifyPayment = void 0;
const Order_js_1 = require("../models/Order.js");
const Payment_js_1 = require("../models/Payment.js");
const razorpayService_js_1 = require("../services/razorpayService.js");
const notificationService_js_1 = require("../services/notificationService.js");
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderNumber } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            res.status(400).json({ success: false, message: 'Missing Razorpay verification tokens.' });
            return;
        }
        const isValid = (0, razorpayService_js_1.verifyRazorpayPaymentSignature)(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        if (!isValid) {
            res.status(400).json({ success: false, message: 'Invalid payment signature. Payment verification failed.' });
            return;
        }
        // Locate the order
        const order = await Order_js_1.Order.findOne({
            $or: [{ razorpayOrderId: razorpay_order_id }, { orderNumber }]
        });
        if (!order) {
            res.status(404).json({ success: false, message: 'Associated order not found.' });
            return;
        }
        // Check if already processed
        if (order.paymentStatus === Order_js_1.PaymentStatus.PAID) {
            res.status(200).json({ success: true, message: 'Payment already recorded.', orderNumber: order.orderNumber });
            return;
        }
        order.paymentStatus = Order_js_1.PaymentStatus.PAID;
        order.orderStatus = Order_js_1.OrderStatus.CONFIRMED;
        order.razorpayPaymentId = razorpay_payment_id;
        order.timeline.push({
            status: Order_js_1.OrderStatus.CONFIRMED,
            timestamp: new Date(),
            updatedBy: 'Razorpay Gateway',
            note: `Online payment of ₹${order.totalAmount} captured successfully (Ref: ${razorpay_payment_id}).`
        });
        await order.save();
        // Record payment log
        await Payment_js_1.Payment.create({
            orderId: order._id,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            amount: order.totalAmount,
            currency: 'INR',
            status: 'PAID',
            method: 'RAZORPAY'
        });
        await (0, notificationService_js_1.dispatchOrderCreatedNotifications)(order);
        res.status(200).json({
            success: true,
            message: 'Payment verified and order confirmed successfully!',
            orderNumber: order.orderNumber,
            orderId: order._id
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Payment verification error' });
    }
};
exports.verifyPayment = verifyPayment;
const handleRazorpayWebhook = async (req, res) => {
    try {
        const event = req.body.event;
        console.log(`[Razorpay Webhook] Event received: ${event}`);
        if (event === 'payment.captured') {
            const paymentEntity = req.body.payload.payment.entity;
            const razorpayOrderId = paymentEntity.order_id;
            const order = await Order_js_1.Order.findOne({ razorpayOrderId });
            if (order && order.paymentStatus !== Order_js_1.PaymentStatus.PAID) {
                order.paymentStatus = Order_js_1.PaymentStatus.PAID;
                order.orderStatus = Order_js_1.OrderStatus.CONFIRMED;
                order.razorpayPaymentId = paymentEntity.id;
                order.timeline.push({
                    status: Order_js_1.OrderStatus.CONFIRMED,
                    timestamp: new Date(),
                    updatedBy: 'Razorpay Webhook',
                    note: `Webhook verified payment: ${paymentEntity.id}`
                });
                await order.save();
                await (0, notificationService_js_1.dispatchOrderCreatedNotifications)(order);
            }
        }
        res.status(200).json({ status: 'ok' });
    }
    catch (error) {
        console.error('[Razorpay Webhook Error]:', error);
        res.status(500).json({ message: 'Webhook processing error' });
    }
};
exports.handleRazorpayWebhook = handleRazorpayWebhook;
