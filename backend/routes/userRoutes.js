const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

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

// ✅ POST create new user
router.post('/', (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = {
      _id: uuidv4(),
      name,
      email,
      role,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// ✅ PUT update user by ID
router.put('/:id', (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userIndex = users.findIndex((u) => u._id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only if provided
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (role) users[userIndex].role = role;

    res.json(users[userIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
