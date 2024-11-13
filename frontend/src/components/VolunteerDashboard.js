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
  const [username, setUsername] = useState('');
  const [selectedDateCamps, setSelectedDateCamps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const today = new Date();

  useEffect(() => {
    fetchCamps();
    fetchUserDetails();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await axios.get('/api/auth/camps');
      setCamps(response.data);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('/api/auth/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsername(response.data.name);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const upcomingCamps = camps.filter(camp => new Date(camp.dateTime) > today);
  const completedCamps = camps.filter(camp => new Date(camp.dateTime) < today && new Date(camp.dateTime).toDateString() !== today.toDateString());
  const ongoingCamps = camps.filter(camp => new Date(camp.dateTime).toDateString() === today.toDateString());

  const openPopup = (selectedDate) => {
    const campsForDate = camps.filter(camp => new Date(camp.dateTime).toDateString() === selectedDate.toDateString());
    setSelectedDateCamps(campsForDate);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDateCamps([]);
  };

//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//       const hasCampOnDate = camps.some(camp => new Date(camp.dateTime).toDateString() === date.toDateString());
//       if (hasCampOnDate) {
//         return 'highlighted-date';
//       }
//     }
//     return null;
//   };
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
    <div className="dashboard-container">
    <header className="dashboard-header">
        <h1>Dashboard - Volunteer</h1>
        <div className="header-right">
            <span>Hi there, {username}</span>
            <button onClick={() => navigate('/profile')} className="profile-button">Profile</button>
            <button onClick={() => navigate('/login')} className="logout-button">Logout</button>
        </div>
    </header>

    <div className="dashboard-content">
        {/* Top Section: Only Dashboard Cards */}
      <div className="top-section">
        <div className="dashboard-cards">
            <div className="dashboard-card" onClick={() => navigate('/camps-in-progress', { state: { camps: ongoingCamps } })}>
                <h2>Camps In Progress</h2>
                <p>List of Camps scheduled for today.</p>
                <button>View</button>
            </div>
            <div className="dashboard-card" onClick={() => navigate('/completed-camps', { state: { camps: completedCamps } })}>
                <h2>Completed Camps</h2>
                <p>List of Camps completed in the past.</p>
                <button>View</button>
            </div>
            <div className="dashboard-card" onClick={() => navigate('/upcoming-camps', { state: { camps: upcomingCamps } })}>
                <h2>Upcoming Camps</h2>
                <p>List of Camps scheduled for future dates.</p>
                <button>View</button>
            </div>
        </div>
       </div>
        {/* Bottom Section: Flex container for Analytics and Calendar */}
        <div className="bottom-section">
          <div className="adjust">
           
            <div className="calendar-section">
                
          
                <h2>Calendar</h2>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileClassName={tileClassName}
                    onClickDay={openPopup}
                />
            </div>
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
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;