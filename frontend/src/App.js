
// // function App() {
// //   return (
// //     <div>
// //      <p> Hello</p>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import AddDoctor from './components/AddDoctor';
// import AddStudent from './components/AddStudent';
// import AddVolunteer from './components/AddVolunteer';
// import ScheduleCamp from './components/ScheduleCamp';

// function App() {
//   const [role, setRole] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login setRole={setRole} />} />
//         <Route path="/dashboard" element={
//           role === 'Doctor' ? <AddDoctor /> :
//           role === 'NGO Worker' ? <AddStudent /> :
//           role === 'Volunteer' ? <AddVolunteer /> :
//           role === 'Therapist' ? <ScheduleCamp /> :
//           <Navigate to="/login" />
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddDoctor from './components/AddDoctor';
import AddStudent from './components/AddStudent';
import AddVolunteer from './components/AddVolunteer';
import ScheduleCamp from './components/ScheduleCamp';
import './components/auth.css';

function App() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/dashboard" element={
          role === 'Doctor' ? <AddDoctor /> :
          role === 'NGO Worker' ? <AddStudent /> :
          role === 'Volunteer' ? <AddVolunteer /> :
          role === 'Therapist' ? <ScheduleCamp /> :
          <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
