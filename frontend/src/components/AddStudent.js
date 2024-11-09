import React from 'react';
import './styles.css';

const AddStudent = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Add New Student</h1>
        <form>
          <div className="form-group">
            <label>Student ID</label>
            <div className="input-icon-group">
              <span className="icon">👤</span>
              <input type="text" placeholder="Enter Student ID" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Name</label>
            <div className="input-icon-group">
              <span className="icon">✏️</span>
              <input type="text" placeholder="Enter Name" />
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
            <label>Gender</label>
            <div className="input-icon-group">
              <span className="icon">👤</span>
              <select>
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-icon-group">
              <span className="icon">📞</span>
              <input type="tel" placeholder="Enter Phone Number" />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <div className="input-icon-group">
              <span className="icon">🏠</span>
              <input type="text" placeholder="Enter Address" />
            </div>
          </div>

          <div className="form-group">
            <label>Past History</label>
            <div className="input-icon-group">
              <span className="icon">📂</span>
              <textarea placeholder="Enter Past History"></textarea>
            </div>
          </div>

          <button type="submit" className="submit-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
