// import React from 'react';
// import './styles.css';

// const ScheduleCamp = () => {
//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <h1 className="form-heading">Schedule New Camp</h1>
//         <form>
//           <div className="form-group">
//             <label>School Name</label>
//             <div className="input-icon-group">
//               <span className="icon">👥</span>
//               <input type="text" placeholder="Enter school name" />
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>Location</label>
//             <div className="input-icon-group">
//               <span className="icon">📍</span>
//               <input type="text" placeholder="Enter location" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Date and Time</label>
//             <div className="input-icon-group">
//               <span className="icon">📅</span>
//               <input type="datetime-local" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Volunteer</label>
//             <div className="input-icon-group">
//               <span className="icon">🧑‍🤝‍🧑</span>
//               <input type="text" placeholder='Enter Volunteer Name'/>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Doctor</label>
//             <div className="input-icon-group">
//               <span className="icon">👩‍⚕️</span>
//               <input type="text" placeholder='Enter Doctor Name'/>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Contact</label>
//             <div className="input-icon-group">
//               <span className="icon">👤</span>
//               <input type="tel" placeholder="Enter contact number" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Further Details</label>
//             <div className="input-icon-group">
//               <span className="icon">ℹ️</span>
//               <textarea placeholder="Enter further details"></textarea>
//             </div>
//           </div>

//           <button type="submit" className="submit-button">Schedule</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ScheduleCamp;

import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const ScheduleCamp = () => {
  const [camp, setCamp] = useState({
    schoolName: '',
    location: '',
    dateTime: '',
    volunteer: '',
    doctor: '',
    contact: '',
    furtherDetails: '',
  });

  const handleChange = (e) => {
    setCamp({ ...camp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/scheduleCamp', camp);
      alert('Camp scheduled successfully');
    } catch (error) {
      alert('Error scheduling camp');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Schedule New Camp</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>School Name</label>
            <input type="text" name="schoolName" placeholder="Enter school name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" placeholder="Enter location" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input type="datetime-local" name="dateTime" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Volunteer</label>
            <input type="text" name="volunteer" placeholder="Enter Volunteer Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Doctor</label>
            <input type="text" name="doctor" placeholder="Enter Doctor Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input type="tel" name="contact" placeholder="Enter contact number" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Further Details</label>
            <textarea name="furtherDetails" placeholder="Enter further details" onChange={handleChange} />
          </div>
          <button type="submit" className="submit-button">Schedule</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCamp;
