const admin = require('firebase-admin');
const serviceAccount = require('./firebase_key.json'); // Path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://smsotp-6f1fa.firebaseio.com", // Replace <YOUR_PROJECT_ID> with your Firebase project ID
});

module.exports = admin;
