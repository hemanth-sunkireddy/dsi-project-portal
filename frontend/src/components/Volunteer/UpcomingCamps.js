import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UpcomingCamps = () => {
  const location = useLocation();
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

  return (
    <div style={{ 
      backgroundColor: 'white', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      paddingLeft: '20px',  // Adds space only on the left side
      paddingRight: '20px',  // Adds space on the right side
      paddingTop: '0',  // Ensure no space at the top of the page
      margin: 0  // Remove any default margin
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '800px', 
        padding: '20px',  // Space inside the box, around the content
        boxSizing: 'border-box', 
        textAlign: 'center'  // Title is centered horizontally
      }}>
        <h2 style={{ color: 'black' }}>Upcoming Camps</h2>
        {filteredCamps.length > 0 ? (
          <table className="camps-table" style={{ 
            color: 'black', 
            width: '100%', 
            borderCollapse: 'collapse', 
            margin: '0 auto'  // Centers the table horizontally
          }}>
            <thead>
              <tr>
                <th>Camp ID</th>
                <th>School Name</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCamps.map((camp) => (
                <tr key={camp.campID}>
                  <td>{camp.campID}</td>
                  <td>{camp.schoolName}</td>
                  <td>{camp.location}</td>
                  <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{color: 'black'}}>No upcoming camps scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingCamps;
