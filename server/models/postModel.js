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
      post_content TEXT,
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

// Function to insert a new post
const createPost = (org_id, post_title, post_location, post_content, post_date, post_time, post_image_1) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO posts (org_id, post_title, post_location, post_content, post_date, post_time, post_image_1)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [org_id, post_title, post_location, post_content, post_date, post_time, post_image_1], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Return the ID of the newly created post
      }
    });
  });
};

// Function to fetch all posts
const getPosts = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM posts WHERE is_deleted = 0 ORDER BY created_at DESC';
    
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
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

const deletePost = (post_id, org_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE posts 
      SET is_deleted = 1
      WHERE post_id = ? AND org_id = ?
    `;

    db.run(query, [post_id, org_id], function (err) {
      if (err) {
        reject(err);
      } else if (this.changes === 0) {
        // No rows updated means the post either doesn't exist or org_id didn't match
        reject(new Error('Post not found or unauthorized'));
      } else {
        resolve({ message: 'Post deleted successfully' });
      }
    });
  });
};

module.exports = { createPost, getPosts, getOrganizationByUID, deletePost };