const db = require('../db');

// Check if email exists in volunteers
const checkEmailExistsInVolunteers = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 1 FROM volunteers WHERE email = ? LIMIT 1`;

    db.get(query, [email], (err, row) => {
      if (err) return reject(err);
      resolve(!!row); // returns true if found, false otherwise
    });
  });
};

// Check if email exists in organizations
const checkEmailExistsInOrganizations = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 1 FROM organizations WHERE email = ? LIMIT 1`;

    db.get(query, [email], (err, row) => {
      if (err) return reject(err);
      resolve(!!row); // returns true if found, false otherwise
    });
  });
};

module.exports = {
  checkEmailExistsInVolunteers,
  checkEmailExistsInOrganizations
};

