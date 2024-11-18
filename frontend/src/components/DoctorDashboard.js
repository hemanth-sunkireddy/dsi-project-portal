import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { PieChart, Pie, Cell } from 'recharts';
import 'react-calendar/dist/Calendar.css';
// import './VolunteerDashboard.css';
import { Bell, Home, User, HelpCircle, LogOut } from 'lucide-react';
import axios from 'axios';
import icon from './doctor_icon.png'
import logo from './Choice_logo.png'
import pic from './pic.png'
const CompletedMeetings = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [camps, setCamps] = useState([]);
  const [selectedDateCamps, setSelectedDateCamps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const today = new Date();
  const userName = localStorage.getItem('name') || 'Doctor';

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
      console.log(response)
      const volunteerCamps = response.data.filter(camp => camp.doctor === userName);
      setCamps(volunteerCamps);
      console.log(volunteerCamps);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const ageData = [
    { name: '5-12', value: 50, color: '#60C6F0' },
    { name: '0-5', value: 10, color: '#FF7F50' },
    { name: '12-25', value: 30, color: '#90EE90' },
    { name: '>25', value: 10, color: '#DEB887' }
  ];

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
      {/* Sidebar */}
      <div className="sidebar">
      <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '30px',
          marginRight:'20px' 
        }}>
          <img 
          src={icon} 
          alt="Doctor Icon" 
          style={{ 
          width: '80px', 
          height: '80px', 
          marginRight: '20px', 
          borderRadius: '50%' // Optional, for circular icons
    }} 
  />
          <i className="fa fa-user-circle" style={{ 
            marginRight: '10px', 
            fontSize: '24px' 
          }}></i>
          <span style={{ 
            fontWeight: 'bold', 
            fontSize: '30px', 
            position:'relative',
            left:'-20px'
          }}>Doctor</span>
        </div>
        
        <div className="sidebar-menu">
          <button onClick={() => navigate('/dashboard')} className="sidebar-item">
            <Home className="sidebar-icon" />
            <span style={{ fontSize: '20px',fontWeight: 'bold'}}>Home</span>
            </button>

          <button onClick={() => navigate('/profile')} className="sidebar-item">
            <User className="sidebar-icon" />
            <span style={{ fontSize: '20px',fontWeight:'bold' }}>Profile</span>
            </button>

          <button onClick={() => navigate('/support')} className="sidebar-item">
            <HelpCircle className="sidebar-icon" />
            <span style={{ fontSize: '20px' ,fontWeight:'bold'}}>Support</span>
            </button>
        </div>

        <button 
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }} 
          className="sidebar-item logout-button"
        >
          <LogOut className="sidebar-icon" />
          <span style={{ fontSize: '20px',fontWeight: 'bold'}}>LogOut</span>
          </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Main Content */}
<div className="main-content">
  {/* Header */}
  <div 
    className="header" 
    style={{
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      padding: "10px 20px", 
      borderBottom: "1px solid #ccc",
      height:'130px'
    }}
  >
    {/* Logo Section */}
    <div className="header-left" style={{ display: "flex", alignItems: "center" }}>
      <img 
        src={logo} 
        alt="Choice Foundation" 
        style={{ 
          width: "400px", 
          height: "80px", 
          marginRight: "10px" 
        }} 
      />
      {/* <h2 className="header-title" style={{ margin: 0 }}>Choice Foundation</h2> */}
    </div>

    {/* Center Title */}
    <div 
      className="header-center" 
      style={{ 
        textAlign: "center", 
        flex: 1 
      }}
    >
      <h2 style={{ margin: 0 ,color:'black',fontFamily:'-moz-initial',fontSize:'30px'}}>Dashboard - Doctor</h2>
    </div>

    {/* Right Section */}
    <div 
      className="header-right" 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "flex-end" 
      }}
    >
      <img 
        src={pic} 
        alt="Profile" 
        style={{ 
          width: "50px", 
          height: "50px", 
          borderRadius: "50%", 
          objectFit: "cover",
          position:'relative',
          right:"10px"
           
        }} 
      />
        <span style={{ marginRight: "10px" ,color:'black',fontWeight:'bold'}}>Hi there,</span>
        <span style={{ marginRight: "10px", fontWeight: "bold",color:'black' }}>{userName}</span>
    </div>
  </div>
