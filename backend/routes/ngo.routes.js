const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/ngo.controller');
const { authenticate, authorize } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/ngos
 * @desc    Get all NGOs
 * @access  Public
 */
router.get('/', ngoController.getAllNGOs);

/**
 * @route   GET /api/ngos/:ngoId
 * @desc    Get NGO by ID
 * @access  Public
 */
router.get('/:ngoId', ngoController.getNGOById);

/**
 * @route   GET /api/ngos/profile/me
 * @desc    Get current NGO user's profile
 * @access  Private (NGO only)
 */
router.get('/profile/me', authenticate, authorize('NGO', 'ADMIN'), ngoController.getNGOProfile);

module.exports = router;
