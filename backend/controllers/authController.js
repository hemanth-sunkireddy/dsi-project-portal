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

// exports.sendOtp = async (req, res) => {
//   const { phone } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
//   await Otp.deleteMany({ phone }); // Remove old OTPs
//   const newOtp = new Otp({ phone, otp });
//   await newOtp.save();

//   sendOtpToPhone(phone, otp); // Send OTP via SMS
//   res.status(200).json({ message: 'OTP sent successfully' });
// };

// // Send OTP
// exports.sendOTP = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate a 6-digit OTP
//     const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//     // Save OTP and its expiry in the temporary store
//     otpStore[phone] = { otp, expiresAt: Date.now() + OTP_EXPIRY_TIME };

//     // Send OTP via SMS
//     await sendSMS(phone, `Your login OTP is: ${otp}`);

//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };

// Send OTP using Phone.Email
exports.sendOTP = async (req, res) => {
  try {
    const userJsonUrl = req.body.user_json_url;

    // Fetch phone verification data
    const userData = await sendSMS(userJsonUrl);

    const { user_country_code, user_phone_number } = userData;

    // Store OTP and phone number in the database
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ phone: user_phone_number }); // Remove old OTPs
    const newOtp = new Otp({ phone: user_phone_number, otp });
    await newOtp.save();

    res.status(200).json({ message: `OTP sent to ${user_phone_number}`, otp });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP and log in
exports.loginWithOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Check OTP in the database
    const otpRecord = await Otp.findOne({ phone, otp });
    if (!otpRecord) return res.status(401).json({ message: 'Invalid or expired OTP' });

    // Find user
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Clean up OTP
    await Otp.deleteMany({ phone });

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const otpRecord = await Otp.findOne({ phone, otp });

  if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP' });

  const user = await User.findOne({ phone });
  if (!user || !user.isApproved) return res.status(403).json({ message: 'User not approved or not registered' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token, role: user.role });
};



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

// exports.register = async (req, res) => {
//   try {
//     const user = new User({ ...req.body, isApproved: req.body.role !== 'Doctor' });
//     await user.save();

//     if (req.body.role === 'Doctor') {
//       res.status(201).json({ message: 'Doctor registration request sent for admin approval' });
//     } else {
//       res.status(201).json({ message: 'User registered successfully' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
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




// exports.getUserDetails = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id); // `req.user` should contain decoded user info
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user details', error });
//   }
// };

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Fetch by ID
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};



