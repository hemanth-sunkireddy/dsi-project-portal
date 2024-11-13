// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { Link, useNavigate } from 'react-router-dom';

// // // const Login = ({ setRole }) => {
// // //   const [formData, setFormData] = useState({ email: '', password: '' });
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const res = await axios.post('/api/auth/login', formData);
// // //       localStorage.setItem('token', res.data.token);
// // //       setRole(res.data.role);
// // //       navigate('/dashboard');
// // //     } catch (error) {
// // //       alert('Error logging in');
// // //     }
// // //   };

// // //   return (
// // //     <div className="form-container">
// // //       <form className="auth-form" onSubmit={handleSubmit}>
// // //         <h2>Login</h2>
// // //         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
// // //         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
// // //         <button type="submit">Login</button>
// // //         <p>
// // //           Don't have an account? <Link to="/register">Register</Link>
// // //         </p>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Link, useNavigate } from 'react-router-dom';

// // const Login = ({ setRole }) => {
// //   const [formData, setFormData] = useState({ email: '', password: '' });
// //   const navigate = useNavigate();

// //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post('/api/auth/login', formData);
// //       const { role, token } = res.data;

// //       // Save token in local storage for authentication
// //       localStorage.setItem('token', token);

// //       // Set the role in the parent component's state
// //       setRole(role);

// //       // Navigate based on the user's role
// //       if (role === 'NGO Worker') {
// //         navigate('/dashboard-ngo');  // Navigate to NGO dashboard for NGO workers
// //       } else {
// //         navigate('/dashboard');  // Default dashboard navigation for other roles
// //       }
// //     } catch (error) {
// //       alert('Error logging in');
// //     }
// //   };

// //   return (
// //     <div className="form-container">
// //       <form className="auth-form" onSubmit={handleSubmit}>
// //         <h2>Login</h2>
// //         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
// //         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
// //         <button type="submit">Login</button>
// //         <p>
// //           Don't have an account? <Link to="/register">Register</Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = ({ setRole }) => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/login', formData);
//       localStorage.setItem('token', res.data.token);
//       setRole(res.data.role); // Set role for the current user
//       navigate('/dashboard'); // Navigate to the main dashboard route
//     } catch (error) {
//       alert('Error logging in');
//     }
//   };

//   return (
//     <div className="form-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role); // Save role to localStorage
      setRole(res.data.role); // Set role for the current user
      navigate(`/dashboard`); // Navigate to the main dashboard route
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
