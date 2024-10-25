// server/controllers/authController.js
const { registerUser } = require('../models/userModel');

// Handle user registration
const register = async (req, res) => {
  const { email, name, password } = req.body;
  
  if (!email || !name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    await registerUser({ email, name, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

module.exports = { register };
