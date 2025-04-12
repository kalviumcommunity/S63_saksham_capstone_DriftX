const express = require('express');
const router = express.Router();

// Temporary dummy products array
const dummyProducts = [
  {
    _id: '1',
    name: 'AirPods Pro 2',
    description: 'Wireless earbuds with noise cancellation',
    price: 249,
    images: ['https://example.com/image.jpg'],
    category: 'Electronics',
    stock: 50,
    ratings: 4.5,
    numReviews: 100,
    createdBy: {
      name: 'Test User',
      email: 'test@example.com',
    },
    createdAt: new Date(),
  },
];

// GET all products
router.get('/', async (req, res) => {
  try {
    res.json(dummyProducts); // Return dummy data instead of DB
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = dummyProducts.find(p => p._id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

module.exports = router;
