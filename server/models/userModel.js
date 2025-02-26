// This file handles database operations for users.
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Create users table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firebase_uid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK(role IN ('volunteer', 'org')) NOT NULL
  )
`);

const createUser = (firebase_uid, name, email, role, callback) => {
  db.run(
    `INSERT INTO users (firebase_uid, name, email, role) VALUES (?, ?, ?, ?)`,
    [firebase_uid, name, email, role],
    function (err) {
      callback(err, { id: this.lastID, firebase_uid, name, email, role });
    }
  );
};

const getUserByUID = (firebase_uid, callback) => {
  db.get(
    `SELECT * FROM users WHERE firebase_uid = ?`,
    [firebase_uid],
    (err, row) => {
      callback(err, row);
    }
  );
};

module.exports = { createUser, getUserByUID };