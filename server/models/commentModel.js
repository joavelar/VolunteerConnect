const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Enable foreign key constraints in SQLite (if it's not already enabled)
db.run("PRAGMA foreign_keys = ON;");

// Create posts table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INT NOT NULL,
      vol_id INT,
      org_id INT,
      comment_text TEXT,
      comment_date TEXT,
      is_deleted BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
      FOREIGN KEY (vol_id) REFERENCES volunteers(vol_id) ON DELETE CASCADE,
      FOREIGN KEY (org_id) REFERENCES organizations(org_id) ON DELETE CASCADE
    )
  `);

  // Function to insert a new comment
  const createOrgComment = (post_id, org_id, comment_text, comment_date) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO comments (post_id, org_id, comment_text, comment_date)
        VALUES (?, ?, ?, ?)
      `;
  
      db.run(query, [post_id, org_id, comment_text, comment_date], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // Return the ID of the newly created post
        }
      });
    });
  };

  const createVolComment = (post_id, vol_id, comment_text, comment_date) => {
    return new Promise((resolve, reject) => {
      const query =`
      INSERT INTO comments (post_id, vol_id, comment_text, comment_date) 
      VALUES (?, ?, ?, ?)
      `;

      db.run(query, [post_id, vol_id, comment_text, comment_date], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  };

  const getOrganizationByUID = (firebase_uid) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM organizations WHERE firebase_uid = ?`,
        [firebase_uid],
        (err, row) => {
          if (err) {
            reject(err); // Reject the promise if there's an error
          } else {
            resolve(row); // Resolve the promise with the row data
          }
        }
      );
    });
  };

  const getVolunteerByUID = (firebase_uid) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM volunteers WHERE firebase_uid = ?`,
        [firebase_uid],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row); 
          }
        }
      );
    });
  };

  module.exports = { createOrgComment, getOrganizationByUID, createVolComment, getVolunteerByUID };