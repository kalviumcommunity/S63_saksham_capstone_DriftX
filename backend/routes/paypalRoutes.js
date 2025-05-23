import express from 'express';
import { createPaypalOrder } from '../controllers/paypalController.js';

const router = express.Router();

router.post('/create-order', createPaypalOrder);

export default router; 