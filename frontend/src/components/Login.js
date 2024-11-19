// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, signInWithPhoneNumber, initializeRecaptcha } from "../components/firebase";

// const Login = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Initialize Recaptcha on component mount
//   useEffect(() => {
//     try {
//       initializeRecaptcha("recaptcha-container");
//     } catch (error) {
//       console.error("Error initializing Recaptcha:", error);
//     }
//   }, []);

//   const sendOtp = async () => {
//     if (!phone.startsWith("+")) {
//       setMessage("Phone number must include country code (e.g., +91).");
//       return;
//     }

//     try {
//       const recaptchaVerifier = window.recaptchaVerifier || initializeRecaptcha("recaptcha-container");

//       // Send OTP
//       const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
//       window.confirmationResult = confirmationResult; // Save for OTP verification
//       setMessage("OTP sent successfully");
//       setStep(2); // Move to OTP verification step
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setMessage("Failed to send OTP. Please check the phone number and try again.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       if (!window.confirmationResult) {
//         setMessage("No confirmation result found. Please resend OTP.");
//         return;
//       }

//       // Verify OTP
//       const result = await window.confirmationResult.confirm(otp);
//       const userToken = result.user.accessToken;

//       setMessage("Login successful");
//       localStorage.setItem("token", userToken); // Store token

//       // Navigate to the dashboard
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setMessage("Invalid OTP or expired session. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       {step === 1 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter phone number (e.g., +91XXXXXXXXXX)"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <button onClick={sendOtp}>Send OTP</button>
//           <div id="recaptcha-container"></div> {/* Recaptcha container */}
//         </>
//       )}
//       {step === 2 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <button onClick={verifyOtp}>Verify OTP</button>
//         </>
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    if (!phone.startsWith('+')) {
      setMessage('Phone number must include country code (e.g., +91).');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', { phone });
      setMessage('OTP sent successfully.');
      console.log('Received OTP:', response.data.otp); // Log the OTP for debugging (remove in production)
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  // const sendOtp = async () => {
  //   if (!phone.startsWith("+")) {
  //     setMessage("Phone number must include country code (e.g., +91).");
  //     return;
  //   }
  
  //   try {
  //     // Use RecaptchaVerifier
  //     const recaptchaVerifier = window.recaptchaVerifier || initializeRecaptcha("recaptcha-container");
  
  //     // Firebase method to send OTP
  //     const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  //     window.confirmationResult = confirmationResult; // Save confirmationResult for OTP verification
  
  //     setMessage("OTP sent successfully. Please check your SMS.");
  //     setStep(2); // Proceed to OTP verification step
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     setMessage("Failed to send OTP. Please check the phone number and try again.");
  //   }
  // };
  
  // const verifyOtp = async () => {
  //   try {
  //     if (!window.confirmationResult) {
  //       setMessage("No confirmation result found. Please resend OTP.");
  //       return;
  //     }
  
  //     // Verify OTP
  //     const result = await window.confirmationResult.confirm(otp);
  //     const userToken = result.user.accessToken;
  
  //     setMessage("Login successful");
  //     localStorage.setItem("token", userToken); // Store the token
  
  //     navigate("/dashboard"); // Redirect after successful login
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     setMessage("Invalid OTP or expired session. Please try again.");
  //   }
  // };
  

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { phone, otp });
      const { token, role } = response.data;

      setMessage('Login successful!');
      localStorage.setItem('token', token); // Store token for authenticated requests

      // Redirect based on role
      if (role === 'Admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/user-dashboard';
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Invalid OTP or session expired.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter phone number (e.g., +91XXXXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
