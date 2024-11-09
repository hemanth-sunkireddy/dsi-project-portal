import React from 'react';
import './styles.css';

const AddDoctor = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-heading">Add New Doctor</h1>
        <form>
        <div className="form-group">
            <label>Doctor ID</label>
            <div className="input-icon-group">
              <span className="icon">👨‍⚕️</span>
              <input type="text" placeholder="Enter Doctor ID" />
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
            <label>Qualifications</label>
            <div className="input-icon-group">
              <span className="icon">🎓</span>
              <input type="text" placeholder="Enter Qualifications" />
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
            <label>Past Experiences</label>
            <div className="input-icon-group">
              <span className="icon">🔖</span>
              <textarea placeholder="Enter Past Experiences"></textarea>
            </div>
          </div>
          <button type="submit" className="submit-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
