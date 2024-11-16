const express = require('express');
const { register, login, getUserDetails } = require('../controllers/authController');
const Doctor = require('../models/Doctor');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');
const Camp = require('../models/Camp');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User')
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUserDetails);

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
    if(student.status == undefined){
      student.status = "registered";
    }
    const campId_request = student.campId;
    const camp = await Camp.findOne({ campID: campId_request });
    if (!camp) {
      // If the camp is not found, send an error response
      return res.status(404).json({ message: 'Camp not found' });
    }

    camp.studentsRegistered += 1;
    await camp.save();
    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
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

// Schedule a new camp
router.post('/scheduleCamp', async (req, res) => {
  try {
    const camp = new Camp(req.body);
    await camp.save();
    res.status(201).json({ message: 'Camp scheduled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling camp', error });
  }
});

// Fetch all camps
router.get('/camps', async (req, res) => {
  try {
    const camps = await Camp.find();
    res.json(camps);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch camps', error });
  }
});

// Fetch all users
router.get('/students', async (req, res) => { 
  try {
    const students = await Student.find(); 
    res.status(200).json(students);
  } catch (error) {
    res.json({ message: 'Failed to fetch Students', error });
  }
});
router.get('/profiledata/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name)
  const document = await User.findOne({ name });
  console.log(document)
  res.json({ document });
});
router.put('/updateprofile/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const updates = req.body;
    
    const result = await User.findOneAndUpdate(
      { name: name },
      { $set: updates },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully', user: result });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});
module.exports = router;
