import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddDoctor from './components/AddDoctor';
import AddStudent from './components/AddStudent';
import ScheduleCamp from './components/ScheduleCamp';
import DashboardNGO from './components/DashboardNGO';
import DoctorDashboard from './components/DoctorDashboard';
import TherapistDashboard from './components/TherapistDashboard'
import VolunteerDashboard from './components/VolunteerDashboard'; // Import Volunteer Dashboard
import UpcomingCamps from './components/Volunteer/UpcomingCamps';
import CompletedCamps from './components/Volunteer/CompletedCamps';
import CampsInProgress from './components/Volunteer/CampsInProgress';
import CampDetails from './components/Volunteer/CampDetails';
import ViewStudents from './components/Volunteer/ViewStudents';
import Logout from './components/Logout';
import CampDetailsStaff from './components/Staff/CampDetails';
import ConductScreening from './components/ChatWindow';
import StudentProfile from './components/StudentProfile';
import StaffCompletedCamps from './components/Staff/CompletedCamps';
import StaffUpcomingCamps from './components/Staff/UpcomingCamps';
import ProfilePage from './components/ProfilePage';
import SuportPage from './components/HelpDeskPage'
import EditProfile from './components/EditProfile'
import './components/auth.css';
import CompletedMeetings from './components/Doctor/CompletedMeetings';
import ScheduledMeetings from './components/Doctor/ScheduledMeetings';
import UnscheduledMeetings from './components/Doctor/UnscheduledMeetings';
import AllPatients from './components/Therapist/CompletedCamps';
import LandingPage from './components/LandingPage';
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
      <Route path="/landing-page" element={<LandingPage/>} />
      <Route path="/all-patients" element={<AllPatients/>} />
        <Route path="/completed-meetings" element={<CompletedMeetings/>} />
        <Route path="/scheduled-meetings" element={<ScheduledMeetings/>} />
        <Route path="/unscheduled-meetings" element={<UnscheduledMeetings/>} />
        <Route path="/" element={<Navigate to="/landing-page" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upcoming-camps" element={<UpcomingCamps />} />
        <Route path="/completed-camps" element={<CompletedCamps />} />
        <Route path="/camps-in-progress" element={<CampsInProgress />} />
        <Route path="/camp-details" element={<CampDetails />} />
        <Route path="/camp-details-staff" element={<CampDetailsStaff />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/patients-list" element={<ViewStudents />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/conduct-screening" element={<ConductScreening />} />
        <Route path="/completed-camps-staff" element={<StaffCompletedCamps />} />
        <Route path="/upcoming-camps-staff" element={<StaffUpcomingCamps />} />
        <Route path="/support" element={<SuportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/adddoctor" element={<AddDoctor />} />
        {/* Conditional Routing Based on Role */}
        {/* Conditional Routing Based on Role */}
        <Route path="/dashboard" element={
          role === 'Doctor' ? <DoctorDashboard /> :
            role === 'NGO Worker' ? <DashboardNGO /> :
              role === 'Volunteer' ? <VolunteerDashboard /> : // Render Volunteer Dashboard for Volunteers
                role === 'Therapist' ? <TherapistDashboard /> :
                  <Navigate to="/login" />
        } />

        {/* Additional Routes */}
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/schedule-camp" element={<ScheduleCamp />} />
      </Routes>
    </Router>
  );
}
export default App;