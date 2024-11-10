// // const express = require('express');
// // const dotenv = require('dotenv');
// // const connectDB = require('./config/db');
// // const authRoutes = require('./routes/authRoutes');

// // dotenv.config();
// // connectDB();

// // const app = express();
// // app.use(express.json());

// // app.use('/api/auth', authRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const doctorRoutes = require('./routes/doctorRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const volunteerRoutes = require('./routes/volunteerRoutes');
// const campRoutes = require('./routes/campRoutes');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors()); // Enable CORS
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// app.use('/api/doctor', doctorRoutes);
// app.use('/api/student', studentRoutes);
// app.use('/api/volunteer', volunteerRoutes);
// app.use('/api/camp', campRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
