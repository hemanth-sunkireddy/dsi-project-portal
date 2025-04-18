import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', gender: '', address: '', role: 'Doctor' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      alert('Registration request submitted successfully. please login.');
      navigate('/login');
    } catch (error) {
      alert('Error registering');
    }
  };

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Phone Number" onChange={handleChange} required />
        <input name="gender" type="text" placeholder="Gender" onChange={handleChange} required />
        <input name="address" type="text" placeholder="Address" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="Doctor">Doctor</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
