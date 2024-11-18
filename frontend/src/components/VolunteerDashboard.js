import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './VolunteerDashboard.css';
import axios from 'axios';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [camps, setCamps] = useState([]);
  const [selectedDateCamps, setSelectedDateCamps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const today = new Date();
  const userName = localStorage.getItem('name');

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get('/api/auth/camps');
      const volunteerCamps = response.data.filter(camp => camp.volunteer === userName);
      setCamps(volunteerCamps);
      console.log(volunteerCamps);
      console.log(volunteerCamps);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const openPopup = (selectedDate) => {
    const campsForDate = camps.filter(camp => new Date(camp.dateTime).toDateString() === selectedDate.toDateString());
    setSelectedDateCamps(campsForDate);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDateCamps([]);
  };
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isOngoingOrUpcomingCamp = camps.some(camp => {
        const campDate = new Date(camp.dateTime);
        return campDate.toDateString() === date.toDateString() && campDate >= today;
      });

      return isOngoingOrUpcomingCamp ? 'highlighted-date' : null;
    }
    return null;
  };


  return (
    <div>
      <header className="dashboard-header">
        <h1>Dashboard - Volunteer</h1>
        <div className="header-right">
          <span style={{color: 'black'}}>Hi there, {userName}</span>
          <button onClick={() => navigate('/profile')} className="profile-button">Profile</button>
          <button onClick={() => navigate('/login')} className="logout-button">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="dashboard-card" onClick={() => navigate('/camps-in-progress', { state: { camps: camps } })}>
            <h2>Camps In Progress</h2>
            <p style={{color: 'black'}}>List of Camps scheduled for today.</p>
            <button>View</button>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/completed-camps', { state: { camps: camps } })}>
            <h2>Completed Camps</h2>
            <p style={{color: 'black'}}>List of Camps completed in the past.</p>
            <button>View</button>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/upcoming-camps', { state: { camps: camps } })}>
            <h2>Upcoming Camps</h2>
            <p style={{color: 'black'}}>List of Camps scheduled for future dates.</p>
            <button>View</button>
          </div>
        </div>

        <div className="calendar-container1">
          <h2>Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            onClickDay={openPopup}
          />
        </div>
      </div>

      {showPopup && (
        <div class="popup-overlay">
          <div class="popup-content">
            <h3>Camps Scheduled for {date.toDateString()}</h3>
            {selectedDateCamps.length > 0 ? (
              <table className="camps-table" style={{color: 'black'}}>
                <thead>
                  <tr>
                    <th>Camp ID</th>
                    <th>School Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDateCamps.map((camp) => (
                    <tr key={camp.campID}>
                      <td>{camp.campID}</td>
                      <td>{camp.schoolName}</td>
                      <td>{camp.location}</td>
                      <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                      <td>{camp.doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No camps scheduled for this date.</p>
            )}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;

