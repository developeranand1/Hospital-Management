const express = require('express');
const Department = require('../models/department');
const Staff = require('../models/staff');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all departments
router.get('/departments',  async (req, res) => {
  try {
    const departments = await Department.find().populate('headOfDepartment');
    res.status(200).json({ departments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new department
router.post('/departments', async (req, res) => {
  try {
    const { name, description, headOfDepartmentId } = req.body;

    // Check if the specified headOfDepartmentId is a valid Staff member
    const headOfDepartment = await Staff.findById(headOfDepartmentId);
    if (!headOfDepartment) {
      return res.status(404).json({ message: 'Head of department not found' });
    }

    const newDepartment = new Department({ name, description, headOfDepartment });
    await newDepartment.save();

    res.status(201).json({ message: 'Department added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
