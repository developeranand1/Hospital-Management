// routes/appointment.js
const express = require('express');
const Appointment = require('../models/appointment');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient doctor');
    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new appointment
router.post('/appointments', async (req, res) => {
  try {
    const { patientId, doctorId, date, description } = req.body;

    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({ message: 'Patient or doctor not found' });
    }

    const newAppointment = new Appointment({ patient, doctor, date, description });
    await newAppointment.save();

    // Update patient and doctor with the new appointment
    patient.appointments.push(newAppointment);
    doctor.appointments.push(newAppointment);
    await patient.save();
    await doctor.save();

    res.status(201).json({ message: 'Appointment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
