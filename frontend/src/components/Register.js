// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Doctor' });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/auth/register', formData);
//       alert('Registered successfully');
//     } catch (error) {
//       alert('Error registering');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <select name="role" onChange={handleChange}>
//         <option value="Doctor">Doctor</option>
//         <option value="NGO Worker">NGO Worker</option>
//         <option value="Volunteer">Volunteer</option>
//         <option value="Therapist">Therapist</option>
//       </select>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;

// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Doctor' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/auth/register', formData);
//       alert('Registered successfully');
//     } catch (error) {
//       alert('Error registering');
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData); // No need to specify http://localhost:5000
      alert('Registered successfully');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      alert('Error registering');
    }
  };
  
  

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="Doctor">Doctor</option>
          <option value="NGO Worker">NGO Worker</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Therapist">Therapist</option>
        </select>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
