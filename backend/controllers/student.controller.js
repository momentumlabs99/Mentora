const ledgerService = require('../services/ledger-gateway.service');
const { success, error } = require('../utils/response.util');

/**
 * Get all certificates for a student
 */
async function getStudentCertificates(req, res) {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return error(res, 'Student ID is required', 400);
    }

    const certificates = await ledgerService.queryCertificatesByStudent(studentId);
    return success(res, certificates);
  } catch (err) {
    console.error('Get student certificates error:', err);
    return error(res, 'Failed to retrieve certificates', 500);
  }
}

/**
 * Get student enrollments
 */
async function getStudentEnrollments(req, res) {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return error(res, 'Student ID is required', 400);
    }

    const enrollments = await ledgerService.queryStudentEnrollments(studentId);
    return success(res, enrollments);
  } catch (err) {
    console.error('Get student enrollments error:', err);
    return error(res, 'Failed to retrieve enrollments', 500);
  }
}

/**
 * Get student scholarships
 */
async function getStudentScholarships(req, res) {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return error(res, 'Student ID is required', 400);
    }

    const scholarships = await ledgerService.queryStudentScholarships(studentId);
    return success(res, scholarships);
  } catch (err) {
    console.error('Get student scholarships error:', err);
    return error(res, 'Failed to retrieve scholarships', 500);
  }
}

/**
 * Verify certificate authenticity
 */
async function verifyStudentCertificate(req, res) {
  try {
    const { certificateId } = req.params;

    if (!certificateId) {
      return error(res, 'Certificate ID is required', 400);
    }

    const verification = await ledgerService.verifyCertificate(certificateId);
    return success(res, verification);
  } catch (err) {
    console.error('Verify certificate error:', err);
    return error(res, 'Failed to verify certificate', 500);
  }
}

/**
 * Get student profile (simulated - combines blockchain data)
 */
async function getStudentProfile(req, res) {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return error(res, 'Student ID is required', 400);
    }

    // Fetch all student-related data from blockchain
    const [certificates, enrollments, scholarships] = await Promise.all([
      ledgerService.queryCertificatesByStudent(studentId),
      ledgerService.queryStudentEnrollments(studentId),
      ledgerService.queryStudentScholarships(studentId)
    ]);

    const profile = {
      studentId,
      certificates: certificates || [],
      enrollments: enrollments || [],
      scholarships: scholarships || [],
      statistics: {
        totalCertificates: certificates ? certificates.length : 0,
        totalEnrollments: enrollments ? enrollments.length : 0,
        totalScholarships: scholarships ? scholarships.length : 0
      }
    };

    return success(res, profile);
  } catch (err) {
    console.error('Get student profile error:', err);
    return error(res, 'Failed to retrieve student profile', 500);
  }
}

/**
 * Query a specific certificate
 */
async function getCertificate(req, res) {
  try {
    const { certificateId } = req.params;

    if (!certificateId) {
      return error(res, 'Certificate ID is required', 400);
    }

    const certificate = await ledgerService.queryCertificate(certificateId);
    
    if (!certificate) {
      return error(res, 'Certificate not found', 404);
    }

    return success(res, certificate);
  } catch (err) {
    console.error('Get certificate error:', err);
    return error(res, 'Failed to retrieve certificate', 500);
  }
}

module.exports = {
  getStudentCertificates,
  getStudentEnrollments,
  getStudentScholarships,
  verifyStudentCertificate,
  getStudentProfile,
  getCertificate
};
