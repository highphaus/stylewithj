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
exports.Order = exports.PaymentMethod = exports.PaymentStatus = exports.OrderStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "Pending";
    OrderStatus["CONFIRMED"] = "Confirmed";
    OrderStatus["PREPARING"] = "Preparing";
    OrderStatus["READY_FOR_PICKUP"] = "Ready for Pickup";
    OrderStatus["READY_FOR_DISPATCH"] = "Ready for Dispatch";
    OrderStatus["OUT_FOR_DELIVERY"] = "Out for Delivery";
    OrderStatus["DELIVERED"] = "Delivered";
    OrderStatus["CANCELLED"] = "Cancelled";
    OrderStatus["REFUND_INITIATED"] = "Refund Initiated";
    OrderStatus["REFUNDED"] = "Refunded";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["RAZORPAY"] = "RAZORPAY";
    PaymentMethod["COD"] = "COD";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
const orderSchema = new mongoose_1.Schema({
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
        userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    branch: {
        branchId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Branch', required: true, index: true },
        branchName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
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
    deliveryAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        house: { type: String, required: true },
        street: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        landmark: { type: String, default: '' },
        deliveryInstructions: { type: String, default: '' }
    },
    deliveryType: { type: String, enum: ['DELIVERY', 'PICKUP'], default: 'DELIVERY' },
    deliveryDate: { type: String, required: true },
    deliverySlot: { type: String, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    couponCode: { type: String, default: '' },
    paymentMethod: { type: String, enum: Object.values(PaymentMethod), default: PaymentMethod.RAZORPAY },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING, index: true },
    orderNotes: { type: String, default: '' },
    timeline: [
        {
            status: { type: String, enum: Object.values(OrderStatus), required: true },
            timestamp: { type: Date, default: Date.now },
            updatedBy: { type: String, default: 'System' },
            note: { type: String, default: '' }
        }
    ],
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' }
}, { timestamps: true });
exports.Order = mongoose_1.default.model('Order', orderSchema);
