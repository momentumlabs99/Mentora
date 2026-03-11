const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return token
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client-side token removal)
 * @access  Private
 */
router.post('/logout', authController.logout);

/**
 * @route   POST /api/auth/verify
 * @desc    Verify if a token is valid
 * @access  Public
 */
router.post('/verify', authController.verifyToken);

module.exports = router;
