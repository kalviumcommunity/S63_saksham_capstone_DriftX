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

// Dummy data for testing
const dummyProducts = [
  {
    _id: '1',
    name: 'Test Product 1',
    description: 'Description for Test Product 1',
    price: 99.99,
    countInStock: 10,
    category: 'Category 1',
    image: 'product1.jpg',
    createdAt: new Date()
  },
  {
    _id: '2',
    name: 'Test Product 2',
    description: 'Description for Test Product 2',
    price: 149.99,
    countInStock: 5,
    category: 'Category 2',
    image: 'product2.jpg',
    createdAt: new Date()
  }
];

// ✅ GET all products
router.get('/', (req, res) => {
  res.json(dummyProducts);
});

// ✅ GET single product by ID
router.get('/:id', (req, res) => {
  const product = dummyProducts.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// 🔐 CREATE product — only for admin
router.post('/', protect, isAdmin, (req, res) => {
  const newProduct = {
    ...req.body,
    _id: (dummyProducts.length + 1).toString(),
    createdAt: new Date()
  };
  dummyProducts.push(newProduct);
  res.status(201).json(newProduct);
});

// 🔐 UPDATE product — only for admin
router.put('/:id', protect, isAdmin, (req, res) => {
  const index = dummyProducts.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  dummyProducts[index] = { ...dummyProducts[index], ...req.body };
  res.json(dummyProducts[index]);
});

// 🔐 DELETE product — only for admin
router.delete('/:id', protect, isAdmin, (req, res) => {
  const index = dummyProducts.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  dummyProducts.splice(index, 1);
  res.json({ message: 'Product removed' });
});

export default router;
