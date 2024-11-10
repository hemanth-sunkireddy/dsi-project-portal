// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   studentId: String,
//   name: String,
//   dateTime: Date,
//   gender: String,
//   phoneNumber: String,
//   address: String,
//   pastHistory: String,
// });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateTime: Date,
  gender: String,
  phoneNumber: String,
  address: String,
  pastHistory: String,
});

module.exports = mongoose.model('Student', studentSchema);
