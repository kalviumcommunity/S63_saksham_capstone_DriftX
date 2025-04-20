import express from 'express';
import Product from '../models/Productschema.js';
import User from '../models/UserSchema.js';

const router = express.Router();

// ✅ GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email');
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// ✅ GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// ✅ POST create new product
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      category,
      stock,
      createdBy
    } = req.body;

    if (!name || !price || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      images: images || [],
      category,
      stock: stock || 0,
      createdBy
    });

    const savedProduct = await newProduct.save();
    const populatedProduct = await savedProduct.populate('createdBy', 'name email');

    res.status(201).json(populatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// ✅ PUT update product by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      category,
      stock,
      ratings,
      numReviews
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (images) product.images = images;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (ratings !== undefined) product.ratings = ratings;
    if (numReviews !== undefined) product.numReviews = numReviews;

    const updatedProduct = await product.save();
    const populatedProduct = await updatedProduct.populate('createdBy', 'name email');

    res.json(populatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// ✅ DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router; // ✅ IMPORTANT