import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const UpcomingCamps = () => {
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
      <h2>Upcoming Camps</h2>
      {filteredCamps.length > 0 ? (
        <table className="camps-table">
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
        <p>No upcoming camps scheduled.</p>
      )}
    </div>
  );
};

export default UpcomingCamps;
