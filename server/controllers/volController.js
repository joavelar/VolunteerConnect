const { createVolunteer, getVolunteerByUID } = require('../models/volModel');

const createVolunteerProfile = (req, res) => {
  const { uid, name, email, phone } = req.user; // Extracted from Firebase token

  getVolunteerByUID(uid, (err, volunteer) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (volunteer) {
      res.json({ message: 'Volunteer profile fetched successfully!', volunteer });
    } else {
      createVolunteer(uid, name, email, phone, (err, newVolunteer) => {
        if (err) return res.status(500).json({ message: 'Failed to create volunteer', error: err });
        res.json({ message: 'Volunteer profile created successfully!', volunteer: newVolunteer });
      });
    }
  });
};

module.exports = { createVolunteerProfile };
