import React from 'react';
import { useLocation } from 'react-router-dom';

const CompletedCamps = () => {
  const location = useLocation();
  const { camps } = location.state || { camps: [] };

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
              <th>Volunteer</th>
              <th>Doctor</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
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
        <p>No completed camps available.</p>
      )}
    </div>
  );
};

export default CompletedCamps;

