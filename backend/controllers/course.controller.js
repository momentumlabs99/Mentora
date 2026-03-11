const ledgerService = require('../services/ledger-gateway.service');
const { success, error } = require('../utils/response.util');

/**
 * Create a new course
 */
async function createCourse(req, res) {
  try {
    const courseData = req.body;

    // Validate required fields
    const requiredFields = [
      'courseId', 'courseCode', 'title', 'description',
      'instructorId', 'instructorName', 'category',
      'duration', 'skillLevel', 'issuerOrg'
    ];

    for (const field of requiredFields) {
      if (!courseData[field]) {
        return error(res, `${field} is required`, 400);
      }
    }

    const course = await ledgerService.createCourse(courseData);
    return success(res, course, 201);
  } catch (err) {
    console.error('Create course error:', err);
    return error(res, 'Failed to create course', 500);
  }
}

/**
 * Get course by ID
 */
async function getCourse(req, res) {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return error(res, 'Course ID is required', 400);
    }

    const course = await ledgerService.queryCourse(courseId);
    
    if (!course) {
      return error(res, 'Course not found', 404);
    }

    return success(res, course);
  } catch (err) {
    console.error('Get course error:', err);
    return error(res, 'Failed to retrieve course', 500);
  }
}

/**
 * Get course by code
 */
async function getCourseByCode(req, res) {
  try {
    const { courseCode } = req.params;

    if (!courseCode) {
      return error(res, 'Course code is required', 400);
    }

    const course = await ledgerService.queryCourseByCode(courseCode);
    
    if (!course) {
      return error(res, 'Course not found', 404);
    }

    return success(res, course);
  } catch (err) {
    console.error('Get course by code error:', err);
    return error(res, 'Failed to retrieve course', 500);
  }
}

/**
 * Get all courses
 */
async function getAllCourses(req, res) {
  try {
    const courses = await ledgerService.queryAllCourses();
    return success(res, courses);
  } catch (err) {
    console.error('Get all courses error:', err);
    return error(res, 'Failed to retrieve courses', 500);
  }
}

/**
 * Get courses by category
 */
async function getCoursesByCategory(req, res) {
  try {
    const { category } = req.params;

    if (!category) {
      return error(res, 'Category is required', 400);
    }

    const courses = await ledgerService.queryCoursesByCategory(category);
    return success(res, courses);
  } catch (err) {
    console.error('Get courses by category error:', err);
    return error(res, 'Failed to retrieve courses', 500);
  }
}

/**
 * Enroll student in a course
 */
async function enrollStudent(req, res) {
  try {
    const enrollmentData = req.body;

    // Validate required fields
    const requiredFields = [
      'enrollmentId', 'courseId', 'studentId',
      'studentName', 'enrollDate'
    ];

    for (const field of requiredFields) {
      if (!enrollmentData[field]) {
        return error(res, `${field} is required`, 400);
      }
    }

    const enrollment = await ledgerService.enrollStudent(enrollmentData);
    return success(res, enrollment, 201);
  } catch (err) {
    console.error('Enroll student error:', err);
    return error(res, 'Failed to enroll student', 500);
  }
}

/**
 * Update student progress in a course
 */
async function updateProgress(req, res) {
  try {
    const { courseId, studentId } = req.params;
    const { progress, modulesCompleted } = req.body;

    if (!courseId || !studentId) {
      return error(res, 'Course ID and Student ID are required', 400);
    }

    if (progress === undefined || !Array.isArray(modulesCompleted)) {
      return error(res, 'Progress and modulesCompleted are required', 400);
    }

    const updated = await ledgerService.updateProgress(
      courseId,
      studentId,
      progress,
      modulesCompleted
    );
    return success(res, updated);
  } catch (err) {
    console.error('Update progress error:', err);
    return error(res, 'Failed to update progress', 500);
  }
}

/**
 * Record course completion
 */
async function recordCompletion(req, res) {
  try {
    const completionData = req.body;

    // Validate required fields
    const requiredFields = [
      'courseId', 'studentId', 'completionDate',
      'finalScore', 'assessorId'
    ];

    for (const field of requiredFields) {
      if (!completionData[field]) {
        return error(res, `${field} is required`, 400);
      }
    }

    const completion = await ledgerService.recordCompletion(completionData);
    return success(res, completion, 201);
  } catch (err) {
    console.error('Record completion error:', err);
    return error(res, 'Failed to record completion', 500);
  }
}

/**
 * Get course enrollments
 */
async function getCourseEnrollments(req, res) {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return error(res, 'Course ID is required', 400);
    }

    const enrollments = await ledgerService.queryCourseEnrollments(courseId);
    return success(res, enrollments);
  } catch (err) {
    console.error('Get course enrollments error:', err);
    return error(res, 'Failed to retrieve enrollments', 500);
  }
}

/**
 * Get course statistics
 */
async function getCourseStatistics(req, res) {
  try {
    const stats = await ledgerService.getCourseStatistics();
    return success(res, stats);
  } catch (err) {
    console.error('Get course statistics error:', err);
    return error(res, 'Failed to retrieve statistics', 500);
  }
}

/**
 * Get course certificates
 */
async function getCourseCertificates(req, res) {
  try {
    const { courseCode } = req.params;

    if (!courseCode) {
      return error(res, 'Course code is required', 400);
    }

    const certificates = await ledgerService.queryCertificatesByCourse(courseCode);
    return success(res, certificates);
  } catch (err) {
    console.error('Get course certificates error:', err);
    return error(res, 'Failed to retrieve certificates', 500);
  }
}

module.exports = {
  createCourse,
  getCourse,
  getCourseByCode,
  getAllCourses,
  getCoursesByCategory,
  enrollStudent,
  updateProgress,
  recordCompletion,
  getCourseEnrollments,
  getCourseStatistics,
  getCourseCertificates
};
