import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampDetailsUpComing = () => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [campStatus, setCampStatus] = useState('');
  const campID = localStorage.getItem('camp-id');
  const [filteredCamps, setFilteredCamps] = useState([]);

  const fetchCamps = async () => {
    try {
      const response = await axios.get('/api/auth/camps');
      setCamps(response.data);
      console.log(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const filterCamps = () => {
    const filtered = camps.filter((camp) => camp.campID === campID);
    setFilteredCamps(filtered);
    localStorage.setItem('volunteer', filtered[0]?.volunteer);
    setCampStatus(filtered[0]?.status || ''); // Set initial status
  };

  const handleCampStatusChange = async (e) => {
    const newStatus = e.target.value; // Get the updated value from the select input
    setCampStatus(newStatus); // Update local state (this will trigger a re-render)

    try {
      const response = await axios.post('/api/auth/updateCampStatus', {
        campID: campID,
        status: newStatus, // Send the updated status
      });
      if (response.status === 201) {
        console.log('Camp status updated successfully');
      }
    } catch (error) {
      console.error('Error updating camp status:', error);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps]);

  const handleAddStudentClick = () => {
    navigate(`/add-student`);
  };

  const handleViewStudentsClick = () => {
    navigate(`/patients-list`);
  };

  const handleHomeClick = () => {
    navigate(`/dashboard`);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.logoSection}>
          <img
            src="./Choice_Foundation.png" // Replace with the Choice Foundation logo URL
            alt="Choice Foundation Logo"
            style={styles.logo}
          />
        </div>
        <button style={styles.homeButton} onClick={handleHomeClick}>
          Home
        </button>
      </div>

      {/* Title Section */}
      <div style={styles.titleSection}>
        <h1 style={styles.pageTitle}>Camp Details</h1>
      </div>

      {/* Outer Container */}
      <div style={styles.outerBox}>
        <div style={styles.header}>
          <h2 style={styles.sectionTitle}>Camp Information</h2>
          <div style={styles.headerButtons}>
            <button style={styles.button} onClick={handleViewStudentsClick}>
              View Students
            </button>
            <button style={styles.button} onClick={handleAddStudentClick}>
              Add Student
            </button>
          </div>
        </div>

        {/* Inner Box */}
        <div style={styles.innerBox}>
          {/* Camp Information */}
          <div style={styles.section}>
            <div style={styles.grid}>
              <div style={styles.gridItem}>
                <strong>Camp ID:</strong> {filteredCamps[0]?.campID}
              </div>
              <div style={styles.gridItem}>
                <strong>School Name:</strong> {filteredCamps[0]?.schoolName}
              </div>
              <div style={styles.gridItem}>
                <strong>Date of Screening:</strong>{' '}
                {new Date(filteredCamps[0]?.dateTime).toLocaleDateString()}
              </div>
              <div style={styles.gridItem}>
                <strong>Contact:</strong> {filteredCamps[0]?.contact}
              </div>
              <div style={styles.gridItem}>
                <strong>Doctor Assigned:</strong> {filteredCamps[0]?.doctor}
              </div>
              <div style={styles.gridItem}>
                <strong>Address:</strong> {filteredCamps[0]?.location}
              </div>
              <div style={styles.gridItem}>
                <strong>Status:</strong> {campStatus} {/* Display the updated status */}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div style={styles.section}>
            <h3 style={styles.subSectionTitle}>Statistics</h3>
            <div style={styles.statisticsGrid}>
              <div style={styles.gridItem}>
                <strong>Pre-Screened:</strong>{' '}
                {filteredCamps[0]?.studentsScreened || 'N/A'}
              </div>
              <div style={styles.gridItem}>
                <strong>To Be Diagnosed:</strong>{' '}
                {filteredCamps[0]?.studentsPositive || 'N/A'}
              </div>
              <div style={styles.gridItem}>
                <strong>Scheduled for Diagnosis:</strong> 14
              </div>
              <div style={styles.gridItem}>
                <strong>Tested Positive:</strong> 5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: `radial-gradient(circle, #eef2f6 0%, #f6e3eb 48%, #d5deed 93%), 
                 linear-gradient(to bottom, #d8d2fc, #fde2e0, #e6e4ea, #e0e9f4, #e6e1e8, #e0e9f4)`,
    minHeight: '100vh',
    fontFamily: '"Poppins", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  headerSection: {
    width: '90%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    maxHeight: '80px', // Adjust this value to control the maximum height
    width: 'auto', // Maintain aspect ratio
    objectFit: 'contain', // Ensures the logo is not distorted
  },
  titleSection: {
    width: '90%',
    maxWidth: '1200px',
    marginBottom: '20px',
    textAlign: 'left',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  homeButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  outerBox: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '1200px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerButtons: {
    display: 'flex',
    gap: '10px',
  },
  dropdownContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  dropdown: {
    padding: '8px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  innerBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  section: {
    backgroundColor: '#f5f7fa',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    color: '#000',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000',
  },
  subSectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#000',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    color: '#000',
  },
  statisticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    color: '#000',
  },
  gridItem: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: '#000',
  },
};

export default CampDetailsUpComing;
