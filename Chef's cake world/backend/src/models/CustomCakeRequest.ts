import mongoose, { Document, Schema } from 'mongoose';

export enum CustomCakeStatus {
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
  QUOTED = 'QUOTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ORDER_CREATED = 'ORDER_CREATED'
}

export interface ICustomCakeRequestDocument extends Document {
  requestNumber: string;
  customerName: string;
  mobile: string;
  email: string;
  occasion: string;
  flavour: string;
  weight: string;
  shape: string;
  theme: string;
  isEggless: boolean;
  cakeDesignDescription: string;
  referenceImages: string[];
  deliveryDate: string;
  deliveryLocation: string;
  pincode: string;
  preferredBranchId?: mongoose.Types.ObjectId;
  status: CustomCakeStatus;
  quotationAmount?: number;
  quotationNotes?: string;
  adminNotes?: string;
  convertedOrderId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const customCakeRequestSchema = new Schema<ICustomCakeRequestDocument>(
  {
    requestNumber: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    occasion: { type: String, required: true },
    flavour: { type: String, required: true },
    weight: { type: String, required: true },
    shape: { type: String, required: true },
    theme: { type: String, default: '' },
    isEggless: { type: Boolean, default: true },
    cakeDesignDescription: { type: String, required: true },
    referenceImages: { type: [String], default: [] },
    deliveryDate: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    pincode: { type: String, required: true },
    preferredBranchId: { type: Schema.Types.ObjectId, ref: 'Branch', default: null },
    status: {
      type: String,
      enum: Object.values(CustomCakeStatus),
      default: CustomCakeStatus.SUBMITTED,
      index: true
    },
    quotationAmount: { type: Number, default: 0 },
    quotationNotes: { type: String, default: '' },
    adminNotes: { type: String, default: '' },
    convertedOrderId: { type: Schema.Types.ObjectId, ref: 'Order', default: null }
  },
  { timestamps: true }
);

export const CustomCakeRequest = mongoose.model<ICustomCakeRequestDocument>('CustomCakeRequest', customCakeRequestSchema);

