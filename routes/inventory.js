const express = require('express');

const Inventory = require('../models/inventory');

const authorize = require('../middleware/authorize');

const router = express.Router();


router.get('/inventory', async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.status(200).json(inventory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Endpoint to add a new inventory item
  router.post('/inventory', async (req, res) => {
    try {
      const { name, type, quantity, threshold } = req.body;
      const newItem = new Inventory({
        name,
        type,
        quantity,
        threshold,
      });
      await newItem.save();
      res.status(201).json({ message: 'Inventory item added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Endpoint to set up alerts for low inventory levels
  router.get('/low-inventory-alerts', async (req, res) => {
    try {
      const lowInventoryItems = await Inventory.find({ quantity: { $lte: '$threshold' } });
      res.status(200).json(lowInventoryItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Endpoint to view usage statistics
  router.get('/usage-statistics', async (req, res) => {
    try {
      const totalItems = await Inventory.countDocuments();
      const totalQuantity = await Inventory.aggregate([{ $group: { _id: null, total: { $sum: '$quantity' } } }]);
      res.status(200).json({ totalItems, totalQuantity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports = router;