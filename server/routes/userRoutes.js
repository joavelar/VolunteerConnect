const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Import middleware

// Secure endpoint that requires user authentication
router.get('/profile', verifyToken, (req, res) => {
  const { uid, email, name } = req.user; // Extracted from the decoded Firebase token
  res.json({
    message: 'User profile fetched successfully!',
    uid,
    email,
    name,
  });
});

module.exports = router;
