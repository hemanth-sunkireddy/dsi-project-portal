import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ViewStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const volunteerName = localStorage.getItem('name');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/auth/students');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Display only the selected volunteer students
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

  const handleRowClick = (studentId) => {
    localStorage.setItem('student-id', studentId);
    navigate(`/student-profile`);
  };

  return (
    <div className="camps-list-container">
      <h2>Students List</h2>

      {filteredStudents.length > 0 ? (
        <table className="camps-table">
          <thead>
            <tr>
              <th>student ID</th>
              <th>School Name</th>
              <th>Status</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.studentId} onClick={() => handleRowClick(student.studentId)}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.status}</td>
                <td>{student.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed students available.</p>
      )}
      </div>
  );
};

export default ViewStudents;
