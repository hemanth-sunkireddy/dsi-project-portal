import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StaffCompletedCamps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { camps } = location.state || { camps: [] };

  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details-staff`);
  };

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
        <h2>Completed Camps</h2>
        {camps.length > 0 ? (
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
                <th>Volunteer</th>
                <th>Doctor</th>
                <th>Students Registered</th>
                <th>+ve Result after screening</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp) => (
                <tr key={camp.campID} onClick={() => handleRowClick(camp.campID)}>
                  <td>{camp.campID}</td>
                  <td>{camp.schoolName}</td>
                  <td>{camp.location}</td>
                  <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                  <td>{camp.volunteer}</td>
                  <td>{camp.doctor}</td>
                  <td>{camp.studentsRegistered}</td>
                  <td>{camp.studentsPositive}</td>
                  <td>                    <button
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
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No completed camps available.</p>
        )}
      </div>
    </div>
  );
};

export default StaffCompletedCamps;