import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampDetailsStaff = () => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const campID = localStorage.getItem('camp-id');

  const fetchCamps = async () => {
    try {
      const response = await axios.get('/api/auth/camps');
      setCamps(response.data);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  // Display only the selected volunteer camps
  const filterCamps = () => {
    const filtered = camps.filter((camp) => camp.campID === campID);
    setFilteredCamps(filtered);
    localStorage.setItem('volunteer', filtered[0]?.volunteer); // Get volunteer from filtered camp
    setLoading(false); // Set loading to false after data is filtered
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps]);

  const handleHomeClick = () => {
    navigate(`/dashboard`);
  };

  const handleAddStudentClick = () => {
    navigate(`/add-student`);
  };

  const handleViewStudentsClick = () => {
    navigate(`/patients-list`);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
        boxSizing: 'border-box',
        color: 'black',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
        <h2>Camps Details</h2>

        {/* Button container at the top right */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            onClick={handleAddStudentClick}
            style={{
              backgroundColor: '#007bff', // Blue background
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            Add Student
          </button>
          <button
            onClick={handleViewStudentsClick}
            style={{
              backgroundColor: '#007bff', // Blue background
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            View Students
          </button>
          <button
            onClick={handleHomeClick}
            style={{
              backgroundColor: '#007bff', // Blue background
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            Home
          </button>
        </div>

        {/* Display Loading while camps are being fetched */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredCamps.length > 0 ? (
          <div
            className="camp-details"
            style={{ marginTop: '70px', width: '100%', maxWidth: '800px' }}
          >
            {filteredCamps.map((camp) => (
              <div
                key={camp.campID}
                className="camp-card"
                style={{
                  padding: '20px',
                  border: '1px solid #ddd',
                  marginBottom: '20px',
                  borderRadius: '6px',
                }}
              >
                <p>
                  <strong>Camp ID:</strong> {camp.campID}
                </p>
                <p>
                  <strong>School Name:</strong> {camp.schoolName}
                </p>
                <p>
                  <strong>Location:</strong> {camp.location}
                </p>
                <p>
                  <strong>Students Registered:</strong> {camp.studentsRegistered}
                </p>
                <p>
                  <strong>Students Screened:</strong> {camp.studentsScreened}
                </p>
                <p>
                  <strong>Students Positive:</strong> {camp.studentsPositive}
                </p>
                <p>
                  <strong>Contact of School:</strong> {camp.contact}
                </p>
                <p>
                  <strong>Doctor Assigned:</strong> {camp.doctor}
                </p>
                <p>
                  <strong>Status:</strong> {camp.status}
                </p>
                <p>
                  <strong>Date of Screening:</strong>{' '}
                  {new Date(camp.dateTime).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Camp Not Found</p>
        )}
      </div>
    </div>
  );
};

export default CampDetailsStaff;
