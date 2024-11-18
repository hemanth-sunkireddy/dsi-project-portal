// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, enum: [ 'NGO Worker', 'Doctor', 'Volunteer', 'Therapist'] },
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String },
  address: { type: String },
  email: { type: String, unique: false, sparse: true }, // Mark `email` as non-unique and sparse
  role: { type: String, required: true, enum: ['Admin','NGO Worker', 'Doctor'] },
  isApproved: { type: Boolean, default: false }, // Admin approval
});

module.exports = mongoose.model('User', userSchema);
