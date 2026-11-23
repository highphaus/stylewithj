import mongoose, { Document, Schema } from 'mongoose';

export interface IPaymentDocument extends Document {
  orderId: mongoose.Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  method: string;
  errorDetails?: Record<string, any>;
  webhookReceivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPaymentDocument>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    razorpayOrderId: { type: String, required: true, index: true },
    razorpayPaymentId: { type: String, default: '' },
    razorpaySignature: { type: String, default: '' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
      index: true
    },
    method: { type: String, default: 'RAZORPAY' },
    errorDetails: { type: Schema.Types.Mixed, default: null },
    webhookReceivedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPaymentDocument>('Payment', paymentSchema);

