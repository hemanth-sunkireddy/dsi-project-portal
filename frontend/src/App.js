// // // // import React, { useState } from 'react';
// // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // // import Register from './components/Register';
// // // // import Login from './components/Login';
// // // // import AddDoctor from './components/AddDoctor';
// // // // import AddStudent from './components/AddStudent';
// // // // import AddVolunteer from './components/AddVolunteer';
// // // // import ScheduleCamp from './components/ScheduleCamp';
// // // // import './components/auth.css';


// // // // function App() {
// // // //   const [role, setRole] = useState(null);

// // // //   return (
// // // //     <Router>
// // // //       <Routes>
// // // //         <Route path="/" element={<Navigate to="/login" />} />
// // // //         <Route path="/register" element={<Register />} />
// // // //         <Route path="/login" element={<Login setRole={setRole} />} />
// // // //         <Route path="/dashboard" element={
          
// // // //           role === 'Doctor' ? <AddDoctor /> :
// // // //           role === 'NGO Worker' ? <AddStudent /> :
// // // //           role === 'Volunteer' ? <AddVolunteer /> :
// // // //           role === 'Therapist' ? <ScheduleCamp /> :
// // // //           <Navigate to="/login" />
// // // //         } />
// // // //       </Routes>
// // // //     </Router>
// // // //   );
// // // // }

// // // // export default App;


// // // import React, { useState } from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import Register from './components/Register';
// // // import Login from './components/Login';
// // // import AddDoctor from './components/AddDoctor';
// // // import AddStudent from './components/AddStudent';
// // // import AddVolunteer from './components/AddVolunteer';
// // // import ScheduleCamp from './components/ScheduleCamp';
// // // import './components/auth.css';
// // // 
// // // import Logout from './components/Logout';

// // // function App() {
// // //   const [role, setRole] = useState(null);

// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/" element={<Navigate to="/login" />} />
// // //         <Route path="/register" element={<Register />} />
// // //         <Route path="/login" element={<Login setRole={setRole} />} />
// // //         
// // //         <Route path="/dashboard" element={
// // //           <>
// // //             <Logout /> {/* Add the logout button here */}
// // //             {role === 'Doctor' ? <AddDoctor /> :
// // //             role === 'NGO Worker' ? <AddStudent /> :
// // //             role === 'Volunteer' ? <AddVolunteer /> :
// // //             role === 'Therapist' ? <ScheduleCamp /> :
// // //             <Navigate to="/login" />}
// // //           </>
// // //         } />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import AddDoctor from './components/AddDoctor';
// import AddStudent from './components/AddStudent';
// import AddVolunteer from './components/AddVolunteer';
// import ScheduleCamp from './components/ScheduleCamp';
// import DashboardNGO from './components/DashboardNGO';
// import UpcomingCamps from './components/UpcomingCamps';
// import CompletedCamps from './components/CompletedCamps';
// import Logout from './components/Logout';
// import './components/auth.css';

// function App() {
//   const [role, setRole] = useState(() => localStorage.getItem('role') || null);

//   // Update role in localStorage whenever it changes
//   useEffect(() => {
//     if (role) {
//       localStorage.setItem('role', role);
//     } else {
//       localStorage.removeItem('role');
//     }
//   }, [role]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/upcoming-camps" element={<UpcomingCamps />} />
//         <Route path="/completed-camps" element={<CompletedCamps />} />
//         <Route path="/login" element={<Login setRole={setRole} />} />

        
//         {/* Conditional Routing Based on Role */}
//         <Route path="/dashboard" element={
//           role === 'Doctor' ? <AddDoctor /> :
//           role === 'NGO Worker' ? <DashboardNGO /> : // Use the dedicated NGO Dashboard
//           role === 'Volunteer' ? <AddVolunteer /> :
//           role === 'Therapist' ? <ScheduleCamp /> :
//           <Navigate to="/login" />
//         } />

//         {/* Additional Routes */}
//         <Route path="/add-student" element={<AddStudent />} />
//         <Route path="/schedule-camp" element={<ScheduleCamp />} />
//       </Routes>

//       {/* Logout Button for Convenience */}
//       {role && <Logout setRole={setRole} />} {/* Only show Logout if a role is set */}
//     </Router>
//   );
// }

// export default App;

// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddDoctor from './components/AddDoctor';
import AddStudent from './components/AddStudent';
import AddVolunteer from './components/AddVolunteer';
import ScheduleCamp from './components/ScheduleCamp';
import DashboardNGO from './components/DashboardNGO';
import VolunteerDashboard from './components/VolunteerDashboard'; // Import Volunteer Dashboard
import UpcomingCamps from './components/UpcomingCamps';
import CompletedCamps from './components/CompletedCamps';
import CampsInProgress from './components/CampsInProgress';
import Logout from './components/Logout';
import './components/auth.css';

function App() {
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upcoming-camps" element={<UpcomingCamps />} />
        <Route path="/completed-camps" element={<CompletedCamps />} />
        <Route path="/camps-in-progress" element={<CampsInProgress />} />
        <Route path="/login" element={<Login setRole={setRole} />} />

        {/* Conditional Routing Based on Role */}
        <Route path="/dashboard" element={
          role === 'Doctor' ? <AddDoctor /> :
          role === 'NGO Worker' ? <DashboardNGO /> :
          role === 'Volunteer' ? <VolunteerDashboard /> : // Render Volunteer Dashboard for Volunteers
          role === 'Therapist' ? <ScheduleCamp /> :
          <Navigate to="/login" />
        } />

        {/* Additional Routes */}
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/schedule-camp" element={<ScheduleCamp />} />
      </Routes>

      {/* Logout Button for Convenience */}
      {role && <Logout setRole={setRole} />} {/* Only show Logout if a role is set */}
    </Router>
  );
}

export default App;
