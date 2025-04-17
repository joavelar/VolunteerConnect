const db = require('../db');

// Create organizations table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS organizations (
    org_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_uid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NULL,
    poc_email TEXT NULL,
    is_deleted BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create an organization
const createOrganization = (firebase_uid, name, email, phone, callback) => {
  db.run(
    `INSERT INTO organizations (firebase_uid, name, email, phone) VALUES (?, ?, ?, ?)`,
    [firebase_uid, name, email, phone],
    function (err) {
      callback(err, { id: this.lastID, firebase_uid, name, email, phone });
    }
  );
};

// Get an organization by Firebase UID
const getOrganizationByUID = (firebase_uid, callback) => {
  db.get(
    `SELECT * FROM organizations WHERE firebase_uid = ?`,
    [firebase_uid],
    (err, row) => {
      callback(err, row);
    }
  );
};

module.exports = { createOrganization, getOrganizationByUID };
