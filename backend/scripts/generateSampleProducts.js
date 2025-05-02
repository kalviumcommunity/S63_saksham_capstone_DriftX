import mongoose from 'mongoose';
import Product from '../models/ProductSchema.js';
import User from '../models/UserSchema.js';

const MONGODB_URI = 'mongodb://localhost:27017/driftx';

// Create a default admin user if not exists
const createAdminUser = async () => {
  try {
    let adminUser = await User.findOne({ email: 'admin@driftx.com' });
    
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin',
        username: 'admin',
        email: 'admin@driftx.com',
        password: 'admin123',
        isAdmin: true
      });
    }
    
    return adminUser._id;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

const mensShirtProducts = [
  {
    name: "Men's Regular Fit Casual Shirt",
    price: 499,
    mrp: 1499,
    description: "Classic casual shirt perfect for everyday wear",
    category: "Men",
    subCategory: "Shirts",
    images: [
      "https://m.media-amazon.com/images/I/61YPRyOtv0L._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61K6TxAiexL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61nJUPDEDkL._AC_UL480_FMwebp_QL65_.jpg"
    ],
    brand: "Dennis Lingo",
    rating: 4.5,
    reviews: 2589,
    isPrime: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "White", "Black"],
    stock: 50
  },
  {
    name: "Men's Slim Fit Cotton Casual Shirt",
    price: 449,
    mrp: 1849,
    description: "Slim fit casual shirt made from premium cotton",
    category: "Men",
    subCategory: "Shirts",
    images: [
      "https://m.media-amazon.com/images/I/61qcnAHZP3L._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61dR9E0xnOL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61Ow7m0WBOL._AC_UL480_FMwebp_QL65_.jpg"
    ],
    brand: "Allen Solly",
    rating: 4.3,
    reviews: 1876,
    isPrime: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Light Blue", "Pink", "White"],
    stock: 35
  },
  {
    name: "Men's Regular Fit Formal Shirt",
    price: 599,
    mrp: 1999,
    description: "Classic formal shirt for professional settings",
    category: "Men",
    subCategory: "Shirts",
    images: [
      "https://m.media-amazon.com/images/I/61ZipyCJ5KL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61ZcrK2mEjL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61y9FHMmJ+L._AC_UL480_FMwebp_QL65_.jpg"
    ],
    brand: "Van Heusen",
    rating: 4.6,
    reviews: 3245,
    isPrime: true,
    sizes: ["38", "40", "42", "44"],
    colors: ["White", "Light Blue", "Blue"],
    stock: 45
  },
  {
    name: "Men's Slim Fit Printed Casual Shirt",
    price: 399,
    mrp: 1299,
    description: "Trendy printed casual shirt with modern design",
    category: "Men",
    subCategory: "Shirts",
    images: [
      "https://m.media-amazon.com/images/I/71cFpnm0D6L._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/71jKwC9-44L._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/71shrF8MerL._AC_UL480_FMwebp_QL65_.jpg"
    ],
    brand: "The Indian Garage Co",
    rating: 4.2,
    reviews: 956,
    isPrime: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Printed Blue", "Printed Black"],
    stock: 30
  },
  {
    name: "Men's Classic Fit Business Shirt",
    price: 799,
    mrp: 2499,
    description: "Premium business shirt for formal occasions",
    category: "Men",
    subCategory: "Shirts",
    images: [
      "https://m.media-amazon.com/images/I/61XzMtVz3PL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61Iwq3QDTIL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61G1ZLzdBeL._AC_UL480_FMwebp_QL65_.jpg"
    ],
    brand: "Peter England",
    rating: 4.7,
    reviews: 1543,
    isPrime: true,
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["White", "Sky Blue", "Pink"],
    stock: 25
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get or create admin user
    const adminUserId = await createAdminUser();
    console.log('Admin user ready');

    // Clear existing products
    await Product.deleteMany({ category: "Men", subCategory: "Shirts" });
    console.log('Cleared existing men\'s shirts');

    // Add createdBy field to all products
    const productsWithCreator = mensShirtProducts.map(product => ({
      ...product,
      createdBy: adminUserId
    }));

    // Insert new products
    await Product.insertMany(productsWithCreator);
    console.log('Sample men\'s shirts added successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 