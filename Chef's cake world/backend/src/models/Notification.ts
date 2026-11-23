import mongoose, { Document, Schema } from 'mongoose';

export interface INotificationDocument extends Document {
  recipientId?: mongoose.Types.ObjectId;
  role?: string;
  channel: 'EMAIL' | 'WHATSAPP' | 'IN_APP';
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: Date;
}

const notificationSchema = new Schema<INotificationDocument>(
  {
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    role: { type: String, default: null },
    channel: { type: String, enum: ['EMAIL', 'WHATSAPP', 'IN_APP'], default: 'IN_APP' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    data: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Notification = mongoose.model<INotificationDocument>('Notification', notificationSchema);

