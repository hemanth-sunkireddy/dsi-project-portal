import React from 'react';
import ReactDOM from 'react-dom/client';
import AddDoctor from './components/AddDoctor.js';
import AddVolunteer from './components/AddVolunteer.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <AddDoctor />
    <AddVolunteer/>
    </>
  </React.StrictMode>
);
