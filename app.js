// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/authenticate');
const authorize = require('./middleware/authorize');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);

mongoose.connect('mongodb+srv://apchaudhary6695:anand8126@cluster0.m0uykuj.mongodb.net/hm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.json());

const userRoute = require('./routes/User')
const protected=  require('./routes/protected');
const profileRoute = require('./routes/profile');
const doctorRoute = require('./routes/doctor');
const appointmentsRoute =require('./routes/appointment')
const patientRoute =require('./routes/patient');
const medicalRecordRoute = require('./routes/medicalRecord');
const prescriptionRoutes = require('./routes/prescription');
const invoiceRoutes = require("./routes/invoice");

const staffRoute = require("./routes/staff")
const departmentRoute = require("./routes/department");
const inventoryRoute = require('./routes/inventory');


// Routes
app.use('/auth',userRoute);
app.use('/protected', protected);
app.use('/profile', profileRoute);
app.use('/doctor', doctorRoute);
app.use('/patient',patientRoute);
app.use('/appointment', appointmentsRoute);
app.use('/medicalRecord',medicalRecordRoute);
app.use('/prescription', prescriptionRoutes);
app.use('/invoice', invoiceRoutes );
app.use("/staff", staffRoute)
app.use('/department', departmentRoute);

app.use('/inventory', inventoryRoute);

app.get('/protected/resource', authenticate, authorize(['read', 'write']), (req, res) => {
  res.status(200).json({ message: 'Access granted to protected resource' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




