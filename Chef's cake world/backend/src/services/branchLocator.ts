import { Branch, IBranchDocument } from '../models/Branch.js';

export interface PincodeResolutionResult {
  isServiceable: boolean;
  selectedBranch: IBranchDocument | null;
  deliveryFee: number;
  minOrderValue: number;
  estimatedDeliveryHours: number;
  availableDeliverySlots: any[];
  alternativeBranches: IBranchDocument[];
}

// Calculate distance in KM using Haversine formula
export const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const resolveBranchByPincode = async (
  pincode: string,
  userCoordinates?: { lat: number; lng: number }
): Promise<PincodeResolutionResult> => {
  const cleanPincode = pincode.trim();

  // Find all active branches that service this pincode
  const eligibleBranches = await Branch.find({
    isActive: true,
    serviceablePincodes: cleanPincode
  });

  if (!eligibleBranches || eligibleBranches.length === 0) {
    return {
      isServiceable: false,
      selectedBranch: null,
      deliveryFee: 0,
      minOrderValue: 0,
      estimatedDeliveryHours: 0,
      availableDeliverySlots: [],
      alternativeBranches: []
    };
  }

  let selectedBranch = eligibleBranches[0];

  // If user provided GPS coordinates, pick nearest branch
  if (userCoordinates && eligibleBranches.length > 1) {
    let minDistance = Infinity;
    for (const branch of eligibleBranches) {
      const dist = calculateDistanceKm(
        userCoordinates.lat,
        userCoordinates.lng,
        branch.coordinates.lat,
        branch.coordinates.lng
      );
      if (dist < minDistance) {
        minDistance = dist;
        selectedBranch = branch;
      }
    }
  }

  // Extract specific zone rule for this pincode from the selected branch
  const zoneConfig = selectedBranch.deliveryZones.find((z) => z.pincode === cleanPincode);
  const deliveryFee = zoneConfig ? zoneConfig.deliveryFee : 49;
  const minOrderValue = zoneConfig ? zoneConfig.minOrderValue : 499;
  const estimatedDeliveryHours = zoneConfig ? zoneConfig.estimatedDeliveryHours : 2;

  const activeSlots = selectedBranch.deliverySlots.filter((s) => s.isActive);

  return {
    isServiceable: true,
    selectedBranch,
    deliveryFee,
    minOrderValue,
    estimatedDeliveryHours,
    availableDeliverySlots: activeSlots,
    alternativeBranches: eligibleBranches.filter((b) => b._id.toString() !== selectedBranch._id.toString())
  };
};

