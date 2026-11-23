import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';
import { authenticate, optionalAuthenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.post('/', optionalAuthenticate, createOrder);
router.get('/my-orders', authenticate, getMyOrders);
router.get('/:id', getOrderById);
router.patch(
  '/:id/status',
  authenticate,
  authorizeRoles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.BRANCH_MANAGER,
    UserRole.BRANCH_STAFF,
    UserRole.DELIVERY_STAFF
  ),
  updateOrderStatus
);

export default router;

