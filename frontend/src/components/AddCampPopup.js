// // import React from 'react';
// // import './AddCampPopup.css';

// // const AddCampPopup = ({ date, onClose, onAdd }) => {
// //   return (
// //     <div className="popup-overlay">
// //       <div className="popup-box">
// //         <h3>Camps on {date.toDateString()}</h3>
// //         <p>No camps scheduled. Click "Add" to schedule a new camp.</p>
// //         <div className="popup-buttons">
// //           <button className="add-button" onClick={onAdd}>Add Camp</button>
// //           <button className="close-button" onClick={onClose}>Close</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddCampPopup;

// // src/components/AddCampPopup.js

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AddCampPopup.css';

// const AddCampPopup = ({ date, onClose, onAddCamp }) => {
//   const navigate = useNavigate();

//   const handleAddCamp = () => {
//     onAddCamp(date);
//     navigate('/schedule-camp');
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-box">
//         <h2>Camps on {date.toDateString()}</h2>
//         <p>No events scheduled for this day.</p>
//         <div className="popup-buttons">
//           <button className="add-button" onClick={handleAddCamp}>Add Camp</button>
//           <button className="close-button" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCampPopup;

// src/components/AddCampPopup.js

import React from 'react';
import './AddCampPopup.css';

const AddCampPopup = ({ date, camps, onClose, onAddCamp }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Camps on {date.toDateString()}</h2>
        {camps.length > 0 ? (
          <ul>
            {camps.map((camp, index) => (
              <li key={index}>
                <strong>School:</strong> {camp.schoolName} <br />
                <strong>Location:</strong> {camp.location} <br />
                <strong>Volunteer:</strong> {camp.volunteer} <br />
                <strong>Doctor:</strong> {camp.doctor}
              </li>
            ))}
          </ul>
        ) : (
          <p>No camps scheduled for this day.</p>
        )}
        <div className="popup-buttons">
          <button className="add-button" onClick={onAddCamp}>Add Camp</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddCampPopup;
