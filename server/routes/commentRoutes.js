const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createOrgComment,createVolComment, getCommentsByPost, deleteVolComment, deleteOrgComment } = require('../controllers/commentController');


router.post('/create/org/:post_id', verifyToken, createOrgComment);
router.post('/create/vol/:post_id', verifyToken, createVolComment);
router.delete('/delete/vol/:comment_id', verifyToken, deleteVolComment);
router.delete('/delete/org/:comment_id', verifyToken, deleteOrgComment);
router.get('/get/:post_id', getCommentsByPost);

module.exports = router;