// // const express = require('express');
// // const { register, login } = require('../controllers/authController');
// // const router = express.Router();

// // router.post('/register', register);
// // router.post('/login', login);

// // module.exports = router;

// const express = require('express');
// const { register, login } = require('../controllers/authController');
// const { addDoctor } = require('../controllers/doctorController');
// const { addStudent } = require('../controllers/studentController');
// const { addVolunteer } = require('../controllers/volunteerController');
// const { scheduleCamp } = require('../controllers/campController');

// const router = express.Router();

// // Authentication routes
// router.post('/register', register);
// router.post('/login', login);

// // Routes for adding entities
// router.post('/doctor/add', addDoctor);
// router.post('/student/add', addStudent);
// router.post('/volunteer/add', addVolunteer);
// router.post('/camp/schedule', scheduleCamp);

// module.exports = router;

const express = require('express');
const { register, login } = require('../controllers/authController');
const Doctor = require('../models/Doctor');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');
const Camp = require('../models/Camp');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Add Doctor
router.post('/addDoctor', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error });
  }
});

// Add Student
router.post('/addStudent', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
});

// Add Volunteer
router.post('/addVolunteer', async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ message: 'Volunteer added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding volunteer', error });
  }
});

// Schedule Camp
router.post('/scheduleCamp', async (req, res) => {
  try {
    const camp = new Camp(req.body);
    await camp.save();
    res.status(201).json({ message: 'Camp scheduled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling camp', error });
  }
});

module.exports = router;
