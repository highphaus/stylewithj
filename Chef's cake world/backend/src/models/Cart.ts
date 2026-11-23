import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItemSchema {
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

export interface ICartDocument extends Document {
  userId?: mongoose.Types.ObjectId;
  guestId?: string;
  branchId?: mongoose.Types.ObjectId;
  pincode?: string;
  items: ICartItemSchema[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  couponCode?: string;
  totalAmount: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICartDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, default: null },
    guestId: { type: String, index: true, default: null },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', default: null },
    pincode: { type: String, default: '' },
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
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    couponCode: { type: String, default: '' },
    totalAmount: { type: Number, default: 0 },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      index: { expires: '7d' }
    }
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICartDocument>('Cart', cartSchema);

