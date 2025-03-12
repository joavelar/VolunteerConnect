const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Enable foreign key constraints in SQLite (if it's not already enabled)
db.run("PRAGMA foreign_keys = ON;");

// Create posts table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      post_id INTEGER PRIMARY KEY AUTOINCREMENT,
      org_id INT NOT NULL,
      post_title TEXT,
      post_location TEXT,
      post_date TEXT,
      post_time TEXT,
      post_image_1 TEXT,
      post_image_2 TEXT,
      post_image_3 TEXT,
      post_image_4 TEXT,
      is_deleted BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (org_id) REFERENCES organizations(org_id) ON DELETE CASCADE
    )
  `);
