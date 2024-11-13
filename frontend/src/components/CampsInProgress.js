import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const CampsInProgress = () => {
  const location = useLocation();
  const user_name = localStorage.getItem('name');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const { camps } = location.state || { camps: [] };

  // Display only that volunteer camps
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
    <div className="camps-list-container">
      <h2>Camps In Progress</h2>
      {filteredCamps.length > 0 ? (
        <table className="camps-table">
          <thead>
            <tr>
              <th>Camp ID</th>
              <th>School Name</th>
              <th>Location</th>
              <th>Students Registered</th>
              <th>Students Screened</th>
            </tr>
          </thead>
          <tbody>
            {filteredCamps.map((camp) => (
              <tr key={camp.campID}>
                <td>{camp.campID}</td>
                <td>{camp.schoolName}</td>
                <td>{camp.location}</td>
                <td>{camp.studentsRegistered}</td>
                <td>{camp.studentsScreened}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No camps in progress today.</p>
      )}
    </div>
  );
};

export default CampsInProgress;
