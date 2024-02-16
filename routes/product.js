// Example: routes/product.js
const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Product = require('../models/product');

const router = express.Router();

// Create product endpoint accessible only to users with the 'admin' role
router.post('/create-product',async (req, res) => {
  try {
    const { name, price, status } = req.body;
    const userId = req.user.userId;

    // Create a new product
    const newProduct = new Product({
      name,
      price,
      status,
      user: userId,
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all products endpoint accessible to all authenticated users
router.get('/get-products', async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.find();
  
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
