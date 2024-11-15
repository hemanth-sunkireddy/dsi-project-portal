// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProfilePage.css';
// function ProfilePage() {
//   const [profileData, setProfileData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // Get user info from localStorage
//   const role = localStorage.getItem('role');
//   const name = localStorage.getItem('name');
//   const fetchProfileData = async () => {
//     if (!role || !name) {
//       setError('User information not found');
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axios.get(`/api/auth/profiledata/${name}`)
//       console.log(response)
//       console.log(response.data.document)
//       setProfileData(response.data.document);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//       setError('Failed to load profile');
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchProfileData();
//   }, [role, name]);
//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }
//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//       </div>
//     );
//   }
//   if (!profileData) {
//     return <div>No profile data found</div>;
//   }
//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <h2>{profileData.name}'s Profile</h2>
//       </div>
//       <div className="profile-content">
//         <div className="basic-info">
//           <h3>Profile Information</h3>
//           <div className="profile-field">
//             <label>Name:</label>
//             <span>{profileData.name}</span>
//           </div>
//           <div className="profile-field">
//             <label>Email:</label>
//             <span>{profileData.email}</span>
//           </div>
//           <div className="profile-field">
//             <label>Role:</label>
//             <span>{profileData.role}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import Profilepic from './pic.png'

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user info from localStorage
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  // const handleHomeClick = () => {
  //   if (role === 'NGO Worker') {
  //     navigate('/dashboard');
  //   } else if (role === 'Volunteer') {
  //     navigate('/dashboard');
  //   }
  // };
  const fetchProfileData = async () => {
    if (!role || !name) {
      setError('User information not found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/api/auth/profiledata/${name}`);
      console.log(response);
      console.log(response.data.document);
      setProfileData(response.data.document);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [role, name]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!profileData) {
    return <div className="no-data">No profile data found</div>;
  }

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">My Profile</div>
          <div className="nav-links">
          {/* <button onClick={handleHomeClick} className="nav-link">Home</button> */}
          <a href="/dashboard" className="nav-link">Home</a>

           <a href="/editprofile" className="nav-link">Edit Profile</a>
           <a href="/support" className="nav-link">Support</a>

            <a href="/" className="nav-link">Logout</a>
          </div>
        </div>
      </nav>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              {/* Replace with actual image URL from your backend */}
              <img 
                src={Profilepic} 
                alt="Profile" 
                className="profile-image" 
              />
            </div>
            <h2 className="profile-name">{profileData.name}</h2>
          </div>

          <div className="profile-content">
            <div className="profile-field">
              <label>Role</label>
              <span>{profileData.role}</span>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <span>{profileData.email}</span>
            </div>
            <div className="profile-field">
              <label>Id number</label>
              <span>14523678</span>
            </div>
            <div className="profile-field">
              <label>Phone Number</label>
              <span>98761189563</span>
            </div>
            <div className="profile-field">
              <label>Gender</label>
              <span>Male</span>
            </div>
            <div className="profile-field">
              <label>Date-of-birth</label>
              <span>1st July,2004</span>
            </div>
            <div className="profile-field">
              <label>Address</label>
              <span>HNO-954 Urban Estate Phase-1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;