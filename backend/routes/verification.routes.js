const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verification.controller');

/**
 * @route   GET /api/verify/:certId
 * @desc    Verify certificate by ID - Public endpoint (no authentication required)
 * @access  Public
 */
router.get('/:certId', verificationController.verifyCertificate);

module.exports = router;
