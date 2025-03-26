const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createOrgComment,createVolComment, getCommentsByPost } = require('../controllers/commentController');


router.post('/create/org/:post_id', verifyToken, createOrgComment);
router.post('/create/vol/:post_id', verifyToken, createVolComment);
router.get('/get/:post_id', getCommentsByPost);

module.exports = router;