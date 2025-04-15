const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Enable foreign key constraints in SQLite (if it's not already enabled)
db.run("PRAGMA foreign_keys = ON;");

// Create posts table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS saved (
    saved_id INTEGER PRIMARY KEY AUTOINCREMENT,
    vol_id INT NOT NULL,
    post_id INT NOT NULL,
    is_deleted BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vol_id) REFERENCES volunteers(vol_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
  )
`);

const createSavedPost = (vol_id, post_id) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM saved WHERE vol_id = ? AND post_id = ? AND is_deleted = 0`;
    db.get(checkQuery, [vol_id, post_id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        resolve({ success: false, message: "Post already saved" });
      } else {
        const insertQuery = `
          INSERT INTO saved (vol_id, post_id) VALUES (?, ?)
        `;
        db.run(insertQuery, [vol_id, post_id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              success: true,
              saved_id: this.lastID,
              message: "Post saved successfully",
            });
          }
        });
      }
    });
  });
};

const deleteSavedPost = (vol_id, post_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE saved
      SET is_deleted = 1
      WHERE vol_id = ? AND post_id = ?
    `;

    db.run(query, [vol_id, post_id], function (err) {
      if (err) {
        reject(err);
      } else if (this.changes === 0) {
        resolve({
          success: false,
          message: "Saved post not found or unauthorized ",
        });
      } else {
        resolve({ success: true, message: "Saved post deleted successfully" });
      }
    });
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

const getSavedPostsByVolunteer = (vol_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        saved.saved_id,
        saved.post_id,
        saved.created_at AS saved_at,
        posts.post_title,
        posts.post_content,
        posts.post_location,
        posts.post_date,
        posts.post_time,
        posts.post_image_1,
        posts.post_image_2,
        posts.post_image_3,
        posts.post_image_4,
        organizations.org_id,
        organizations.name AS org_name
      FROM saved
      JOIN posts ON saved.post_id = posts.post_id
      JOIN organizations ON posts.org_id = organizations.org_id
      WHERE saved.vol_id = ? AND saved.is_deleted = 0
      ORDER BY saved.created_at DESC
    `;

    db.all(query, [vol_id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { createSavedPost, deleteSavedPost, getVolunteerByUID, getSavedPostsByVolunteer };
