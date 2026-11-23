import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN), createProduct);
router.put('/:id', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.BRANCH_MANAGER), updateProduct);
router.delete('/:id', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN), deleteProduct);

export default router;

