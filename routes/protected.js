// routes/protected.js
const express = require('express');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/admin',authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'Admin route accessed' });
});


router.get('/doctor',authenticate, authorize(['doctor']), (req, res) => {
  res.status(200).json({ message: 'Doctor route accessed' });
});

router.get('/patient',authenticate, authorize(['patient']), (req, res) => {
  res.status(200).json({ message: 'Patient route accessed' });
});

module.exports = router;
