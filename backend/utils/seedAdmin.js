// const mongoose = require('mongoose'); // Import mongoose
// const dotenv = require('dotenv');
// const User = require('../models/User');

// dotenv.config(); // Load environment variables

// // MongoDB Connection Function
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true, // Optional for older versions, can be omitted for Mongoose >=6.0.0
//       useUnifiedTopology: true, // Optional for older versions, can be omitted for Mongoose >=6.0.0
//     });
//     console.log('MongoDB Connected:', mongoose.connection.host);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit process with failure
//   }
// };

// // Admin Seeding Function
// const seedAdmin = async () => {
//   try {
//     await connectDB();

//     // Check if an admin user already exists
//     const existingAdmin = await User.findOne({ phone: '1234567890' });
//     if (existingAdmin) {
//       console.log('Admin user already exists');
//       process.exit(0); // Exit process successfully
//     }

//     // Create a new admin user
//     const admin = new User({
//       name: 'Admin',
//       phone: '9599660498', // Replace with the desired admin phone number
//       gender: 'N/A',
//       address: 'Admin Office',
//       role: 'NGO Worker',
//       isApproved: true,
//     });

//     await admin.save();
//     console.log('Admin user created successfully');
//     process.exit(0); // Exit process successfully
//   } catch (error) {
//     console.error('Error seeding admin:', error);
//     process.exit(1); // Exit process with failure
//   }
// };

// seedAdmin();

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

    const adminUsers = [
      {
        name: 'Admin',
        phone: '+919599660498', // Updated phone number with +91
        gender: 'N/A',
        address: 'Admin Office',
        role: 'NGO Worker',
        isApproved: true,
      },
      {
        name: 'Admin2',
        phone: '+919354081986', // New Admin
        gender: 'N/A',
        address: 'Admin Office 2',
        role: 'NGO Worker',
        isApproved: true,
      },
      {
        name: 'Test Admin 1',
        phone: '+919876543210', // First test number
        gender: 'N/A',
        address: 'Test Office 1',
        role: 'NGO Worker',
        isApproved: true,
      },
      {
        name: 'Test Admin 2',
        phone: '+911234567890', // Second test number
        gender: 'N/A',
        address: 'Test Office 2',
        role: 'NGO Worker',
        isApproved: true,
      },
    ];

    for (const admin of adminUsers) {
      // Check if the admin already exists in the database
      const existingAdmin = await User.findOne({ phone: admin.phone });
      if (existingAdmin) {
        console.log(`Admin user with phone ${admin.phone} already exists`);
      } else {
        // Create the admin user if not found
        await User.create(admin);
        console.log(`Admin user with phone ${admin.phone} created successfully`);
      }
    }

    process.exit(0); // Exit process successfully
  } catch (error) {
    console.error('Error seeding admins:', error);
    process.exit(1); // Exit process with failure
  }
};

seedAdmin();

