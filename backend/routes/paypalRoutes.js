import express from 'express';
import { createPaypalOrder, capturePaypalOrder, handleWebhook } from '../controllers/paypalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createPaypalOrder);
router.post('/capture-order/:orderId', protect, capturePaypalOrder);
router.post('/webhook', handleWebhook);

export default router; 