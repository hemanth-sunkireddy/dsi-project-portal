import React from 'react';
import './styles.css';

const ScheduleCamp = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Schedule New Camp</h1>
        <form>
          <div className="form-group">
            <label>School Name</label>
            <div className="input-icon-group">
              <span className="icon">👥</span>
              <input type="text" placeholder="Enter school name" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <div className="input-icon-group">
              <span className="icon">📍</span>
              <input type="text" placeholder="Enter location" />
            </div>
          </div>

          <div className="form-group">
            <label>Date and Time</label>
            <div className="input-icon-group">
              <span className="icon">📅</span>
              <input type="datetime-local" />
            </div>
          </div>

          <div className="form-group">
            <label>Volunteer</label>
            <div className="input-icon-group">
              <span className="icon">🧑‍🤝‍🧑</span>
              <input type="text" placeholder='Enter Volunteer Name'/>
            </div>
          </div>

          <div className="form-group">
            <label>Doctor</label>
            <div className="input-icon-group">
              <span className="icon">👩‍⚕️</span>
              <input type="text" placeholder='Enter Doctor Name'/>
            </div>
          </div>

          <div className="form-group">
            <label>Contact</label>
            <div className="input-icon-group">
              <span className="icon">👤</span>
              <input type="tel" placeholder="Enter contact number" />
            </div>
          </div>

          <div className="form-group">
            <label>Further Details</label>
            <div className="input-icon-group">
              <span className="icon">ℹ️</span>
              <textarea placeholder="Enter further details"></textarea>
            </div>
          </div>

          <button type="submit" className="submit-button">Schedule</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCamp;
