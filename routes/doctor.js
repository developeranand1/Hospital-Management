const express = require('express');
const Doctor = require('../models/doctor');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('appointments');
    res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new doctor
router.post('/doctors',  async (req, res) => {
  try {
    const { name, specialization, contactNumber } = req.body;
    const newDoctor = new Doctor({ name, specialization, contactNumber });
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
