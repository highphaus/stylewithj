"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBranch = exports.createBranch = exports.getBranchById = exports.checkPincodeAvailability = exports.getBranches = void 0;
const Branch_js_1 = require("../models/Branch.js");
const branchLocator_js_1 = require("../services/branchLocator.js");
const getBranches = async (req, res) => {
    try {
        const branches = await Branch_js_1.Branch.find({ isActive: true }).select('-deliveryZones');
        res.status(200).json({ success: true, branches });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching branches' });
    }
};
exports.getBranches = getBranches;
const checkPincodeAvailability = async (req, res) => {
    try {
        const { pincode, coordinates } = req.body;
        if (!pincode || String(pincode).trim().length !== 6) {
            res.status(400).json({ success: false, message: 'Please provide a valid 6-digit Indian PIN code.' });
            return;
        }
        const result = await (0, branchLocator_js_1.resolveBranchByPincode)(String(pincode), coordinates);
        if (!result.isServiceable || !result.selectedBranch) {
            res.status(200).json({
                success: true,
                isServiceable: false,
                message: `Currently we do not deliver directly to PIN code ${pincode}. However, self-pickup is available from all our flagship branches!`,
                availableBranchesForPickup: await Branch_js_1.Branch.find({ isActive: true }).select('name address city phone openingHours')
            });
            return;
        }
        res.status(200).json({
            success: true,
            isServiceable: true,
            message: `Great news! We deliver to ${pincode} from our ${result.selectedBranch.name}.`,
            branch: {
                id: result.selectedBranch._id,
                name: result.selectedBranch.name,
                address: result.selectedBranch.address,
                phone: result.selectedBranch.phone,
                city: result.selectedBranch.city,
                openingHours: result.selectedBranch.openingHours
            },
            deliveryFee: result.deliveryFee,
            minOrderValue: result.minOrderValue,
            estimatedDeliveryHours: result.estimatedDeliveryHours,
            deliverySlots: result.availableDeliverySlots
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error verifying pincode' });
    }
};
exports.checkPincodeAvailability = checkPincodeAvailability;
const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch_js_1.Branch.findById(id);
        if (!branch) {
            res.status(404).json({ success: false, message: 'Branch not found' });
            return;
        }
        res.status(200).json({ success: true, branch });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching branch' });
    }
};
exports.getBranchById = getBranchById;
const createBranch = async (req, res) => {
    try {
        const branch = await Branch_js_1.Branch.create(req.body);
        res.status(201).json({ success: true, message: 'Branch created successfully', branch });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Error creating branch' });
    }
};
exports.createBranch = createBranch;
const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch_js_1.Branch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!branch) {
            res.status(404).json({ success: false, message: 'Branch not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Branch updated successfully', branch });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Error updating branch' });
    }
};
exports.updateBranch = updateBranch;
