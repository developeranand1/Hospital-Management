// routes/auth.js
const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const nodemailer = require('nodemailer');




const router = express.Router();




// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!['admin', 'doctor', 'patient'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({
      username,
      password,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', authenticate, (req, res) => {
  res.status(200).json({ token: req.token });
});

function sendConfirmationEmail(email) {
  // Implement your logic to send an email with a confirmation link
  // You might use a service like SendGrid or nodemailer
  // Example using nodemailer: create a transporter and send the email
}

module.exports = router;
