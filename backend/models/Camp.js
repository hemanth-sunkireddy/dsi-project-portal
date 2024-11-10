// const mongoose = require('mongoose');

// const campSchema = new mongoose.Schema({
//   schoolName: String,
//   location: String,
//   dateTime: Date,
//   volunteer: String,
//   doctor: String,
//   contact: String,
//   furtherDetails: String,
// });

// module.exports = mongoose.model('Camp', campSchema);

const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  location: String,
  dateTime: Date,
  volunteer: String,
  doctor: String,
  contact: String,
  furtherDetails: String,
});

module.exports = mongoose.model('Camp', campSchema);
