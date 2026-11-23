import { Request, Response } from 'express';
import { Branch } from '../models/Branch.js';
import { resolveBranchByPincode } from '../services/branchLocator.js';

export const getBranches = async (req: Request, res: Response): Promise<void> => {
  try {
    const branches = await Branch.find({ isActive: true }).select('-deliveryZones');
    res.status(200).json({ success: true, branches });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching branches' });
  }
};

export const checkPincodeAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pincode, coordinates } = req.body;

    if (!pincode || String(pincode).trim().length !== 6) {
      res.status(400).json({ success: false, message: 'Please provide a valid 6-digit Indian PIN code.' });
      return;
    }

    const result = await resolveBranchByPincode(String(pincode), coordinates);

    if (!result.isServiceable || !result.selectedBranch) {
      res.status(200).json({
        success: true,
        isServiceable: false,
        message: `Currently we do not deliver directly to PIN code ${pincode}. However, self-pickup is available from all our branches!`,
        availableBranchesForPickup: await Branch.find({ isActive: true }).select('name address city phone openingHours')
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error verifying pincode' });
  }
};

export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id);
    if (!branch) {
      res.status(404).json({ success: false, message: 'Branch not found' });
      return;
    }
    res.status(200).json({ success: true, branch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching branch' });
  }
};

export const createBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json({ success: true, message: 'Branch created successfully', branch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || 'Error creating branch' });
  }
};

export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!branch) {
      res.status(404).json({ success: false, message: 'Branch not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Branch updated successfully', branch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || 'Error updating branch' });
  }
};

