const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Enable foreign key constraints in SQLite (if it's not already enabled)
db.run("PRAGMA foreign_keys = ON;");

// Create posts table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS saved (
      vol_id INT NOT NULL,
      org_id INT NOT NULL,
      post_id INT NOT NULL,
      is_deleted BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (vol_id) REFERENCES volunteers(vol_id) ON DELETE CASCADE,
      FOREIGN KEY (org_id) REFERENCES organizations(org_id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
    )
  `);