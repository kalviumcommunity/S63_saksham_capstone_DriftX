import Product from '../models/ProductSchema.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email');
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, category, stock, createdBy } = req.body;
    if (!name || !price || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      images: images || [],
      category,
      stock: stock || 0,
      createdBy
    });

    const savedProduct = await product.save();
    const populatedProduct = await savedProduct.populate('createdBy', 'name email');
    res.status(201).json(populatedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, images, category, stock, ratings, numReviews } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (images !== undefined) product.images = images;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (ratings !== undefined) product.ratings = ratings;
    if (numReviews !== undefined) product.numReviews = numReviews;

    const updatedProduct = await product.save();
    const populatedProduct = await updatedProduct.populate('createdBy', 'name email');
    res.status(200).json(populatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Get all products (simple version — optional)
export const getAllProducts = async (req, res) => {
  res.status(200).json({ message: 'All Products Fetched' });
};
