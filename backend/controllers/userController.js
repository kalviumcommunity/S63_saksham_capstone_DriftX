import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Allow dependency injection for easier testing
export const __testExports = { User, bcrypt, generateToken };

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password, name, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
      name: name || '',
      phone: phone || '',
      profileImage: req.file ? `/uploads/${req.file.filename}` : '',
    });

    if (user) {
      const token = generateToken(user._id);

      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await __testExports.User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await __testExports.bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = __testExports.generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
