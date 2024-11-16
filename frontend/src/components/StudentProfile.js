import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        color: 'black', // Text color changed to black
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Start from top
        alignItems: 'center', // Center the content horizontally
      }}
    >
      <h2 style={{ color: 'black', marginBottom: '20px' }}>Student Details</h2>

      {filteredStudents.length > 0 ? (
        <div
          className="camp-details"
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '800px',
            marginBottom: '20px',
          }}
        >
          {filteredStudents.map((student) => (
            <div key={student.studentId} className="camp-card" style={{ marginBottom: '15px' }}>
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

      <div
        className="button-container"
        style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          width: '100%',
          paddingTop: '20px', // Give some space at the top for the buttons
        }}
      >
        <button
          onClick={handleConductScreening}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Conduct Screening
        </button>
        <button
          onClick={handleHomeClick}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
