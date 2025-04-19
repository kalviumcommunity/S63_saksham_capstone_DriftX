import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { username, email, password, name, phone } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      name: name || '',
      phone: phone || '',
      profileImage: req.file ? `/uploads/${req.file.filename}` : '',
    });

    if (user) {
      // Generate token
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

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
