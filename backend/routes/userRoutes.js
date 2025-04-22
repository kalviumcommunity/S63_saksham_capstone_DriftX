import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dummy data for testing
const dummyUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
    avatar: 'avatar1.jpg',
    createdAt: new Date()
  },
  {
    _id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true,
    avatar: 'avatar2.jpg',
    createdAt: new Date()
  }
];

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

// Register user
router.post('/register', upload.single('avatar'), (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    _id: (dummyUsers.length + 1).toString(),
    name,
    email,
    password,
    isAdmin: false,
    avatar: req.file ? req.file.filename : 'default.jpg',
    createdAt: new Date()
  };
  dummyUsers.push(newUser);
  res.status(201).json(newUser);
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = dummyUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: 'dummy-token-' + user._id
  });
});

// Update user profile
router.put('/profile', protect, upload.single('avatar'), (req, res) => {
  const user = dummyUsers.find(u => u._id === req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  Object.assign(user, req.body);
  if (req.file) {
    user.avatar = req.file.filename;
  }
  res.json(user);
});

// Delete user profile
router.delete('/profile', protect, (req, res) => {
  const index = dummyUsers.findIndex(u => u._id === req.user._id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  dummyUsers.splice(index, 1);
  res.json({ message: 'User removed' });
});

export default router;
