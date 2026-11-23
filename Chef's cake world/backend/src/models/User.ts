import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  BRANCH_MANAGER = 'BRANCH_MANAGER',
  BRANCH_STAFF = 'BRANCH_STAFF',
  DELIVERY_STAFF = 'DELIVERY_STAFF',
  CUSTOMER = 'CUSTOMER'
}

export interface IUserDocument extends Document {
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: UserRole;
  branchId?: mongoose.Types.ObjectId;
  isActive: boolean;
  addresses?: mongoose.Types.ObjectId[];
  comparePassword(enteredPassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
      index: true
    },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', default: null },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUserDocument>('User', userSchema);

