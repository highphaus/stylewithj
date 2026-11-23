import { Router } from 'express';
import {
  getBranches,
  checkPincodeAvailability,
  getBranchById,
  createBranch,
  updateBranch
} from '../controllers/branchController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.get('/', getBranches);
router.post('/check-pincode', checkPincodeAvailability);
router.get('/:id', getBranchById);
router.post('/', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN), createBranch);
router.put('/:id', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.BRANCH_MANAGER), updateBranch);

export default router;

