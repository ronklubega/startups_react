const express = require('express');
const bcrypt = require('bcrypt');
const { createUser } = require('../lib/db.js'); // Import the createUser function from db.js

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming request body

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log('Validation failed: Missing fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword); // Log the hashed password

    const userId = await createUser({ name: username, email, password: hashedPassword });
    console.log('User ID:', userId); // Log the created user ID

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;