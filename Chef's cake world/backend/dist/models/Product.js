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
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
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
}, { timestamps: true });
productSchema.index({ name: 'text', description: 'text' });
exports.Product = mongoose_1.default.model('Product', productSchema);
