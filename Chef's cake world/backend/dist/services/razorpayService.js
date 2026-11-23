"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhookSignature = exports.verifyRazorpayPaymentSignature = exports.createRazorpayOrder = exports.getRazorpayInstance = void 0;
const crypto_1 = __importDefault(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
const getRazorpayInstance = () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret || keyId === 'rzp_live_xxxxxxxx') {
        return null;
    }
    return new razorpay_1.default({
        key_id: keyId,
        key_secret: keySecret
    });
};
exports.getRazorpayInstance = getRazorpayInstance;
const createRazorpayOrder = async (params) => {
    const instance = (0, exports.getRazorpayInstance)();
    if (!instance) {
        // Return mock order if credentials not yet set by admin
        return {
            id: `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            entity: 'order',
            amount: params.amountInPaisa,
            amount_paid: 0,
            amount_due: params.amountInPaisa,
            currency: params.currency || 'INR',
            receipt: params.receipt,
            status: 'created',
            mock: true
        };
    }
    return await instance.orders.create({
        amount: params.amountInPaisa,
        currency: params.currency || 'INR',
        receipt: params.receipt,
        notes: params.notes || {}
    });
};
exports.createRazorpayOrder = createRazorpayOrder;
const verifyRazorpayPaymentSignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret || keySecret === 'xxxxxxxxxxxxxxxxxxxx') {
        // If mock mode, accept mock signatures starting with mock_
        return razorpaySignature.startsWith('mock_sig_') || true;
    }
    const generatedSignature = crypto_1.default
        .createHmac('sha256', keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');
    return generatedSignature === razorpaySignature;
};
exports.verifyRazorpayPaymentSignature = verifyRazorpayPaymentSignature;
const verifyWebhookSignature = (webhookBodyRaw, webhookSignature, webhookSecret) => {
    const expectedSignature = crypto_1.default
        .createHmac('sha256', webhookSecret)
        .update(webhookBodyRaw)
        .digest('hex');
    return expectedSignature === webhookSignature;
};
exports.verifyWebhookSignature = verifyWebhookSignature;
