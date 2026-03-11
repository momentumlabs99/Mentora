const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Private
 */
router.post('/', courseController.createCourse);

/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Private
 */
router.get('/', courseController.getAllCourses);

/**
 * @route   GET /api/courses/statistics
 * @desc    Get course statistics
 * @access  Private
 */
router.get('/statistics', courseController.getCourseStatistics);

/**
 * @route   GET /api/courses/category/:category
 * @desc    Get courses by category
 * @access  Private
 */
router.get('/category/:category', courseController.getCoursesByCategory);

/**
 * @route   GET /api/courses/code/:courseCode
 * @desc    Get course by code
 * @access  Private
 */
router.get('/code/:courseCode', courseController.getCourseByCode);

/**
 * @route   GET /api/courses/:courseId
 * @desc    Get course by ID
 * @access  Private
 */
router.get('/:courseId', courseController.getCourse);

/**
 * @route   GET /api/courses/:courseId/certificates
 * @desc    Get certificates for a course
 * @access  Private
 */
router.get('/:courseId/certificates', courseController.getCourseCertificates);

/**
 * @route   GET /api/courses/:courseId/enrollments
 * @desc    Get enrollments for a course
 * @access  Private
 */
router.get('/:courseId/enrollments', courseController.getCourseEnrollments);

/**
 * @route   POST /api/courses/enroll
 * @desc    Enroll a student in a course
 * @access  Private
 */
router.post('/enroll', courseController.enrollStudent);

/**
 * @route   PUT /api/courses/:courseId/students/:studentId/progress
 * @desc    Update student progress in a course
 * @access  Private
 */
router.put('/:courseId/students/:studentId/progress', courseController.updateProgress);

/**
 * @route   POST /api/courses/complete
 * @desc    Record course completion
 * @access  Private
 */
router.post('/complete', courseController.recordCompletion);

module.exports = router;
