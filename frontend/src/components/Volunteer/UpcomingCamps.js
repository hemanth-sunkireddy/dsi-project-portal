import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpcomingCamps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user_name = localStorage.getItem('name');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const { camps } = location.state || { camps: [] };

  const filterCamps = () => {
    const filtered = camps.filter(
      (camp) => camp.volunteer === user_name
    );
    setFilteredCamps(filtered);
  };

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps]);

  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details`);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          background: 'linear-gradient(to bottom, #9F69B8, #4D8BCC)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <i className="fa fa-user-circle" style={{ marginRight: '10px', fontSize: '24px' }}></i>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Volunteer</span>
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <i className="fa fa-home" style={{ marginRight: '10px' }}></i> Home
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        >
          <i className="fa fa-user" style={{ marginRight: '10px' }}></i> Profile
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/support')}
        >
          <i className="fa fa-question-circle" style={{ marginRight: '10px' }}></i> Support
        </div>
        <div
          style={{
            marginTop: 'auto',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          <i className="fa fa-sign-out-alt" style={{ marginRight: '10px' }}></i> Log Out
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div>
            <img src="./Choice_Foundation.png" alt="Company Logo" style={{ height: '40px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fa fa-user-circle"
              style={{ fontSize: '30px', marginRight: '10px' }}
            ></i>
            <span style={{ color: 'black' }}>{user_name}</span>
          </div>
        </header>

        <h2 style={{ color: 'black', marginBottom: '20px' }}>Upcoming Camps</h2>

        {/* Table */}
        <div style={{ textAlign: 'center' }}>
          {filteredCamps.length > 0 ? (
            <table
              className="camps-table"
              style={{
                color: 'black',
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <th>Camp ID</th>
                  <th>School Name</th>
                  <th>Location</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredCamps.map((camp) => (
                  <tr
                    key={camp.campID}
                    style={{
                      backgroundColor: '#f9f9fc',
                      color: 'black',
                    }}
                    onClick={() => handleRowClick(camp.campID)}
                  >
                    <td>{camp.campID}</td>
                    <td>{camp.schoolName}</td>
                    <td>{camp.location}</td>
                    <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: 'black' }}>No upcoming camps scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingCamps;
