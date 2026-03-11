const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticate, authorize } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Private (ADMIN only)
 */
router.post('/', authenticate, authorize('ADMIN'), courseController.createCourse);

/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Private
 */
router.get('/', authenticate, courseController.getAllCourses);

/**
 * @route   GET /api/courses/statistics
 * @desc    Get course statistics
 * @access  Private
 */
router.get('/statistics', authenticate, courseController.getCourseStatistics);

/**
 * @route   GET /api/courses/category/:category
 * @desc    Get courses by category
 * @access  Private
 */
router.get('/category/:category', authenticate, courseController.getCoursesByCategory);

/**
 * @route   GET /api/courses/code/:courseCode
 * @desc    Get course by code
 * @access  Private
 */
router.get('/code/:courseCode', authenticate, courseController.getCourseByCode);

/**
 * @route   GET /api/courses/:courseId
 * @desc    Get course by ID
 * @access  Private
 */
router.get('/:courseId', authenticate, courseController.getCourse);

/**
 * @route   GET /api/courses/:courseId/certificates
 * @desc    Get certificates for a course
 * @access  Private
 */
router.get('/:courseId/certificates', authenticate, courseController.getCourseCertificates);

/**
 * @route   GET /api/courses/:courseId/enrollments
 * @desc    Get enrollments for a course
 * @access  Private
 */
router.get('/:courseId/enrollments', authenticate, courseController.getCourseEnrollments);

/**
 * @route   POST /api/courses/enroll
 * @desc    Enroll a student in a course
 * @access  Private (STUDENT, ADMIN, or NGO)
 */
router.post('/enroll', authenticate, authorize('STUDENT', 'ADMIN', 'NGO'), courseController.enrollStudent);

/**
 * @route   PUT /api/courses/:courseId/students/:studentId/progress
 * @desc    Update student progress in a course
 * @access  Private (STUDENT, ADMIN, or NGO)
 */
router.put('/:courseId/students/:studentId/progress', authenticate, authorize('STUDENT', 'ADMIN', 'NGO'), courseController.updateProgress);

/**
 * @route   POST /api/courses/complete
 * @desc    Record course completion
 * @access  Private (ADMIN or NGO)
 */
router.post('/complete', authenticate, authorize('ADMIN', 'NGO'), courseController.recordCompletion);

module.exports = router;
