const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("Received data:", req.body); // Add this line for debugging
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already in use' });
    

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error during registration:", error); // Add this line for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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



