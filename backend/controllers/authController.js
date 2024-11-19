// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   console.log("Received data:", req.body); // Add this line for debugging
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'Email already in use' });
    

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, role });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error("Error during registration:", error); // Add this line for debugging
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token, role: user.role, name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // exports.getUserDetails = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id); // `req.user` should contain decoded user info
// //     if (!user) return res.status(404).json({ message: 'User not found' });
// //     res.json({ name: user.name });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching user details', error });
// //   }
// // };

// exports.getUserDetails = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId); // Fetch by ID
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user details', error });
//   }
// };



const admin = require('../firebase'); // Firebase Admin SDK
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


// // Send OTP to a phone number
// exports.sendOTP = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     // Generate a Firebase Authentication Session
//     const link = await admin.auth().createCustomToken(phone);
//     console.log(`Custom token for phone ${phone}:`, link);

//     // Normally, you would integrate an SMS service like Twilio here.
//     // For now, simulate SMS by returning the "token" (OTP equivalent).
//     res.status(200).json({
//       message: 'OTP sent successfully',
//       otp: link, // This is the custom token to simulate OTP
//     });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };

// // Send OTP via Firebase
// exports.sendOTP = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     // Generate a mock OTP for demo purposes (or use Firebase Admin for sending SMS)
//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       specialChars: false,
//       lowerCaseAlphabets: false, // Exclude lowercase letters
//       digits: true, // Include digits only
//     });

//     console.log(`Generated OTP for ${phone}: ${otp}`);

//     // Save OTP to the database with expiry for future verification
//     const otpRecord = new Otp({
//       phone,
//       otp,
//       createdAt: Date.now(),
//     });
//     await otpRecord.save();

//     // Send the OTP (if integrated with a real SMS service)
//     res.status(200).json({ message: 'OTP sent successfully', otp }); // Do not send OTP in production
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };

// // exports.verifyOTP = async (req, res) => {
// //   const { phone, otp } = req.body;

// //   try {
// //     // Find the OTP record for this phone number
// //     const otpRecord = await Otp.findOne({ phone, otp });

// //     if (!otpRecord) {
// //       return res.status(400).json({ message: 'Invalid or expired OTP' });
// //     }

// //     // If valid, create Firebase Auth user or retrieve existing user
// //     const user = await admin.auth().getUserByPhoneNumber(phone).catch(async () => {
// //       // If the user does not exist, create a new one
// //       return admin.auth().createUser({
// //         phoneNumber: phone,
// //       });
// //     });

// //     // Generate a Firebase ID token for the user
// //     const token = await admin.auth().createCustomToken(user.uid);

// //     // Delete OTP after successful verification
// //     await Otp.deleteMany({ phone });

// //     res.status(200).json({ message: 'OTP verified successfully', token });
// //   } catch (error) {
// //     console.error('Error verifying OTP:', error);
// //     res.status(500).json({ message: 'Failed to verify OTP' });
// //   }
// // };

// exports.verifyOTP = async (req, res) => {
//   const { phone, otp } = req.body;

//   console.log(`Received phone: ${phone}, OTP: ${otp}`); // Log incoming data

//   try {
//     // Find the OTP record for this phone number
//     const otpRecord = await Otp.findOne({ phone, otp });

//     if (!otpRecord) {
//       console.log('Invalid or expired OTP'); // Log the failure reason
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     console.log('OTP verified successfully'); // Log successful verification

//     // Create a Firebase user or get an existing one
//     const user = await admin.auth().getUserByPhoneNumber(phone).catch(async () => {
//       return admin.auth().createUser({ phoneNumber: phone });
//     });

//     // Generate a Firebase custom token
//     const token = await admin.auth().createCustomToken(user.uid);

//     // Delete OTP after successful verification
//     await Otp.deleteMany({ phone });

//     res.status(200).json({ message: 'OTP verified successfully', token });
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).json({ message: 'Failed to verify OTP' });
//   }
// };

// exports.sendOTP = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     // Generate a 6-digit numeric OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     console.log(`Generated OTP for ${phone}: ${otp}`);

//     // Save OTP in the database
//     const otpRecord = new Otp({ phone, otp, createdAt: Date.now() });
//     await otpRecord.save();

//     res.status(200).json({ message: "OTP sent successfully." });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ message: "Failed to send OTP." });
//   }
// };

// exports.verifyOTP = async (req, res) => {
//   const { phone, otp } = req.body;

//   try {
//     // Find the OTP record
//     const otpRecord = await Otp.findOne({ phone, otp });

//     if (!otpRecord) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // Delete the OTP after successful verification
//     await Otp.deleteMany({ phone });

//     // Retrieve user role
//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate a mock token (use JWT or Firebase token in production)
//     const token = `mock-token-${phone}`;
//     res.status(200).json({ token, role: user.role });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ message: "Failed to verify OTP." });
//   }
// };


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

    res.status(200).json({
      token: `mock-token-${phone}`,
      role: user.role,
      isApproved: user.isApproved,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP." });
  }
};

// // Verify OTP and log the user in
// exports.verifyOTP = async (req, res) => {
//   const { phone, otp } = req.body;

//   try {
//     // Simulate OTP verification
//     const decodedToken = await admin.auth().verifyIdToken(otp);
//     console.log('Decoded Token:', decodedToken);

//     // Check if user exists
//     let user = await User.findOne({ phone });
//     if (!user) {
//       // Create a new user if none exists
//       user = new User({ phone, role: 'User', isApproved: true });
//       await user.save();
//     }

//     // Generate a custom JWT for the user
//     const token = admin.auth().createCustomToken(user._id.toString());
//     res.status(200).json({
//       message: 'Login successful',
//       token, // Return the JWT
//       role: user.role,
//     });
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).json({ message: 'Invalid OTP or session expired' });
//   }
// };

// // Verify OTP and log in
// exports.loginWithOTP = async (req, res) => {
//   const { phone, otp } = req.body;

//   try {
//     // Validate OTP
//     const otpRecord = await Otp.findOne({ phone, otp });
//     if (!otpRecord) return res.status(401).json({ message: 'Invalid or expired OTP' });

//     // Find or create the user
//     let user = await User.findOne({ phone });
//     if (!user) {
//       user = new User({ phone, role: 'User', isApproved: true });
//       await user.save();
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     // Cleanup OTPs
//     await Otp.deleteMany({ phone });

//     res.status(200).json({ message: 'Login successful', token, role: user.role });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Login failed' });
//   }
// };

exports.loginWithOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      message: 'Login successful',
      role: user.role, // Send user role for redirection
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};


// exports.verifyOtp = async (req, res) => {
//   const { phone, otp } = req.body;
//   const otpRecord = await Otp.findOne({ phone, otp });

//   if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP' });

//   const user = await User.findOne({ phone });
//   if (!user || !user.isApproved) return res.status(403).json({ message: 'User not approved or not registered' });

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.status(200).json({ token, role: user.role });
// };




exports.register = async (req, res) => {
  try {
    // Check if this is the first user in the system
    const isFirstUser = (await User.countDocuments({})) === 0;

    // Create a new user
    const user = new User({
      ...req.body,
      role: isFirstUser ? 'Admin' : req.body.role, // Assign 'Admin' role to the first user
      isApproved: isFirstUser || req.body.role !== 'Doctor', // Approve admin or non-doctor roles by default
    });

    await user.save();

    if (isFirstUser) {
      res.status(201).json({ message: 'Admin created successfully' });
    } else if (req.body.role === 'Doctor') {
      res.status(201).json({ message: 'Doctor registration request sent for admin approval' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
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



