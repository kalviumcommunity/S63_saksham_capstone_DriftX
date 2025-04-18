import express from 'express';
import multer from 'multer';
import { registerUser, loginUser } from '../controllers/userController.js';

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

export default router;
