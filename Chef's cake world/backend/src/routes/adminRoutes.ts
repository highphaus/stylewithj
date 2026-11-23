import { Router } from 'express';
import {
  getDashboardOverview,
  getCustomers,
  getStoreSettings,
  updateStoreSettings,
  getAuditLogs
} from '../controllers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.use(authenticate);
router.use(authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.BRANCH_MANAGER));

router.get('/overview', getDashboardOverview);
router.get('/customers', getCustomers);
router.get('/settings', getStoreSettings);
router.put('/settings', authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN), updateStoreSettings);
router.get('/audit-logs', authorizeRoles(UserRole.SUPER_ADMIN), getAuditLogs);

export default router;

