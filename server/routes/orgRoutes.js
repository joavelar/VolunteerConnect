const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createOrgProfile } = require('../controllers/orgController');

// Route to create or fetch an organization profile
router.get('/profile', verifyToken, createOrgProfile);

module.exports = router;
