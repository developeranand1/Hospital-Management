// routes/prescription.js
const express = require('express');
const Prescription = require('../models/prescription');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all prescriptions
router.get('/prescriptions',  async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate('patient doctor');
    res.status(200).json({ prescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new prescription
router.post('/add-prescription',  async (req, res) => {
  try {
    const { patientId, doctorId, date, medications, instructions } = req.body;

    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({ message: 'Patient or doctor not found' });
    }

    const newPrescription = new Prescription({ patient, doctor, date, medications, instructions });
    await newPrescription.save();

    res.status(201).json({ message: 'Prescription added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update prescription
router.put('/update-prescription/:id', async (req, res) => {
  try {
    const { date, medications, instructions } = req.body;
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { date, medications, instructions },
      { new: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.status(200).json({ message: 'Prescription updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete prescription
router.delete('/delete-prescription/:id',  async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndRemove(req.params.id);

    if (!deletedPrescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
