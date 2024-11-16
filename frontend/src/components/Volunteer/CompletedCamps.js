import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompletedCamps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user_name = localStorage.getItem('name');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const { camps } = location.state || { camps: [] };
  console.log({ camps });

  // Display only that volunteer camps
  const filterCamps = () => {
    const filtered = camps.filter(
      (camp) => camp.volunteer === user_name || camp.doctor === user_name
    );
    setFilteredCamps(filtered);
  };

  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details`);
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
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '0', // Ensures no space at the top
      margin: 0 // Ensures no margin is applied
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        padding: '20px',  // Adds space inside the container
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'black' }}>Completed Camps</h2>
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
                <th>Date</th>
                <th>Students Registered</th>
                <th>+ve Result after screening</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCamps.map((camp) => (
                <tr key={camp.campID} onClick={() => handleRowClick(camp.campID)}>
                  <td>{camp.campID}</td>
                  <td>{camp.schoolName}</td>
                  <td>{camp.location}</td>
                  <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                  <td>{camp.studentsRegistered}</td>
                  <td>{camp.studentsPositive}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: '#007bff', // Blue background
                        color: 'white',
                        border: 'none',
                        padding: '10px 30px', // Padding to make the button wider
                        cursor: 'pointer',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap' // Ensures the text stays on a single line
                      }}
                      onClick={() => handleRowClick(camp.campID)}
                    >
                      Go to Camp
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'black' }}>No completed camps available.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedCamps;
