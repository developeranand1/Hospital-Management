const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  headOfDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
  },
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;