import { Router } from 'express';
import { getCategories, createCategory, updateCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/rbacMiddleware.js';
import { UserRole } from '../models/User.js';

const router = Router();

router.get('/', getCategories);
router.post('/', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN), createCategory);
router.put('/:id', authenticate, authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN), updateCategory);

export default router;

