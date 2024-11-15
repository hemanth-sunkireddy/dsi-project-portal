// EditProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  // Get user info from localStorage
  const userName = localStorage.getItem('name');

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/auth/profiledata/${userName}`);
        const userData = response.data.document;
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUpdateMessage('');

    try {
      const response = await axios.put(`/api/auth/updateprofile/${userName}`, formData);
      
      if (response.data.success) {
        setUpdateMessage('Profile updated successfully!');
        // Update localStorage if name has changed
        if (formData.name !== userName) {
          localStorage.setItem('name', formData.name);
        }
        // Navigate back to profile page after 2 seconds
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">Edit Profile</div>
          <div className="nav-links">
            <button onClick={() => navigate('/profile')} className="nav-link">
              Back to Profile
            </button>
          </div>
        </div>
      </nav>

      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <h2>Edit Profile Information</h2>
          
          {error && <div className="error-message">{error}</div>}
          {updateMessage && <div className="success-message">{updateMessage}</div>}

          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter your role"
                readOnly
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;