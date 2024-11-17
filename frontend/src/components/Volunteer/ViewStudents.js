import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const volunteerName = localStorage.getItem('name');
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Fetching students from the server
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/auth/students');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Display only the students associated with the selected volunteer
  const filterStudents = () => {
    const filtered = students.filter((student) => student.volunteer === volunteerName);
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

  // Handling row click to navigate to student profile
  const handleRowClick = (studentId) => {
    localStorage.setItem('student-id', studentId);
    navigate(`/student-profile`);
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
        <h2>Students List</h2>

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
            onClick={() => navigate(`/add-student`)}
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
            onClick={() => navigate(`/dashboard`)}
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

        {/* Display filtered students */}
        {filteredStudents.length > 0 ? (
          <table
          className="camps-table"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '70px',
          }}
        >
          <thead>
            <tr>
              <th>Student ID</th>
              <th>School Name</th>
              <th>Status</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.studentId}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e6f7ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9';
                }}
              >
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.status}</td>
                <td>{student.phoneNumber}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(student.studentId);
                    }}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>        
        ) : (
          <p>No students found for this volunteer.</p>
        )}
      </div>
    </div>
  );
};

export default ViewStudents;
