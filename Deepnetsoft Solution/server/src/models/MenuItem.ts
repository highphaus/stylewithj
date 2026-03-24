import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description?: string;
  price: number;
  menuId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    menuId: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