</div>


        <div className="dashboard-content">
          {/* <h1 className="page-title">Dashboard - Doctor</h1> */}

          {/* Cards */}
          <div className="dashboard-cards">
          <div className="dashboard-card" onClick={() => navigate('/completed-meetings', { state: { camps: ongoingCamps } })}>
              <h2 style={{fontSize:'30px'}}>Completed Meetings</h2>
              <p style={{fontSize:'23px'}}>List of camps the doctor has visited and successfully completed patient diagnoses</p>
              <button style={{fontSize:'20px',fontWeight:'bold'}}>View</button>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/scheduled-meetings', { state: { camps: completedCamps } })}>
              <h2 style={{fontSize:'30px'}}>Scheduled Meetings</h2>
              <p style={{fontSize:'23px'}}>List of camps where the doctor needs to visit for patient diagnosis</p>
              <button style={{fontSize:'20px',fontWeight:'bold'}}>View</button>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/in-progress-meetings', { state: { camps: upcomingCamps } })}>
            {/* <h2>Unscheduled Meetings</h2> */}
              <h2 style={{fontSize:'30px'}}>Unscheduled Meetings</h2>
              <p style={{fontSize:'23px'}}>List of camps pending scheduling for the doctor's visit to diagnose patients</p>
              <button style={{fontSize:'20px',fontWeight:'bold'}}>View</button>
            </div>
          </div>

          <div className="bottom-section">
            {/* Age Distribution Chart */}
            <div className="analytics-container">
              <h2 className="chart-title">Age distribution of Children Diagnosed</h2>
              <div className="chart-container">
                <PieChart width={400} height={300}>
                  <Pie
                    data={ageData}
                    cx={200}
                    cy={150}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="chart-legend">
                  {ageData.map((entry, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
                      <span>{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="calendar-container">
              <Calendar
                onChange={setDate}
                value={date}
                className="custom-calendar"
                tileClassName={tileClassName}
                onClickDay={openPopup}
              />
            </div>
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

      <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #F5F7FB;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 256px;
          background: linear-gradient(180deg, #9F69B8 0%, #4D8BCC 100%);
          padding: 32px;
          display: flex;
          flex-direction: column;
          color: white;
        }
        .header{
        background: white;
        }
        .sidebar-header {
          margin-bottom: 48px;
        }

        .sidebar-title {
          font-size: 24px;
          font-weight: bold;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
          text-align: left;
        }

        .sidebar-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .sidebar-icon {
          width: 40px;
          height: 40px;
          font: 20px;
        }

        .logout-button {
          margin-top: auto;
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          overflow-y: auto;
        }
        .notification-button {
          padding: 8px;
          border-radius: 50%;
          border: none;
          background: #f1f1f1;
          cursor: pointer;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .greeting {
          color: #666;
        }

        .username {
          font-weight: 600;
        }

        .profile-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        /* Dashboard Content Styles */
        .dashboard-content {
          padding: 32px;
        }

        .page-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 32px;
        }

        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 24px;
        }

        .dashboard-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          position: relative;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          height: 230px;
          width: 470px;
          display: flex;
          flex-direction: column;
        }

        .dashboard-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background-color: #9F69B8;
          border-radius: 8px 0 0 8px;
        }

        .dashboard-card h2 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .dashboard-card p {
          color: #666;
          font-size: 14px;
          margin-bottom: auto;
        }

        .dashboard-card button {
          background: #3060ff;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 24px;
          cursor: pointer;
          align-self: center;
          height : 50px;
          width : 150px;
        }

        .bottom-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .analytics-container, .calendar-container {
          background: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          width:400px;
          height:400px
        }

        .chart-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .chart-container {
          position: relative;
        }

        .chart-legend {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        /* Calendar Styles */
        .custom-calendar {
          width: 100%;
          border: none;
        }

        .highlighted-date {
          background-color: #3060ff !important;
          color: white !important;
          border-radius: 50%;
        }

        /* React Calendar Customization */
        .react-calendar {
          border: none;
          font-family: Arial, sans-serif;
        }

        .react-calendar__tile {
          padding: 10px;
          font-size: 14px;
        }

        .react-calendar__navigation button {
          font-size: 16px;
          color: #333;
        }

        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 12px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default CompletedMeetings;