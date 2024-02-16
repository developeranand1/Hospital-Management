// routes/patient.js
const express = require('express');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find().populate('appointments');
    res.status(200).json({ patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/patients/:id',  async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id).populate('appointments');
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json({ patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Add new patient
router.post('/patients', async (req, res) => {
  try {
    const { name, age, gender, contactNumber, address } = req.body;
    const newPatient = new Patient({ name, age, gender, contactNumber, address });
    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/generate-patient-statistics', async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const malePatients = await Patient.countDocuments({ gender: 'Male' });
    const femalePatients = await Patient.countDocuments({ gender: 'Female' });

    const patientStatistics = {
      totalPatients,
      malePatients,
      femalePatients,
    };

    res.status(200).json(patientStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
