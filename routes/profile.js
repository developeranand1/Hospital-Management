// routes/profile.js
const express = require('express');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Profile endpoint
router.get('/profile', authenticate, (req, res) => {
  const { username, role, email } = req.user;
  res.status(200).json({ username, role, email });
});

// Update profile endpoint
router.patch('/update-profile', authenticate, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { username, email } = req.body;
  
      // Update user profile
      await User.findByIdAndUpdate(userId, { username, email });
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
