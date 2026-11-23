"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const settingsSchema = new mongoose_1.Schema({
    businessName: { type: String, default: "Chef's Cake World" },
    tagline: { type: String, default: 'Crafting Moments of Pure Bliss & Sweetness' },
    email: { type: String, default: 'contact@chefscakeworld.com' },
    phone: { type: String, default: '+91 98200 12345' },
    whatsappNumber: { type: String, default: '+91 98200 12345' },
    address: { type: String, default: 'Shop 4, Hill Road, Bandra West, Mumbai, MH 400050' },
    gstNumber: { type: String, default: '27AAAAA0000A1Z5' },
    fssaiNumber: { type: String, default: '11521000000123' },
    socialLinks: {
        instagram: { type: String, default: 'https://instagram.com/chefscakeworld' },
        facebook: { type: String, default: 'https://facebook.com/chefscakeworld' },
        youtube: { type: String, default: 'https://youtube.com/chefscakeworld' }
    },
    announcementBar: {
        enabled: { type: Boolean, default: true },
        text: { type: String, default: '🎉 Special Celebration Offer: Get 10% OFF on all Birthday & Custom Designer Cakes! Use code: CHEF10' },
        link: { type: String, default: '/cakes' }
    },
    taxRatePercent: { type: Number, default: 5 },
    codEnabled: { type: Boolean, default: true },
    deliveryEnabled: { type: Boolean, default: true }
}, { timestamps: true });
exports.Settings = mongoose_1.default.model('Settings', settingsSchema);
