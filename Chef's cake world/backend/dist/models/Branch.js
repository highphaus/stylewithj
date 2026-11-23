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
exports.Branch = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const branchSchema = new mongoose_1.Schema({
    branchCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    serviceablePincodes: { type: [String], default: [], index: true },
    deliveryZones: [
        {
            pincode: { type: String, required: true },
            deliveryFee: { type: Number, default: 49 },
            estimatedDeliveryHours: { type: Number, default: 2 },
            minOrderValue: { type: Number, default: 499 }
        }
    ],
    openingHours: { type: String, default: '09:00 AM - 11:00 PM' },
    operatingDays: { type: [String], default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    branchManager: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    deliverySlots: [
        {
            slotId: { type: String, required: true },
            label: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            maxCapacity: { type: Number, default: 25 },
            isActive: { type: Boolean, default: true }
        }
    ],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.Branch = mongoose_1.default.model('Branch', branchSchema);
