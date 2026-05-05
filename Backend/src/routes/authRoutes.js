const express = require('express');
const router = express.Router();
const { googleAuth, googleCallback, getMe, register } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Google OAuth flow
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Manual Registration
router.post('/register', register);

// Protected: get current user
router.get('/me', protect, getMe);

module.exports = router;
