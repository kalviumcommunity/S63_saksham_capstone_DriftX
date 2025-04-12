const express = require('express');
const router = express.Router();

// Dummy users (password excluded)
const users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
  },
  {
    _id: '3',
    name: 'Saksham Gupta',
    email: 'saksham@example.com',
    role: 'customer',
  },
];

// ✅ GET all users
router.get('/', (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ✅ GET user by ID
router.get('/:id', (req, res) => {
  try {
    const user = users.find((user) => user._id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

module.exports = router;
