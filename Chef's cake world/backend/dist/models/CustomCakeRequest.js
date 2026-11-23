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
exports.CustomCakeRequest = exports.CustomCakeStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var CustomCakeStatus;
(function (CustomCakeStatus) {
    CustomCakeStatus["SUBMITTED"] = "SUBMITTED";
    CustomCakeStatus["REVIEWED"] = "REVIEWED";
    CustomCakeStatus["QUOTED"] = "QUOTED";
    CustomCakeStatus["ACCEPTED"] = "ACCEPTED";
    CustomCakeStatus["REJECTED"] = "REJECTED";
    CustomCakeStatus["ORDER_CREATED"] = "ORDER_CREATED";
})(CustomCakeStatus || (exports.CustomCakeStatus = CustomCakeStatus = {}));
const customCakeRequestSchema = new mongoose_1.Schema({
    requestNumber: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    occasion: { type: String, required: true },
    flavour: { type: String, required: true },
    weight: { type: String, required: true },
    shape: { type: String, required: true },
    theme: { type: String, default: '' },
    isEggless: { type: Boolean, default: true },
    cakeDesignDescription: { type: String, required: true },
    referenceImages: { type: [String], default: [] },
    deliveryDate: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    pincode: { type: String, required: true },
    preferredBranchId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Branch', default: null },
    status: {
        type: String,
        enum: Object.values(CustomCakeStatus),
        default: CustomCakeStatus.SUBMITTED,
        index: true
    },
    quotationAmount: { type: Number, default: 0 },
    quotationNotes: { type: String, default: '' },
    adminNotes: { type: String, default: '' },
    convertedOrderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order', default: null }
}, { timestamps: true });
exports.CustomCakeRequest = mongoose_1.default.model('CustomCakeRequest', customCakeRequestSchema);
