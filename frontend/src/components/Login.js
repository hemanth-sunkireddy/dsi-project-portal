// import React, { useEffect } from 'react';

// const Login = () => {
//   useEffect(() => {
//     // Load the Phone.Email script dynamically
//     const script = document.createElement('script');
//     script.src = "https://www.phone.email/sign_in_button_v1.js";
//     script.async = true;

//     // Append script to the body
//     document.body.appendChild(script);

//     // Define the listener function
//     window.phoneEmailListener = function (userObj) {
//       const user_json_url = userObj.user_json_url;
//       alert(`Verification Successful! Fetch user info from: ${user_json_url}`);
//       console.log("User JSON URL:", user_json_url);
//     };

//     // Cleanup the listener when the component unmounts
//     return () => {
//       window.phoneEmailListener = null;
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="form-container">
//       <h2>Login</h2>
//       <p>
//         Don't have an account? <a href="/register">Register Here</a>
//       </p>

//       {/* Render the Phone.Email button */}
//       <div className="pe_signin_button" data-client-id="11866594304370694508"></div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    // Dynamically load the Phone.Email script
    const script = document.createElement('script');
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Define the listener function for verification
    window.phoneEmailListener = function (userObj) {
      const user_json_url = userObj.user_json_url;
      alert(`Verification Successful! Fetch user info from: ${user_json_url}`);
      console.log("User JSON URL:", user_json_url);
    };

    // Cleanup script and listener when component unmounts
    return () => {
      window.phoneEmailListener = null;
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="form-container">
      <h2>Login</h2>
      <p>
        Don't have an account? <a href="/register">Register Here</a>
      </p>

      {/* Render the Phone.Email button */}
      <div className="pe_signin_button" data-client-id="11866594304370694508"></div>
    </div>
  );
};

export default Login;
