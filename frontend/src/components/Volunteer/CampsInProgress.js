import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CampsInProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_name = localStorage.getItem('name');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const { camps } = location.state || { camps: [] };

  // Display only the camps where the user is a volunteer
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
    <div style={{ 
      backgroundColor: 'white', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      paddingLeft: '20px', 
      paddingRight: '20px', 
      paddingTop: '0', 
      margin: 0 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '800px', 
        padding: '20px', 
        boxSizing: 'border-box', 
        textAlign: 'center' 
      }}>
        <h2 style={{ color: 'black' }}>Camps In Progress</h2>
        {filteredCamps.length > 0 ? (
          <table className="camps-table" style={{ 
            color: 'black', 
            width: '100%', 
            borderCollapse: 'collapse', 
            margin: '0 auto' // Centers the table horizontally
          }}>
            <thead>
              <tr>
                <th>Camp ID</th>
                <th>School Name</th>
                <th>Location</th>
                <th>Students Registered</th>
                <th>Students Screened</th>
                <th>Action</th> {/* Added Action column */}
              </tr>
            </thead>
            <tbody>
              {filteredCamps.map((camp) => (
                <tr key={camp.campID} onClick={() => handleRowClick(camp.campID)}>
                  <td>{camp.campID}</td>
                  <td>{camp.schoolName}</td>
                  <td>{camp.location}</td>
                  <td>{camp.studentsRegistered}</td>
                  <td>{camp.studentsScreened}</td>
                  <td>
                    <button 
                      style={{
                        backgroundColor: '#007bff', // Blue background
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 30px', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap' // Prevents text wrapping
                      }} 
                      onClick={() => handleRowClick(camp.campID)}
                    >
                      Go to Camp
                    </button>
                  </td> {/* Go to Camp button in the Action column */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{color: 'black'}}>No camps in progress today.</p>
        )}
      </div>
    </div>
  );
};

export default CampsInProgress;
