import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardNGO.css';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const DashboardNGO = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [camps, setCamps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDateCamps, setSelectedDateCamps] = useState([]);
  const today = new Date();

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await axios.get('/api/auth/camps');
      setCamps(response.data);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const openPopup = (selectedDate) => {
    const campsForDate = camps.filter(
      camp => new Date(camp.dateTime).toDateString() === selectedDate.toDateString()
    );
    setSelectedDateCamps(campsForDate);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isFutureOrTodayCamp = camps.some(
        camp => new Date(camp.dateTime).toDateString() === date.toDateString() && new Date(camp.dateTime) >= today
      );
      return isFutureOrTodayCamp ? 'highlighted-date' : null;
    }
  };

  // Filtering camps
  const upcomingCamps = camps.filter(camp => new Date(camp.dateTime) > today);
  const completedCamps = camps.filter(camp => new Date(camp.dateTime) < today && new Date(camp.dateTime).toDateString() !== today.toDateString());
  const scheduledCampsForSelectedDate = camps.filter(
    camp => new Date(camp.dateTime).toDateString() === date.toDateString()
  ).length;

  const pieData = {
    labels: ['Completed', 'Upcoming', 'Scheduled Today'],
    datasets: [
      {
        label: 'Camps Distribution',
        data: [completedCamps.length, upcomingCamps.length, scheduledCampsForSelectedDate],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard - NGO Staff</h1>
        <button onClick={() => navigate('/profile')} >Profile</button>
        <button onClick={() => navigate('/support')}>Support</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="dashboard-card" onClick={() => navigate('/schedule-camp')}>
            <h2>Schedule a Camp</h2>
            <p style={{color: 'black'}}>Schedule a new Screening camp</p>
            <p><strong>Scheduled Today:</strong> {scheduledCampsForSelectedDate}</p>
            <button>Add Camp</button>
          </div>
          
          <div className="dashboard-card">
            <h2>Completed Camps</h2>
            <p style={{color: 'black'}}>List of Camps that have been completed successfully.</p>
            <p><strong>Total:</strong> {completedCamps.length}</p>
            <button onClick={() => navigate('/completed-camps-staff', { state: { camps: completedCamps } })}>View</button>
          </div>
          
          <div className="dashboard-card">
            <h2>Upcoming Camps</h2>
            <p style={{color: 'black'}}>List of Camps scheduled for the future.</p>
            <p><strong>Total:</strong> {upcomingCamps.length}</p>
            <button onClick={() => navigate('/upcoming-camps-staff', { state: { camps: upcomingCamps } })}>View</button>
          </div>
        </div>

        <div className="analytics-section">
          
          <div className="analytics-chart">
            <h2>Analytics</h2> 
            <Pie data={pieData} />
            <p>Distribution of Scheduled, Completed, and Upcoming Camps</p>
          </div>

          <div className="calendar-container">
            <h3>Schedule and View Camps</h3>
            
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={tileClassName}
              onClickDay={openPopup}
            />
            <p className="selected-date-info">Selected Date: {date.toDateString()}</p>
          </div>
        </div>
      </div>



{showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h3>Camps Scheduled for {date.toDateString()}</h3>
      {selectedDateCamps.length > 0 ? (
        <table className="camps-table">
          <thead>
            <tr>
              <th>Camp ID</th>
              <th>School Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Volunteer</th>
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
                <td>{camp.volunteer}</td>
                <td>{camp.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No camps scheduled for this date.</p>
      )}
      <button onClick={() => navigate('/schedule-camp')} className="add-camp-button">Add Camp</button>
      <button onClick={closePopup} className="close-button">Close</button>
    </div>
  </div>
)}
</div>
);
};

export default DashboardNGO;
