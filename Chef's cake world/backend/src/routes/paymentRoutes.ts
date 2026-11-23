import { Router } from 'express';
import { verifyPayment, handleRazorpayWebhook } from '../controllers/paymentController.js';

const router = Router();

router.post('/verify', verifyPayment);
router.post('/webhook', handleRazorpayWebhook);

export default router;

