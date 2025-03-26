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

  const getCommentsByPost = (post_id) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT
        comments.comment_id,
        comments.post_id,
        comments.comment_text,
        comments.comment_date,
        comments.created_at,
        volunteers.vol_id,
        volunteers.name AS volunteer_name,
        organizations.org_id,
        organizations.name AS org_name
      FROM comments
      LEFT JOIN volunteers ON comments.vol_id = volunteers.vol_id
      LEFT JOIN organizations ON comments.org_id = organizations.org_id
      WHERE comments.post_id = ? AND comments.is_deleted = 0
      ORDER BY comments.created_at DESC;
        `;

      db.all(query, [post_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

 const deleteVolComment = (comment_id, vol_id) => {
   return new Promise((resolve, reject) => {
     const query = `
       UPDATE comments 
       SET is_deleted = 1
       WHERE comment_id = ? AND vol_id = ?
     `;
 
     db.run(query, [comment_id, vol_id], function (err) {
       if (err) {
         reject(err); // Only reject if it's a true database error
       } else if (this.changes === 0) {
         // Resolve gracefully with a status message instead of rejecting
         resolve({ success: false, message: 'Comment not found or unauthorized' });
       } else {
         resolve({ success: true, message: 'Comment deleted successfully' });
       }
     });
   });
 };

 const deleteOrgComment = (comment_id, org_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE comments 
      SET is_deleted = 1
      WHERE comment_id = ? AND org_id = ?
    `;

    db.run(query, [comment_id, org_id], function (err) {
      if (err) {
        reject(err); 
      } else if (this.changes === 0) {
        resolve({ success: false, message: 'Comment not found or unauthorized' });
      } else {
        resolve({ success: true, message: 'Comment deleted successfully' });
      }
    });
  });
};

  module.exports = { createOrgComment, getOrganizationByUID, createVolComment, getVolunteerByUID, getCommentsByPost, deleteVolComment, deleteOrgComment };