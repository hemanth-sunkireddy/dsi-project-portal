import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CampsInProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_name = localStorage.getItem('name');
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const { camps } = location.state || { camps: [] };

  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  // Filter camps based on the user and search term
  const filterCamps = () => {
    const filtered = camps.filter(
      (camp) =>
        camp.volunteer === user_name &&
        (!searchTerm || camp.campID.includes(searchTerm))
    );
    setFilteredCamps(filtered);
  };

  useEffect(() => {
    if (camps.length > 0) {
      filterCamps();
    }
  }, [camps, searchTerm]);

  const handleRowClick = (campID) => {
    localStorage.setItem('camp-id', campID);
    navigate(`/camp-details`);
  };

  const handleFilterSubmit = () => {
    // Implement date filtering logic based on filters.startDate and filters.endDate
    console.log('Filters applied:', filters);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          background: 'linear-gradient(to bottom, #9F69B8, #4D8BCC)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <i className="fa fa-user-circle" style={{ marginRight: '10px', fontSize: '24px' }}></i>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Volunteer</span>
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <i className="fa fa-home" style={{ marginRight: '10px' }}></i> Home
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        >
          <i className="fa fa-user" style={{ marginRight: '10px' }}></i> Profile
        </div>
        <div
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => navigate('/support')}
        >
          <i className="fa fa-question-circle" style={{ marginRight: '10px' }}></i> Support
        </div>
        <div
          style={{
            marginTop: 'auto',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          <i className="fa fa-sign-out-alt" style={{ marginRight: '10px' }}></i> Log Out
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div>
            <img src="./Choice_Foundation.png" alt="Company Logo" style={{ height: '40px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fa fa-user-circle"
              style={{ fontSize: '30px', marginRight: '10px' }}
            ></i>
            <span style={{ color: 'black' }}>{user_name}</span>
          </div>
        </header>

        <h2 style={{ color: 'black', marginBottom: '20px' }}>Camps In Progress</h2>

        {/* Search and Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: '30%', marginLeft: '50px' }}>
          <input
            type="text"
            placeholder="Search by camp ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              flex: 1,
              marginRight: '10px',
            }}
          />
          {/* <button
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={handleFilterSubmit}
          >
            Filters
          </button> */}
          {/* Dropdown for filters */}
          {/* <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              style={{ marginRight: '10px' }}
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div> */}
        </div>

        {/* Table */}
        <table
          style={{
            width: '80%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
            textAlign: 'center',
            justifySelf: 'center'
          }}
        >
          <thead style={{backgroundColor: '#50ac54'}}>
            <tr style={{ color: 'black', height: 30 }}>
              <th>Camp ID</th>
              <th>School Name</th>
              <th>Location</th>
              <th>Students Registered</th>
              <th>Students Screened</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp, index) => (
              <tr
                key={camp.campID}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f9f9fc' : '#f4f4ff',
                  color: 'black',
                  padding: 25
                }}
              >
                <td>{camp.campID}</td>
                <td>{camp.schoolName}</td>
                <td>{camp.location}</td>
                <td>{camp.studentsRegistered}</td>
                <td>{camp.studentsScreened}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRowClick(camp.campID)}
                  >
                    Go to Camp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ textAlign: 'center' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                backgroundColor: currentPage === index + 1 ? '#007bff' : '#f0f0f0',
                color: currentPage === index + 1 ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampsInProgress;
