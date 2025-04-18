// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes + DB
import connectDB from './Database/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Init app
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // handle JSON body
app.use(express.urlencoded({ extended: true })); // handle form-urlencoded (for multer)

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploads folder (important for images!)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default route
app.get('/', (req, res) => {
  res.send('🚀 DriftX Backend Running!');
});

// Error handling middleware (add this too!)
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🌐 Server running at: http://localhost:${PORT}`)
);
