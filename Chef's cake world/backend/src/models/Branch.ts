import mongoose, { Document, Schema } from 'mongoose';

export interface IDeliveryZone {
  pincode: string;
  deliveryFee: number;
  estimatedDeliveryHours: number;
  minOrderValue: number;
}

export interface IDeliverySlot {
  slotId: string;
  label: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  isActive: boolean;
}

export interface IBranchDocument extends Document {
  branchCode: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceablePincodes: string[];
  deliveryZones: IDeliveryZone[];
  openingHours: string;
  operatingDays: string[];
  branchManager?: mongoose.Types.ObjectId;
  deliverySlots: IDeliverySlot[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const branchSchema = new Schema<IBranchDocument>(
  {
    branchCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    serviceablePincodes: { type: [String], default: [], index: true },
    deliveryZones: [
      {
        pincode: { type: String, required: true },
        deliveryFee: { type: Number, default: 49 },
        estimatedDeliveryHours: { type: Number, default: 2 },
        minOrderValue: { type: Number, default: 499 }
      }
    ],
    openingHours: { type: String, default: '09:00 AM - 11:00 PM' },
    operatingDays: { type: [String], default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    branchManager: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    deliverySlots: [
      {
        slotId: { type: String, required: true },
        label: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        maxCapacity: { type: Number, default: 25 },
        isActive: { type: Boolean, default: true }
      }
    ],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Branch = mongoose.model<IBranchDocument>('Branch', branchSchema);

