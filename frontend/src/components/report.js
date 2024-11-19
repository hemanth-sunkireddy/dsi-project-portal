import React from "react";
import "./report.css";
import logo from './Choice_logo.png'
import pic from './pic.png'

function PreScreeningReport() {
  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="Choice Foundation Logo" />
        <h1>Choice Foundation</h1>
        <h2>Pre Screening Report</h2>
      </div>
      <div className="download">Download Report</div>
      <div className="main-content">
        <div className="profile">
          <img src={pic} alt="Profile Picture" />
          <div className="profile-info">
            <h2>Alice</h2>
            <p>Student ID: ABC123</p>
            <p>Gender: Female</p>
          </div>
        </div>
        <div className="autism-score">
          <h3>Chance of Autism</h3>
          <p className="percentage">85%</p>
          <p className="score">85/100</p>
        </div>
      </div>
      <div className="details">
        <div className="details-section">
          <div className="info">
            <p><strong>School/Camp:</strong> IIIT Hyderabad</p>
            <p><strong>Full name:</strong> Alice Pleasance Liddell</p>
            <p><strong>Volunteer name:</strong> Bob</p>
            <p><strong>Contact Details:</strong> +91 90909 90909</p>
            <p><strong>Screening Date:</strong> 25 Oct 2024</p>
            <p><strong>Result Date:</strong> 26 Oct 2024</p>
          </div>
          <div className="observations">
            <h3>Core Observations</h3>
            <p>Verbal Communication Confidence: High</p>
            <p>Non Verbal Communication Confidence: Low</p>
            <p>Sensory Processing: Moderate</p>
            <p>Repetitive Behaviour: Very High</p>
            <p>Motor Skills: High</p>
            <p>Preservative Thinking: Low</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreScreeningReport;
