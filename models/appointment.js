const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    enum: ['appointment'],
    default: 'appointment',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
