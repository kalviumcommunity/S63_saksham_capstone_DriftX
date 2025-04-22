// backend/routes/uploadRoutes.js
import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import path from 'path';
import { protect, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

// @desc    Upload image
// @route   POST /api/upload
// @access  Public
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Send full path if needed for preview or saving
    const imagePath = `/uploads/${req.file.filename}`;

    res.status(200).json({ imagePath });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

export default router;
