const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure the User model is correctly imported

const router = express.Router();

// User registration API
router.post('/register-user', async (req, res) => {
  const { name, course, dob, email, password } = req.body;

  // Basic validation to ensure all fields are provided
  if (!name || !course || !dob || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user to DB
    const newUser = new User({
      name,
      course,
      dob,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // More detailed error logging for debugging
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
