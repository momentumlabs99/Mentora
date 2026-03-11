const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authenticate, authorize } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/students/:studentId/certificates
 * @desc    Get all certificates for a student
 * @access  Private
 */
router.get('/:studentId/certificates', authenticate, studentController.getStudentCertificates);

/**
 * @route   GET /api/students/:studentId/enrollments
 * @desc    Get all enrollments for a student
 * @access  Private
 */
router.get('/:studentId/enrollments', authenticate, studentController.getStudentEnrollments);

/**
 * @route   GET /api/students/:studentId/scholarships
 * @desc    Get all scholarships for a student
 * @access  Private
 */
router.get('/:studentId/scholarships', authenticate, studentController.getStudentScholarships);

/**
 * @route   GET /api/students/:studentId/verify/:certificateId
 * @desc    Verify a certificate for authenticity
 * @access  Private
 */
router.get('/:studentId/verify/:certificateId', authenticate, studentController.verifyStudentCertificate);

/**
 * @route   GET /api/students/:studentId/profile
 * @desc    Get complete student profile with all blockchain data
 * @access  Private
 */
router.get('/:studentId/profile', authenticate, studentController.getStudentProfile);

/**
 * @route   GET /api/students/certificates/:certificateId
 * @desc    Get a specific certificate by ID
 * @access  Private
 */
router.get('/certificates/:certificateId', authenticate, studentController.getCertificate);

module.exports = router;
