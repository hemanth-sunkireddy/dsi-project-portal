import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddDoctor from './components/AddDoctor';
import AddStudent from './components/AddStudent';
import ScheduleCamp from './components/ScheduleCamp';
import DashboardNGO from './components/DashboardNGO';
import VolunteerDashboard from './components/VolunteerDashboard'; // Import Volunteer Dashboard
import UpcomingCamps from './components/Volunteer/UpcomingCamps';
import CompletedCamps from './components/Volunteer/CompletedCamps';
import CampsInProgress from './components/Volunteer/CampsInProgress';
import CampDetails from './components/Volunteer/CampDetails';
import ViewStudents from './components/Volunteer/ViewStudents';
import Logout from './components/Logout';
import ConductScreening from './components/ConductScreening';
import StudentProfile from './components/StudentProfile';
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
        <Route path="/camp-details" element={<CampDetails />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/patients-list" element={<ViewStudents />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/conduct-screening" element={<ConductScreening />} />
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
