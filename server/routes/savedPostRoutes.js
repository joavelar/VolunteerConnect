const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  createSavedPost
} = require("../controllers/savedPostController.js");

// router.get('/get', verifyToken, getSavedPost);
router.post("/create", verifyToken, createSavedPost);
// router.delete('/delete/:savedpost_id', verifyToken, deleteSavedPost);

module.exports = router;
