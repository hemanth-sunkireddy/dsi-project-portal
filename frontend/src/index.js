import React from 'react';
import ReactDOM from 'react-dom/client';
import ScheduleCamp from './components/ScheduleCamp.js';
import AddVolunteer from './components/AddVolunteer.js';
import AddStudent from './components/AddStudent.js';
import AddDoctor from './components/AddDoctor.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <ScheduleCamp />
    <AddVolunteer/>
    <AddStudent/>
    <AddDoctor/>
    </>
  </React.StrictMode>
);
