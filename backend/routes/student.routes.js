const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

/**
 * @route   GET /api/students/:studentId/certificates
 * @desc    Get all certificates for a student
 * @access  Private
 */
router.get('/:studentId/certificates', studentController.getStudentCertificates);

/**
 * @route   GET /api/students/:studentId/enrollments
 * @desc    Get all enrollments for a student
 * @access  Private
 */
router.get('/:studentId/enrollments', studentController.getStudentEnrollments);

/**
 * @route   GET /api/students/:studentId/scholarships
 * @desc    Get all scholarships for a student
 * @access  Private
 */
router.get('/:studentId/scholarships', studentController.getStudentScholarships);

/**
 * @route   GET /api/students/:studentId/verify/:certificateId
 * @desc    Verify a certificate for authenticity
 * @access  Private
 */
router.get('/:studentId/verify/:certificateId', studentController.verifyStudentCertificate);

/**
 * @route   GET /api/students/:studentId/profile
 * @desc    Get complete student profile with all blockchain data
 * @access  Private
 */
router.get('/:studentId/profile', studentController.getStudentProfile);

/**
 * @route   GET /api/students/certificates/:certificateId
 * @desc    Get a specific certificate by ID
 * @access  Private
 */
router.get('/certificates/:certificateId', studentController.getCertificate);

module.exports = router;
