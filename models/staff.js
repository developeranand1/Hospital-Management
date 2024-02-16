const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  personalDetails: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    contactInformation: {
      email: String,
      phoneNumber: String,
    },
  },
  shiftSchedule: {
    type: String,
  },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
