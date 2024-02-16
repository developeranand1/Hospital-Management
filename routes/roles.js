// routes/roles.js
const express = require('express');
const Role = require('../models/Role');

const router = express.Router();

// Create role endpoint
router.post('/create-role', async (req, res) => {
  try {
    const { name } = req.body;

    const newRole = new Role({ name });
    await newRole.save();

    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all roles endpoint
router.get('/get-roles', async (req, res) => {
  try {
    const roles = await Role.find();

    res.status(200).json({ roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
