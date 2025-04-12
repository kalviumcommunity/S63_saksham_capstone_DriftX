const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // For generating unique _id

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

// ✅ GET all products
router.get('/', (req, res) => {
  try {
    res.json(dummyProducts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// ✅ GET product by ID
router.get('/:id', (req, res) => {
  try {
    const product = dummyProducts.find(p => p._id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// ✅ POST create new product
router.post('/', (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      category,
      stock,
      createdBy,
    } = req.body;

    if (!name || !description || !price || !category || !stock || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = {
      _id: uuidv4(),
      name,
      description,
      price,
      images: images || [],
      category,
      stock,
      ratings: 0,
      numReviews: 0,
      createdBy,
      createdAt: new Date(),
    };

    dummyProducts.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

module.exports = router;
