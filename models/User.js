// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'patient'],
    required: true,
  },
  email: String,
  resetToken: String,
  confirmed: {
    type: Boolean,
    default: false,
  },
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
