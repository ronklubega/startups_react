const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, createPatient, connectToDatabase } = require('../lib/db.js'); // Import the createUser, createPatient, and connectToDatabase functions from db.js

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
  // if (!firstName || !lastName || dob || !telephone || !email) {
  //   console.log('Validation failed: Missing required fields');
  //   return res.status(400).json({ error: 'First Name, Last Name, DOB, Telephone, and Email are required' });
  // }

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

router.get('/patients/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const conn = await connectToDatabase();
    const [rows] = await conn.query(
      'SELECT patientNo, firstName, lastName, dob, insurance FROM patient WHERE firstName LIKE ? OR lastName LIKE ? OR patientNo LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`]
      
    );
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error searching patients:', error);
    res.status(500).json({ error: 'Failed to search patients' });
  }
});

//creating visit backend 
router.post('/createVisit', async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming request body

  const { patientNo, patientName, dob, visitDate, insurance, cash, service, doctor, speciality } = req.body;

  // Validate required fields
  if (!patientNo || !patientName || !visitDate || !service || !doctor || !speciality) {
    console.log('Validation failed: Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Convert dob and visitDate to YYYY-MM-DD format
    const formattedDob = new Date(dob).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    const formattedVisitDate = new Date(visitDate).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    // Generate a unique visit number
    const visitNumber = `VISIT-${Date.now().toString().slice(-4)}`; // Example: VISIT-1683456789012

    // Save the visit to the database
    const conn = await connectToDatabase();
    const [result] = await conn.query(
      'INSERT INTO visits (patientNo, patientName, dob, visitDate, insurance, cash, service, doctor, speciality, visitNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [patientNo, patientName, dob, visitDate, insurance, cash, service, doctor, speciality, visitNumber]
    );

    console.log('Visit created with ID:', result.insertId); // Log the created visit ID
    res.status(201).json({ message: 'Visit created successfully', visitNumber });
  } catch (error) {
    console.error('Error creating visit:', error);
    res.status(500).json({ error: 'Failed to create visit' });
  }
});

module.exports = router;