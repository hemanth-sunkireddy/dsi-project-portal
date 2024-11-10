// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './DashboardNGO.css';
// import AddCampPopup from './AddCampPopup';
// import axios from 'axios';

// const DashboardNGO = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [camps, setCamps] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedDateCamps, setSelectedDateCamps] = useState([]);
//   const today = new Date(); // Define today's date

//   useEffect(() => {
//     fetchCamps();
//   }, []);

//   // Fetch all camps from MongoDB
//   const fetchCamps = async () => {
//     try {
//       const response = await axios.get('/api/auth/camps');
//       setCamps(response.data);
//     } catch (error) {
//       console.error('Error fetching camps:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/login');
//   };

//   const openPopup = (selectedDate) => {
//     const campsForDate = camps.filter(camp => new Date(camp.dateTime).toDateString() === selectedDate.toDateString());
//     setSelectedDateCamps(campsForDate);
//     setShowPopup(true);
//   };

//   const closePopup = () => setShowPopup(false);

//   const handleAddCamp = () => {
//     navigate('/schedule-camp');
//   };

//   // Define classes for calendar dates
//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//       const isPastDate = date < today;
//       const hasCampOnDate = camps.some(camp => new Date(camp.dateTime).toDateString() === date.toDateString());
      
//       if (!isPastDate && hasCampOnDate) {
//         return 'highlighted-date'; // Highlight future dates with scheduled camps
//       }
//     }
//   };

//   // Filter for upcoming and completed camps based on today's date
//   const upcomingCamps = camps.filter(camp => new Date(camp.dateTime) >= today);
//   const completedCamps = camps.filter(camp => new Date(camp.dateTime) < today);

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Dashboard - NGO Staff</h1>
//         <button onClick={handleLogout} className="logout-button">Logout</button>
//       </header>

//       <div className="dashboard-content">
//         <div className="dashboard-cards">
//           <div className="dashboard-card" onClick={handleAddCamp}>
//             <h2>Schedule a Camp</h2>
//             <p>Schedule a new Screening camp</p>
//             <button>Add Camp</button>
//           </div>
          
//           <div className="dashboard-card">
//             <h2>Completed Camps</h2>
//             <p>List of Camps that have been completed successfully.</p>
//             <button onClick={() => navigate('/completed-camps', { state: { camps: completedCamps } })}>View</button>
//           </div>
          
//           <div className="dashboard-card">
//             <h2>Upcoming Camps</h2>
//             <p>List of Camps scheduled for the future.</p>
//             <button onClick={() => navigate('/upcoming-camps', { state: { camps: upcomingCamps } })}>View</button>
//           </div>
//         </div>

//         <div className="analytics-section">
//           <h2>Analytics</h2>
//           <div className="analytics-chart">
//             <div className="chart-circle">
//               <div className="chart-segment" style={{ '--size': '50%' }}>50%</div>
//               <div className="chart-segment" style={{ '--size': '30%' }}>30%</div>
//               <div className="chart-segment" style={{ '--size': '10%' }}>10%</div>
//               <div className="chart-segment" style={{ '--size': '10%' }}>10%</div>
//             </div>
//             <p>Age Distribution of total students screened</p>
//           </div>

//           <div className="calendar-container">
//             <h3>Schedule and View Camps</h3>
//             <Calendar
//               onChange={setDate}
//               value={date}
//               tileClassName={tileClassName}
//               onClickDay={(selectedDate) => openPopup(selectedDate)}
//             />
//             <p className="selected-date-info">Selected Date: {date.toDateString()}</p>
//           </div>
//         </div>
//       </div>

//       {showPopup && (
//         <AddCampPopup
//           date={date}
//           camps={selectedDateCamps}
//           onClose={closePopup}
//           onAddCamp={handleAddCamp}
//         />
//       )}
//     </div>
//   );
// };

// export default DashboardNGO;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardNGO.css';
import AddCampPopup from './AddCampPopup';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DashboardNGO = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [camps, setCamps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDateCamps, setSelectedDateCamps] = useState([]);
  const today = new Date(); // Today's date

  useEffect(() => {
    fetchCamps();
  }, []);

  // Fetch all camps from MongoDB
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

  const handleAddCamp = () => {
    navigate('/schedule-camp');
  };

  // Define classes for calendar dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isPastDate = date < today;
      const hasCampOnDate = camps.some(camp => new Date(camp.dateTime).toDateString() === date.toDateString());
      
      if (!isPastDate && hasCampOnDate) {
        return 'highlighted-date'; // Highlight future dates with scheduled camps
      }
    }
  };

  // Filter for upcoming and completed camps based on today's date
  const upcomingCamps = camps.filter(camp => new Date(camp.dateTime) >= today);
  const completedCamps = camps.filter(camp => new Date(camp.dateTime) < today);

  // Get number of camps scheduled for the selected date
  const scheduledCampsForSelectedDate = camps.filter(
    camp => new Date(camp.dateTime).toDateString() === date.toDateString()
  ).length;

  // Data for analytics pie chart
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
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="dashboard-card" onClick={handleAddCamp}>
            <h2>Schedule a Camp</h2>
            <p>Schedule a new Screening camp</p>
            <p><strong>Scheduled Today:</strong> {scheduledCampsForSelectedDate}</p>
            <button>Add Camp</button>
          </div>
          
          <div className="dashboard-card">
            <h2>Completed Camps</h2>
            <p>List of Camps that have been completed successfully.</p>
            <p><strong>Total:</strong> {completedCamps.length}</p>
            <button onClick={() => navigate('/completed-camps', { state: { camps: completedCamps } })}>View</button>
          </div>
          
          <div className="dashboard-card">
            <h2>Upcoming Camps</h2>
            <p>List of Camps scheduled for the future.</p>
            <p><strong>Total:</strong> {upcomingCamps.length}</p>
            <button onClick={() => navigate('/upcoming-camps', { state: { camps: upcomingCamps } })}>View</button>
          </div>
        </div>

        <div className="analytics-section">
          <h2>Analytics</h2>
          <div className="analytics-chart">
            <Pie data={pieData} />
            <p>Distribution of Scheduled, Completed, and Upcoming Camps</p>
          </div>

          <div className="calendar-container">
            <h3>Schedule and View Camps</h3>
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={tileClassName}
              onClickDay={(selectedDate) => openPopup(selectedDate)}
            />
            <p className="selected-date-info">Selected Date: {date.toDateString()}</p>
          </div>
        </div>
      </div>

      {showPopup && (
        <AddCampPopup
          date={date}
          camps={selectedDateCamps}
          onClose={closePopup}
          onAddCamp={handleAddCamp}
        />
      )}
    </div>
  );
};

export default DashboardNGO;

