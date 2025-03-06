const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createVolunteerProfile } = require('../controllers/volController');

// Route to create or fetch a volunteer profile
router.get('/profile', verifyToken, createVolunteerProfile);

module.exports = router;
