import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET all products
router.get('/', getProducts);

// ✅ GET single product by ID
router.get('/:id', getProductById);

// 🔐 CREATE product — only for admin
router.post('/', protect, isAdmin, createProduct);

// 🔐 UPDATE product — only for admin
router.put('/:id', protect, isAdmin, updateProduct);

// 🔐 DELETE product — only for admin
router.delete('/:id', protect, isAdmin, deleteProduct);

export default router;
