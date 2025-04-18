import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState(""); // Stores phone number
  const [otp, setOtp] = useState(""); // Stores OTP
  const [step, setStep] = useState(1); // Step 1: Enter phone, Step 2: Enter OTP
  const [message, setMessage] = useState(""); // Feedback message
  const navigate = useNavigate();

  const verifyUser = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { phone, otp });
      const { token, role, name } = response.data;
      if(response.status != 200){
        setMessage('Users not found, please login again.');
        return ;
      }
      console.log(name);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
  
      switch (role) {
        case 'Admin':
          navigate('/ngo-dashboard');
          break;
        case 'Doctor':
          navigate('/doctor-dashboard');
          break;
        case 'Therapist':
          navigate('/therapist-dashboard');
          break;
        case 'Volunteer':
          navigate('/volunteer-dashboard');
          break;
        default:
          setMessage('Unknown role. Please contact admin.');
          break;
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage("User Not Found, please signup");
    }
  };

  return (
    <div className="login-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>

      {/* Step 1: Enter Phone Number */}
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
          />
          <br />
          <button onClick={verifyUser} style={{ padding: "8px 20px", cursor: "pointer" }}>
            Login
          </button>
        </>
      )}


      {/* Message Feedback */}
      {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}

      {/* Registration Link */}
      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
          Register Here
        </span>
      </p>
    </div>
  );
};

export default Login;
