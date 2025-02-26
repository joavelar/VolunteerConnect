const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Path to your downloaded key file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export the admin instance for reuse
module.exports = admin;