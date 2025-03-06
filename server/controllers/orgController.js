const { createOrganization, getOrganizationByUID } = require('../models/orgModel');

const createOrgProfile = (req, res) => {
  const { uid, name, email, phone } = req.user; // Extracted from Firebase token

  getOrganizationByUID(uid, (err, organization) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (organization) {
      res.json({ message: 'Organization profile fetched successfully!', organization });
    } else {
      createOrganization(uid, name, email, phone, (err, newOrganization) => {
        if (err) return res.status(500).json({ message: 'Failed to create organization', error: err });
        res.json({ message: 'Organization profile created successfully!', organization: newOrganization });
      });
    }
  });
};

module.exports = { createOrgProfile };
