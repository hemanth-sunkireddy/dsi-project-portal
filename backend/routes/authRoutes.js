const express = require('express');
const { register, login, getUserDetails } = require('../controllers/authController');
const Doctor = require('../models/Doctor');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');
const Camp = require('../models/Camp');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User')
const Meeting = require('../models/Meeting')
const router = express.Router();
const { Screening } = require('../models/Screening');
const { addScreening, updateScreening } = require('../controllers/screeningcontroller'); // Adjust the path
const { ChatbotInteraction, ChatbotSettings } = require('../models/Chatbot');
const { addInitialPreset, getSettingsByTestId, createChatbotInteraction, updateChatbotInteraction } = require('../controllers/Chatbotcontroller'); // Adjust the path

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
    if (student.status == undefined) {
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
    // Find the last created camp by sorting in descending order of _id (or another unique field)
    const lastCamp = await Camp.findOne().sort({ _id: -1 }).exec();

    let nextCampNumber = 1; // Default to 1 if no camps exist
    if (lastCamp && lastCamp.campID) {
      const lastCampNumber = parseInt(lastCamp.campID.split('-')[1]); // Extract the number from 'Camp-X'
      if (!isNaN(lastCampNumber)) {
        nextCampNumber = lastCampNumber + 1;
      }
    }

    // Create the new camp with the incremented Camp ID
    const newCamp = new Camp({
      ...req.body, // Spread the request body to include all other camp data
      campID: `Camp-${nextCampNumber}` // Auto-generate Camp ID
    });

    await newCamp.save();
    res.status(201).json({ message: 'Camp scheduled successfully', camp: newCamp });
  } catch (error) {
    console.error('Error scheduling camp:', error);
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

router.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
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

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.json({ message: 'Failed to fetch Users', error });
  }
});

router.get('/profiledatad/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name)
  const document = await Doctor.findOne({ name });
  console.log(document)
  res.json({ document });
});
router.get('/profiledatav/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name)
  const document = await Volunteer.findOne({ name });
  console.log(document)
  res.json({ document });
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

router.post('/scheduleMeeting', async (req, res) => {
  const { campID, status, meetingDate, meetingTime, doctor } = req.body;
  try {
    const camp = await Camp.findOne({ campID: campID });
    if (!camp) {
      return res.status(404).send({ message: 'Camp not found' });
    }

    camp.status = status;

    await camp.save();
    const lastMeeting = await Meeting.findOne().sort({ _id: -1 }).exec();
    console.log(lastMeeting,"yess");

    let nextMeetNumber = 1; // Default to 1 if no meetings exist

    // If there's a last meeting and it has a valid meetid
    if (lastMeeting && lastMeeting.meetID) {
      const lastMeetNumber = parseInt(lastMeeting.meetID.split('-')[1]); // Extract the number from 'Meeting-X'
      if (!isNaN(lastMeetNumber)) {
        nextMeetNumber = lastMeetNumber + 1; // Increment the last meeting number
      }
    }

    const newMeetid = `Meeting-${nextMeetNumber}`;
    const dateTimeString = `${meetingDate}T${meetingTime}:00`;
    const dateTime = new Date(dateTimeString);
    const meeting = new Meeting({
      meetID: newMeetid,
      dateTime: dateTime,
      campID: campID,
      doctor: doctor,
      status: "scheduled",
    });

    await meeting.save();

    res.status(200).send({ message: 'Camp updated successfully', camp });
  } catch (error) {
    console.error('Error updating camp:', error);
    res.status(500).send({ message: error });
  }
});

router.post('/updateCampStatus', async (req, res) => {
  try {
    const reqCamp = new Camp(req.body);
   
    const campId_request = reqCamp.campID;
    const campStatus = reqCamp.status;
    const camp = await Camp.findOne({ campID: campId_request });
    if (!camp) {
      // If the camp is not found, send an error response
      return res.status(404).json({ message: 'Camp not found' });
    }

    camp.status = campStatus;
    await camp.save();
    res.status(201).json({ message: 'Camp Status Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post('/updateCampInProgress', async (req, res) => {
  try {
    const reqCamp = new Camp(req.body);
   
    const campId_request = reqCamp.campID;
    const campStatus = reqCamp.status;
    const camp = await Camp.findOne({ campID: campId_request });
    if (!camp) {
      // If the camp is not found, send an error response
      return res.status(404).json({ message: 'Camp not found' });
    }

    camp.status = "inprogress";
    await camp.save();
    res.status(201).json({ message: 'Camp Status Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post('/update_meeting_status', async (req, res) => {
  const { meetID, status } = req.body;
  try {
    const meet = await Meeting.findOne({ meetID: meetID });
    if (!meet) {
      return res.status(404).send({ message: 'Meeting not found' });
    }

    meet.status = status;

    await meet.save(); 

    res.status(200).send({ message: 'Status updated successfully', meet });
  } catch (error) {
    console.error('Error updating Status:', error);
    res.status(500).send({ message: error });
  }
});

module.exports = router;