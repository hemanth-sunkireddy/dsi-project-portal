import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const studentID = localStorage.getItem('student-id');
  const [filteredStudents, setFilteredStudents] = useState([]);
  

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/auth/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching Students:', error);
    }
  };

  // Display only the selected volunteer Students
  const filterStudents = () => {
    const filtered = students.filter((student) => student.studentId === studentID);
    setFilteredStudents(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    if (students.length > 0) {
      filterStudents();
    }
  }, [students]);

  useEffect(() => {
    fetchStudents();
  }, []);

  
  const handleHomeClick = () => {
    navigate(`/dashboard`);
  };

  const handleConductScreening = () => {
    navigate(`/conduct-screening`);
  };


  return (
    <div className="camps-list-container">
      <h2>Student Details</h2>

      {filteredStudents.length > 0 ? (
        <div className="camp-details">
          {filteredStudents.map((student) => (
            <div key={student.studentId} className="camp-card">
              <p><strong>Student ID:</strong> {student.studentId}</p>
              <p><strong>Student Name:</strong> {student.name}</p>
              <p><strong>Address:</strong> {student.address}</p>
              <p><strong>Gender:</strong> {student.gender}</p>
              <p><strong>Phone Number:</strong> {student.phoneNumber}</p>
              <p><strong>Status:</strong> {student.status}</p>
              <p><strong>Date of Screening:</strong> {new Date(student.dateTime).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Student Not Found</p>
      )}

      <div className="button-container">
        <button onClick={handleConductScreening}>Conduct Screening</button>
        <button onClick={handleHomeClick}>Home</button>
      </div>
    </div>
  );
};

export default StudentProfile;
