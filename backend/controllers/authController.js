// const admin = require('../firebase'); // Firebase Admin SDK
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Otp = require('../models/Otp');
const { sendOtpToPhone } = require('../utils/otpSender'); // Utility function to send OTP
const otpGenerator = require('otp-generator'); // For generating OTPs
const sendSMS = require('../utils/smsService'); // Utility function for sending SMS (you will need to implement this)
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

// Temporary in-memory storage for OTPs (you can replace this with a database if needed)
const otpStore = {};

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    console.log(`Generated OTP for ${phone}: ${otp}`);

    await Otp.findOneAndUpdate(
      { phone },
      { phone, otp, createdAt: new Date() },
      { upsert: true } // Create or update the OTP record
    );

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ phone, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Check if OTP is older than 5 minutes
    const now = new Date();
    if (now - otpRecord.createdAt > 5 * 60 * 1000) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    await Otp.deleteMany({ phone }); // Clean up OTPs for this phone

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
     // Check if the user is approved
     if (!user.isApproved) {
      return res.status(403).json({ message: 'Your account is awaiting admin approval.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return token and role
    res.status(200).json({ token, role: user.role, isApproved: user.isApproved });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};


exports.login = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Return token and role
    res.status(200).json({ token, role: user.role, isApproved: user.isApproved });

    res.status(200).json({
      token: token,
      role: user.role, // Send user role for redirection
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.register = async (req, res) => {
  const { name, phone, gender, address, role } = req.body;
  try {
    // Validate role
    const validRoles = ['Admin', 'NGO Worker', 'Doctor', 'Therapist', 'Volunteer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Create new user
    const user = new User({ name, phone, gender, address, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};


exports.approveDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Doctor approved successfully' , user });
  } catch (error) {
    res.status(500).json({ message: 'Error approving doctor', error });
  }
};

exports.assignAdmin = async (req, res) => {
  const { id } = req.params; // User ID tp promote to admin
  try {
    const user = await User.findByIdAndUpdate(id, { role: 'Admin' }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User promoted to admin successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning admin role', error });
  }
};



exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Fetch by ID
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};



