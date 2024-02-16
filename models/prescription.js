// models/Prescription.js
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
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
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
  }],
  instructions: {
    type: String,
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
