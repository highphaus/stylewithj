import { Router } from 'express';
import {
  submitCustomCakeRequest,
  getCustomCakeRequests,
  provideQuotation,
  respondToQuotation
} from '../controllers/customCakeController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.post('/', submitCustomCakeRequest);
router.get('/', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.BRANCH_MANAGER), getCustomCakeRequests);
router.post('/:id/quote', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.BRANCH_MANAGER), provideQuotation);
router.post('/:id/respond', respondToQuotation);

export default router;

