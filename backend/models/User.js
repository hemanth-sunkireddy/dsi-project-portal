const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: [ 'NGO Worker', 'Doctor', 'Volunteer', 'Therapist'] },
});

module.exports = mongoose.model('User', userSchema);
