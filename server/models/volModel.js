const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.run("PRAGMA foreign_keys = ON;");

// Create volunteers table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS volunteers (
    vol_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_uid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER NULL CHECK(age >= 0),
    phone TEXT NULL,
    ec_name TEXT NULL,
    ec_phone TEXT NULL,
    is_deleted BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create a volunteer
const createVolunteer = (firebase_uid, name, email, phone, callback) => {
  db.run(
    `INSERT INTO volunteers (firebase_uid, name, email, phone) VALUES (?, ?, ?, ?)`,
    [firebase_uid, name, email, phone],
    function (err) {
      callback(err, { id: this.lastID, firebase_uid, name, email, phone });
    }
  );
};

// Get a volunteer by Firebase UID
const getVolunteerByUID = (firebase_uid, callback) => {
  db.get(
    `SELECT * FROM volunteers WHERE firebase_uid = ?`,
    [firebase_uid],
    (err, row) => {
      callback(err, row);
    }
  );
};

module.exports = { createVolunteer, getVolunteerByUID };
