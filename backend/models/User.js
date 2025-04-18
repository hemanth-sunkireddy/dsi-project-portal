
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // phone: { type: String, required: true, unique: true },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'], 
    default: 'Prefer not to say',
  },
  address: { type: String },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Admin","NGO Worker", "Doctor", "Therapist","Volunteer"], required: true },
});

module.exports = mongoose.model('User', userSchema);
