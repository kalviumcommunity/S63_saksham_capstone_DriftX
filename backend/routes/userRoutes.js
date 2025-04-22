import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser); // ✅ Add login route
router.put('/profile', protect, upload.single('avatar'), updateUser);
router.delete('/profile', protect, deleteUser);

export default router;
