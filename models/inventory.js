const mongoose =require('mongoose');

const InventoryItem = mongoose.Schema( {
    name: String,
    type: String, // Medicine, Equipment, Consumable, etc.
    quantity: Number,
    threshold: Number, // Threshold for low inventory alert
  });

  const Inventory = mongoose.model('Inventory', InventoryItem);

  module.exports = Inventory;























// // Assuming you have an Inventory model in your database
// const Inventory = mongoose.model('Inventory', {
//     name: String,
//     quantity: Number,
//     // other inventory details...
//   });
  
//   app.get('/generate-inventory-report', async (req, res) => {
//     try {
//       const inventoryItems = await Inventory.find();
  
//       res.status(200).json(inventoryItems);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });
  