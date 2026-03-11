const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarship.controller');

/**
 * @route   POST /api/scholarships/funds
 * @desc    Create a new scholarship fund
 * @access  Private
 */
router.post('/funds', scholarshipController.createScholarshipFund);

/**
 * @route   GET /api/scholarships/funds
 * @desc    Get all scholarship funds
 * @access  Private
 */
router.get('/funds', scholarshipController.getAllFunds);

/**
 * @route   GET /api/scholarships/statistics
 * @desc    Get scholarship statistics
 * @access  Private
 */
router.get('/statistics', scholarshipController.getScholarshipStatistics);

/**
 * @route   GET /api/scholarships/funds/donor/:donorId
 * @desc    Get funds by donor
 * @access  Private
 */
router.get('/funds/donor/:donorId', scholarshipController.getFundsByDonor);

/**
 * @route   GET /api/scholarships/funds/year/:year
 * @desc    Get funds by allocation year
 * @access  Private
 */
router.get('/funds/year/:year', scholarshipController.getFundsByYear);

/**
 * @route   GET /api/scholarships/funds/:fundId
 * @desc    Get scholarship fund by ID
 * @access  Private
 */
router.get('/funds/:fundId', scholarshipController.getScholarshipFund);

/**
 * @route   GET /api/scholarships/funds/:fundId/allocations
 * @desc    Get allocations for a fund
 * @access  Private
 */
router.get('/funds/:fundId/allocations', scholarshipController.getFundAllocations);

/**
 * @route   POST /api/scholarships/donations
 * @desc    Create a donation to a fund
 * @access  Private
 */
router.post('/donations', scholarshipController.createDonation);

/**
 * @route   GET /api/scholarships/donations/:donationId
 * @desc    Get donation by ID
 * @access  Private
 */
router.get('/donations/:donationId', scholarshipController.getDonation);

/**
 * @route   GET /api/scholarships/funds/:fundId/donations
 * @desc    Get donations for a fund
 * @access  Private
 */
router.get('/funds/:fundId/donations', scholarshipController.getDonationsByFund);

/**
 * @route   POST /api/scholarships/allocate
 * @desc    Allocate scholarship to a student
 * @access  Private
 */
router.post('/allocate', scholarshipController.allocateScholarship);

/**
 * @route   POST /api/scholarships/disburse/:allocationId
 * @desc    Disburse scholarship funds
 * @access  Private
 */
router.post('/disburse/:allocationId', scholarshipController.disburseScholarship);

module.exports = router;
