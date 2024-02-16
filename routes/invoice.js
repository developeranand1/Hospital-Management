// routes/invoice.js
const express = require('express');
const Invoice = require('../models/invoice');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get all invoices
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('patient doctor');
    res.status(200).json({ invoices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get an invoice by ID
router.get('/invoices/:id',  async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('patient doctor');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/invoices',  async (req, res) => {
    try {
      const { patientId, doctorId, services, totalAmount } = req.body;
  
      // Check if patientId and doctorId are provided
      if (!patientId || !doctorId) {
        return res.status(400).json({ message: 'Patient and doctor are required' });
      }
  
      const newInvoice = new Invoice({
        patient: patientId,
        doctor: doctorId,
        services,
        totalAmount,
      });
  
      await newInvoice.save();
  
      res.status(201).json({ message: 'Invoice created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Mark an invoice as paid
router.put('/invoices/:id/pay',  async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    invoice.isPaid = true;
    await invoice.save();

    res.status(200).json({ message: 'Invoice marked as paid' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an invoice
router.delete('/invoices/:id',  async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
