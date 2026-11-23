import mongoose, { Document, Schema } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  basePrice: number;
  images: string[];
  availableWeights: string[];
  availableFlavours: string[];
  egglessAvailable: boolean;
  eggOptionAvailable: boolean;
  ingredients: string[];
  allergens: string[];
  preparationTimeHours: number;
  isBestSeller: boolean;
  isFeatured: boolean;
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  customizationOptions: {
    allowCustomMessage: boolean;
    maxMessageLength: number;
    allowCandles: boolean;
    allowPhotoUpload: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    basePrice: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    availableWeights: { type: [String], default: ['0.5 kg', '1 kg', '2 kg'] },
    availableFlavours: { type: [String], default: ['Belgian Chocolate', 'Vanilla', 'Red Velvet'] },
    egglessAvailable: { type: Boolean, default: true },
    eggOptionAvailable: { type: Boolean, default: true },
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: ['Gluten', 'Dairy'] },
    preparationTimeHours: { type: Number, default: 4 },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    averageRating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    customizationOptions: {
      allowCustomMessage: { type: Boolean, default: true },
      maxMessageLength: { type: Number, default: 35 },
      allowCandles: { type: Boolean, default: true },
      allowPhotoUpload: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text' });

export const Product = mongoose.model<IProductDocument>('Product', productSchema);

