import mongoose, { Document, Schema } from 'mongoose';

export interface IBranchInventoryDocument extends Document {
  branchId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  isAvailable: boolean;
  dailyCapacity: number;
  currentBookings: number;
  lastUpdated: Date;
}

const branchInventorySchema = new Schema<IBranchInventoryDocument>(
  {
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    isAvailable: { type: Boolean, default: true },
    dailyCapacity: { type: Number, default: 50 },
    currentBookings: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

branchInventorySchema.index({ branchId: 1, productId: 1 }, { unique: true });

export const BranchInventory = mongoose.model<IBranchInventoryDocument>('BranchInventory', branchInventorySchema);

