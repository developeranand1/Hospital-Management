// routes/resetPassword.js
const express = require('express');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate and store a reset token in the user document (you might need a resetToken field in your User model)
  const resetToken = generateResetToken();
  user.resetToken = resetToken;
  await user.save();

  // Send a password reset email
  sendPasswordResetEmail(email, resetToken);

  res.status(200).json({ message: 'Password reset email sent successfully' });
});

function generateResetToken() {
  // Implement your logic to generate a secure reset token
  // You might use a library like crypto or jwt
  // Example using crypto: crypto.randomBytes(20).toString('hex')
}

function sendPasswordResetEmail(email, resetToken) {
  // Implement your logic to send an email with the reset token
  // You might use a service like SendGrid or nodemailer
  // Example using nodemailer: create a transporter and send the email
}

module.exports = router;
