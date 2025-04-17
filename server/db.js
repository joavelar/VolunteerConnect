const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Turn on foreign key constraints
db.run("PRAGMA foreign_keys = ON;");

module.exports = db;
