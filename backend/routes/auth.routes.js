const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user (NGO, Student, or Admin) and return token
 * @access  Public
 */
router.post('/login', authController.login);

/**
 * @route   POST /api/auth/signup
 * @desc    Create a new user account and return token
 * @access  Public
 */
router.post('/signup', authController.signup);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client-side token removal)
 * @access  Private
 */
router.post('/logout', authenticate, authController.logout);

/**
 * @route   POST /api/auth/verify
 * @desc    Verify if a token is valid
 * @access  Public
 */
router.post('/verify', authController.verifyToken);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;
