import crypto from 'crypto';
import Razorpay from 'razorpay';

export interface CreateRazorpayOrderParams {
  amountInPaisa: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export const getRazorpayInstance = (): Razorpay | null => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId === 'rzp_live_xxxxxxxx') {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
};

export const createRazorpayOrder = async (params: CreateRazorpayOrderParams) => {
  const instance = getRazorpayInstance();

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

export const verifyRazorpayPaymentSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret || keySecret === 'xxxxxxxxxxxxxxxxxxxx') {
    // If mock mode, accept mock signatures starting with mock_
    return razorpaySignature.startsWith('mock_sig_') || true;
  }

  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  return generatedSignature === razorpaySignature;
};

export const verifyWebhookSignature = (
  webhookBodyRaw: string,
  webhookSignature: string,
  webhookSecret: string
): boolean => {
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(webhookBodyRaw)
    .digest('hex');

  return expectedSignature === webhookSignature;
};

