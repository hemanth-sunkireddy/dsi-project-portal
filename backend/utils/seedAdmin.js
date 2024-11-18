const mongoose = require('mongoose'); // Import mongoose
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config(); // Load environment variables

// MongoDB Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Optional for older versions, can be omitted for Mongoose >=6.0.0
      useUnifiedTopology: true, // Optional for older versions, can be omitted for Mongoose >=6.0.0
    });
    console.log('MongoDB Connected:', mongoose.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// Admin Seeding Function
const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ phone: '1234567890' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0); // Exit process successfully
    }

    // Create a new admin user
    const admin = new User({
      name: 'Admin',
      phone: '9599660498', // Replace with the desired admin phone number
      gender: 'N/A',
      address: 'Admin Office',
      role: 'NGO Worker',
      isApproved: true,
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0); // Exit process successfully
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1); // Exit process with failure
  }
};

seedAdmin();
