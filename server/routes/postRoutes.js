const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Import the authentication middleware
const  { createPost, getPosts, deletePost } = require('../controllers/postController'); // Import the post controller

// POST /api/posts - Create a new post (requires authentication)
router.post('/create', verifyToken, createPost);
router.get('/get', getPosts);
router.delete('/delete/:post_id', verifyToken, deletePost)
module.exports = router;
