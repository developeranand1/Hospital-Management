const express = require('express');
const Staff = require('../models/staff');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all staff members
router.get('/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({ staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new staff member
router.post('/staff',  async (req, res) => {
  try {
    const { name, role, contactInformation, shiftSchedule } = req.body;
    const newStaff = new Staff({ personalDetails: { name, role, contactInformation }, shiftSchedule });
    await newStaff.save();
    res.status(201).json({ message: 'Staff member added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
