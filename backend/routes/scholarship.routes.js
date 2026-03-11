const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarship.controller');
const { authenticate, authorize } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/scholarships/funds
 * @desc    Create a new scholarship fund
 * @access  Private (NGO or ADMIN only)
 */
router.post('/funds', authenticate, authorize('NGO', 'ADMIN'), scholarshipController.createScholarshipFund);

/**
 * @route   GET /api/scholarships/funds
 * @desc    Get all scholarship funds
 * @access  Private
 */
router.get('/funds', authenticate, scholarshipController.getAllFunds);

/**
 * @route   GET /api/scholarships/statistics
 * @desc    Get scholarship statistics
 * @access  Private
 */
router.get('/statistics', authenticate, scholarshipController.getScholarshipStatistics);

/**
 * @route   GET /api/scholarships/funds/donor/:donorId
 * @desc    Get funds by donor
 * @access  Private
 */
router.get('/funds/donor/:donorId', authenticate, scholarshipController.getFundsByDonor);

/**
 * @route   GET /api/scholarships/funds/year/:year
 * @desc    Get funds by allocation year
 * @access  Private
 */
router.get('/funds/year/:year', authenticate, scholarshipController.getFundsByYear);

/**
 * @route   GET /api/scholarships/funds/:fundId
 * @desc    Get scholarship fund by ID
 * @access  Private
 */
router.get('/funds/:fundId', authenticate, scholarshipController.getScholarshipFund);

/**
 * @route   GET /api/scholarships/funds/:fundId/allocations
 * @desc    Get allocations for a fund
 * @access  Private
 */
router.get('/funds/:fundId/allocations', authenticate, scholarshipController.getFundAllocations);

/**
 * @route   POST /api/scholarships/donations
 * @desc    Create a donation to a fund
 * @access  Private (NGO, ADMIN, or STUDENT)
 */
router.post('/donations', authenticate, authorize('NGO', 'ADMIN', 'STUDENT'), scholarshipController.createDonation);

/**
 * @route   GET /api/scholarships/donations/:donationId
 * @desc    Get donation by ID
 * @access  Private
 */
router.get('/donations/:donationId', authenticate, scholarshipController.getDonation);

/**
 * @route   GET /api/scholarships/funds/:fundId/donations
 * @desc    Get donations for a fund
 * @access  Private
 */
router.get('/funds/:fundId/donations', authenticate, scholarshipController.getDonationsByFund);

/**
 * @route   POST /api/scholarships/allocate
 * @desc    Allocate scholarship to a student
 * @access  Private (NGO or ADMIN only)
 */
router.post('/allocate', authenticate, authorize('NGO', 'ADMIN'), scholarshipController.allocateScholarship);

/**
 * @route   POST /api/scholarships/disburse/:allocationId
 * @desc    Disburse scholarship funds
 * @access  Private (NGO, ADMIN, or STUDENT)
 */
router.post('/disburse/:allocationId', authenticate, authorize('NGO', 'ADMIN', 'STUDENT'), scholarshipController.disburseScholarship);

module.exports = router;
