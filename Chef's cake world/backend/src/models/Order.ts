import mongoose, { Document, Schema } from 'mongoose';

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  PREPARING = 'Preparing',
  READY_FOR_PICKUP = 'Ready for Pickup',
  READY_FOR_DISPATCH = 'Ready for Dispatch',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  REFUND_INITIATED = 'Refund Initiated',
  REFUNDED = 'Refunded'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  RAZORPAY = 'RAZORPAY',
  COD = 'COD'
}

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  productName: string;
  productImage: string;
  productSlug: string;
  selectedWeight: string;
  selectedFlavour: string;
  isEggless: boolean;
  customMessage?: string;
  candlesCount?: number;
  accessories?: string[];
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface IOrderTimeline {
  status: OrderStatus;
  timestamp: Date;
  updatedBy?: string;
  note?: string;
}

export interface IOrderDocument extends Document {
  orderNumber: string;
  customer: {
    userId?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
  };
  branch: {
    branchId: mongoose.Types.ObjectId;
    branchName: string;
    phone: string;
    address: string;
  };
  items: IOrderItem[];
  deliveryAddress: {
    fullName: string;
    phone: string;
    house: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    deliveryInstructions?: string;
  };
  deliveryType: 'DELIVERY' | 'PICKUP';
  deliveryDate: string;
  deliverySlot: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  orderNotes?: string;
  timeline: IOrderTimeline[];
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    branch: {
      branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true, index: true },
      branchName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true }
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productName: { type: String, required: true },
        productImage: { type: String, default: '' },
        productSlug: { type: String, default: '' },
        selectedWeight: { type: String, required: true },
        selectedFlavour: { type: String, required: true },
        isEggless: { type: Boolean, default: true },
        customMessage: { type: String, default: '' },
        candlesCount: { type: Number, default: 0 },
        accessories: { type: [String], default: [] },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        totalPrice: { type: Number, required: true }
      }
    ],
    deliveryAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      house: { type: String, required: true },
      street: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: { type: String, default: '' },
      deliveryInstructions: { type: String, default: '' }
    },
    deliveryType: { type: String, enum: ['DELIVERY', 'PICKUP'], default: 'DELIVERY' },
    deliveryDate: { type: String, required: true },
    deliverySlot: { type: String, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    couponCode: { type: String, default: '' },
    paymentMethod: { type: String, enum: Object.values(PaymentMethod), default: PaymentMethod.RAZORPAY },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING, index: true },
    orderNotes: { type: String, default: '' },
    timeline: [
      {
        status: { type: String, enum: Object.values(OrderStatus), required: true },
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: String, default: 'System' },
        note: { type: String, default: '' }
      }
    ],
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrderDocument>('Order', orderSchema);

