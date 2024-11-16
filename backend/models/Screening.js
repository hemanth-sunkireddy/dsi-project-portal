// const mongoose = require('mongoose');

// // Screening schema
// const screeningSchema = new mongoose.Schema({
//   doctor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Doctor', // Reference to the Doctor model
//     required: false, // Optional field, can be added after the screening
//   },
//   volunteer: {
//     type: String,
//     // ref: 'Volunteer', // Reference to the Volunteer model
//     required: true,
//   },
//   student: {
//     type: String,
//     // ref: 'Student', // Reference to the Student model
//     required: true,
//   },
//   camp: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Camp', // Reference to the Camp model
//     required: true,
//   },
//   report: {
//     type: String, // Stores the screening report
//     required: false, // Optional field, can be added after the screening
//   },
//   time: {
//     type: Date, // Date and time of the screening
//     default: Date.now, // Default to the current date and time
//   },
// });

// module.exports = mongoose.model('Screening', screeningSchema);

const mongoose = require('mongoose');

// Screening schema
const screeningSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the Doctor model
    required: false, // Optional field, can be added after the screening
  },
  volunteer: {
    type: String, // Storing the volunteer as a string
    required: true, // Required field
  },
  student: {
    type: String,
    required: true,
  },
  camp: {
    type: String,
    // ref: 'Camp', // Reference to the Camp model
    required: true,
  },
  report: {
    type: String, // Stores the screening report
    required: false, // Optional field, can be added after the screening
  },
  time: {
    type: Date, // Date and time of the screening
    default: Date.now, // Default to the current date and time
  },
});

module.exports = mongoose.model('Screening', screeningSchema);
