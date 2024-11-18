import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/api/auth/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const approveDoctor = async (id) => {
    try {
      await axios.put(`/api/auth/approveDoctor/${id}`);
      alert('Doctor approved successfully');
    } catch (error) {
      alert('Error approving doctor');
    }
  };

  const assignAdmin = async (id) => {
    try {
      await axios.put(`/api/auth/assignAdmin/${id}`);
      alert('User promoted to admin successfully');
    } catch (error) {
      alert('Error assigning admin role');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                {user.role === 'Doctor' && !user.isApproved && (
                  <button onClick={() => approveDoctor(user._id)}>Approve</button>
                )}
                {user.role !== 'Admin' && (
                  <button onClick={() => assignAdmin(user._id)}>Promote to Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
