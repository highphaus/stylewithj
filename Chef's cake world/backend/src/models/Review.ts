import mongoose, { Document, Schema } from 'mongoose';

export interface IReviewDocument extends Document {
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  isApproved: boolean;
  branchId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', default: null }
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReviewDocument>('Review', reviewSchema);

