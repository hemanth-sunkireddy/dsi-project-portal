import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const CampDetails = () => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const campID = localStorage.getItem('camp-id');
  const [filteredCamps, setFilteredCamps] = useState([]);
  

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
    localStorage.setItem('volunteer', filtered.volunteer);
  };

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps]);

  useEffect(() => {
    fetchCamps();
  }, []);

  
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
    <div className="camps-list-container">
      <h2>Camps Details</h2>

      {filteredCamps.length > 0 ? (
        <div className="camp-details">
          {filteredCamps.map((camp) => (
            <div key={camp.campID} className="camp-card">
              <p><strong>Camp ID:</strong> {camp.campID}</p>
              <p><strong>School Name:</strong> {camp.schoolName}</p>
              <p><strong>Location:</strong> {camp.location}</p>
              <p><strong>Students Registered:</strong> {camp.studentsRegistered}</p>
              <p><strong>Students Screened:</strong> {camp.studentsScreened}</p>
              <p><strong>Students Positive:</strong> {camp.studentsPositive}</p>
              <p><strong>Contact of School:</strong> {camp.contact}</p>
              <p><strong>Doctor Assigned:</strong> {camp.doctor}</p>
              <p><strong>Status:</strong> {camp.status}</p>
              <p><strong>Date of Screening:</strong> {new Date(camp.dateTime).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Camp Not Found</p>
      )}

      <div className="button-container">
        <button onClick={handleAddStudentClick}>Add Student</button>
        <button onClick={handleViewStudentsClick}>View Students</button>
        <button onClick={handleHomeClick}>Home</button>
      </div>
    </div>
  );
};

export default CampDetails;
