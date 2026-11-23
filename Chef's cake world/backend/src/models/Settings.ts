import mongoose, { Document, Schema } from 'mongoose';

export interface ISettingsDocument extends Document {
  businessName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  gstNumber?: string;
  fssaiNumber?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  taxRatePercent: number;
  codEnabled: boolean;
  deliveryEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettingsDocument>(
  {
    businessName: { type: String, default: "Chef's Cake World" },
    tagline: { type: String, default: 'Crafting Moments of Pure Bliss & Sweetness' },
    email: { type: String, default: 'contact@chefscakeworld.com' },
    phone: { type: String, default: '+91 98470 12345' },
    whatsappNumber: { type: String, default: '+91 98470 12345' },
    address: { type: String, default: 'Near KSRTC Bus Stand, Main Road, Attingal, Kerala 695101' },
    gstNumber: { type: String, default: '32AAAAA0000A1Z5' },
    fssaiNumber: { type: String, default: '11521000000123' },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/chefscakeworld' },
      facebook: { type: String, default: 'https://facebook.com/chefscakeworld' },
      youtube: { type: String, default: 'https://youtube.com/chefscakeworld' }
    },
    announcementBar: {
      enabled: { type: Boolean, default: true },
      text: { type: String, default: 'Special Celebration Offer: Get 10% OFF on all Birthday & Custom Designer Cakes! Use code: CHEF10' },
      link: { type: String, default: '/cakes' }
    },
    taxRatePercent: { type: Number, default: 5 },
    codEnabled: { type: Boolean, default: true },
    deliveryEnabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Settings = mongoose.model<ISettingsDocument>('Settings', settingsSchema);

