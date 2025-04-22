// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

// Ensure uploads folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config for temporary storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

// Filter: Accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Only image files are allowed!', false);
  }
};

// Create multer upload instance
const multerUpload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  }
});

// Middleware to resize images after upload
const resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const MAX_DIMENSION = 8000; // Maximum allowed dimension
    
    // Get image info
    const imageInfo = await sharp(req.file.path).metadata();
    
    // Check if resizing is needed
    if (imageInfo.width > MAX_DIMENSION || imageInfo.height > MAX_DIMENSION) {
      // Calculate new dimensions while maintaining aspect ratio
      let newWidth = imageInfo.width;
      let newHeight = imageInfo.height;
      
      if (imageInfo.width > imageInfo.height && imageInfo.width > MAX_DIMENSION) {
        newWidth = MAX_DIMENSION;
        newHeight = Math.round(imageInfo.height * (MAX_DIMENSION / imageInfo.width));
      } else if (imageInfo.height > MAX_DIMENSION) {
        newHeight = MAX_DIMENSION;
        newWidth = Math.round(imageInfo.width * (MAX_DIMENSION / imageInfo.height));
      }
      
      // Resize the image
      await sharp(req.file.path)
        .resize(newWidth, newHeight)
        .toFile(`${req.file.path}.resized`);
      
      // Replace original with resized version
      fs.unlinkSync(req.file.path);
      fs.renameSync(`${req.file.path}.resized`, req.file.path);
    }
    
    next();
  } catch (error) {
    console.error('Image resizing error:', error);
    next(error);
  }
};

// Combined middleware
const upload = {
  single: (fieldName) => {
    return [
      multerUpload.single(fieldName),
      resizeImage
    ];
  }
};

export default upload;
