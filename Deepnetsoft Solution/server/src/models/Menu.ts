import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  description?: string;
  parentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MenuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Menu', default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IMenu>('Menu', MenuSchema);
