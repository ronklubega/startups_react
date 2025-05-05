const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, createPatient } = require('../lib/db.js'); // Import the createUser and createPatient functions from db.js

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

// Route to register a patient
router.post('/registerPatient', async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming request body

  const { firstName, lastName, dob, nextOfKin, occupation, insurance,insNo, address, telephone, email } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !dob || !telephone || !email) {
    console.log('Validation failed: Missing required fields');
    return res.status(400).json({ error: 'First Name, Last Name, DOB, Telephone, and Email are required' });
  }

  try {
    // Save the patient to the database
    const patientId = await createPatient({
      firstName,
      lastName,
      dob,
      nextOfKin,
      occupation,
      insurance,
      insNo,
      address,
      telephone,
      email,
    });

    console.log('Patient ID:', patientId); // Log the created patient ID
    res.status(201).json({ message: 'Patient registered successfully', patientId });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ error: 'Failed to register patient' });
  }
});

module.exports = router;