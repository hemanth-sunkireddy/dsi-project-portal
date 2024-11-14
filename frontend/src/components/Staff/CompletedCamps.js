import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StaffCompletedCamps = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { camps } = location.state || { camps: [] };
  
  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details`);
  };

  return (
    <div className="camps-list-container">
      <h2>Completed Camps</h2>
      {camps.length > 0 ? (
        <table className="camps-table">
          <thead>
            <tr>
              <th>Camp ID</th>
              <th>School Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Students Registered</th>
              <th>+ve Result after screening</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr key={camp.campID} onClick={() => handleRowClick(camp.campID)}>
                <td>{camp.campID}</td>
                <td>{camp.schoolName}</td>
                <td>{camp.location}</td>
                <td>{new Date(camp.dateTime).toLocaleDateString()}</td>
                <td>{camp.studentsRegistered}</td>
                <td>{camp.studentsPositive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed camps available.</p>
      )}
    </div>
  );
};

export default StaffCompletedCamps;