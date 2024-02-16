// Assuming you have a Billing model in your database
const Billing = mongoose.model('Billing', {
    patientId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    // other billing details...
  });
  
  app.get('/generate-financial-report', async (req, res) => {
    try {
      const totalRevenue = await Billing.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
  
      res.status(200).json({ totalRevenue: totalRevenue[0].total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  