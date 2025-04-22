import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

// Dummy users for testing
const dummyUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false
  },
  {
    _id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true
  }
];

// 🔐 Middleware to protect routes (JWT verification)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Handle dummy tokens for testing
      if (token.startsWith('dummy-token-')) {
        const userId = token.split('-')[2];
        req.user = dummyUsers.find(u => u._id === userId);
        if (!req.user) {
          return res.status(401).json({ message: 'User not found' });
        }
        return next();
      }

      // Regular JWT verification
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// 🛡 Middleware to check admin status
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

export { protect, isAdmin };
