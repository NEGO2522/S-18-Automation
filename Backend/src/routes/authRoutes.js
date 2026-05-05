const express = require('express');
const router = express.Router();
const { googleAuth, googleCallback, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Google OAuth flow
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Protected: get current user
router.get('/me', protect, getMe);

module.exports = router;
