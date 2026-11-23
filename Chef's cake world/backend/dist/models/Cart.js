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
exports.Cart = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', index: true, default: null },
    guestId: { type: String, index: true, default: null },
    branchId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Branch', default: null },
    pincode: { type: String, default: '' },
    items: [
        {
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
            productName: { type: String, required: true },
            productImage: { type: String, default: '' },
            productSlug: { type: String, default: '' },
            selectedWeight: { type: String, required: true },
            selectedFlavour: { type: String, required: true },
            isEggless: { type: Boolean, default: true },
            customMessage: { type: String, default: '' },
            candlesCount: { type: Number, default: 0 },
            accessories: { type: [String], default: [] },
            unitPrice: { type: Number, required: true },
            quantity: { type: Number, required: true, min: 1 },
            totalPrice: { type: Number, required: true }
        }
    ],
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    couponCode: { type: String, default: '' },
    totalAmount: { type: Number, default: 0 },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        index: { expires: '7d' }
    }
}, { timestamps: true });
exports.Cart = mongoose_1.default.model('Cart', cartSchema);
