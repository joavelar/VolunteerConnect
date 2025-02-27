const { getUserByUID, createUser } = require('../models/userModel');

const getUserProfile = (req, res) => {
  const { uid, email, name } = req.user; // Extracted from Firebase token

  getUserByUID(uid, (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (user) {
      res.json({ message: 'User profile fetched successfully!', user });
    } else {
      createUser(uid, name, email, 'volunteer', (err, newUser) => {
        if (err) return res.status(500).json({ message: 'Failed to create user', error: err });
        res.json({ message: 'User profile created successfully!', user: newUser });
      });
    }
  });
};

module.exports = { getUserProfile };