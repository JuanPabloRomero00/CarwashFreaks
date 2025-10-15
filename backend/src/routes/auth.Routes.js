const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login
router.post('/login', authController.login);

// Refresh token
router.post('/refresh', authController.refresh);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
