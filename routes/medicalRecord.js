// routes/medicalRecord.js
const express = require('express');
const MedicalRecord = require('../models/medicalRecord');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all medical records
router.get('/medical-records', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find().populate('patient doctor');
    res.status(200).json({ medicalRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new medical record
router.post('/add-medical-record',  async (req, res) => {
  try {
    const { patientId, doctorId, date, description } = req.body;

    const medicalRecord = new MedicalRecord({ patient: patientId, doctor: doctorId, date, description });
    await medicalRecord.save();

    res.status(201).json({ message: 'Medical record added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update medical record
router.put('/update-medical-record/:id', async (req, res) => {
  try {
    const { date, description } = req.body;

    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      { date, description },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    res.status(200).json({ message: 'Medical record updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete medical record
router.delete('/delete-medical-record/:id', async (req, res) => {
  try {
    const deletedRecord = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
