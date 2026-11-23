import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  applyCoupon
} from '../controllers/cartController.js';
import { optionalAuthenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(optionalAuthenticate);

router.get('/', getCart);
router.post('/items', addToCart);
router.patch('/items/:itemId', updateCartItem);
router.delete('/items/:itemId', removeCartItem);
router.post('/apply-coupon', applyCoupon);

export default router;

