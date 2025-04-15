const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  createSavedPost,
  deleteSavedPost,
  getSavedPost
} = require("../controllers/savedPostController.js");

router.get('/get', verifyToken, getSavedPost);
router.post('/create', verifyToken, createSavedPost);
router.delete('/delete', verifyToken, deleteSavedPost);

module.exports = router;
