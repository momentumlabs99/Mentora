const ledgerService = require('../services/ledger-gateway.service');
const { success, error } = require('../utils/response.util');

/**
 * Verify certificate - Public endpoint for certificate verification
 * No authentication required - can be accessed via public link
 */
async function verifyCertificate(req, res) {
  try {
    const { certId } = req.params;

    if (!certId) {
      return error(res, 'Certificate ID is required', 400);
    }

    // Query certificate from blockchain ledger
    const certificate = await ledgerService.queryCertificate(certId);

    if (!certificate) {
      return error(res, 'Certificate not found', 404);
    }

    // Verify certificate status
    const verificationResult = {
      valid: certificate.status === 'Active',
      certificate: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        courseName: certificate.courseName,
        courseCode: certificate.courseCode,
        instructorName: certificate.instructorName,
        issueDate: certificate.issueDate,
        expirationDate: certificate.expirationDate,
        certificateType: certificate.certificateType,
        issuerOrg: certificate.issuerOrg,
        status: certificate.status
      },
      verifiedAt: new Date().toISOString()
    };

    // Check if expired
    if (certificate.expirationDate) {
      const expirationDate = new Date(certificate.expirationDate);
      const now = new Date();
      if (expirationDate < now) {
        verificationResult.valid = false;
        verificationResult.reason = 'Certificate has expired';
      }
    }

    // Check if revoked
    if (certificate.status === 'Revoked') {
      verificationResult.valid = false;
      verificationResult.reason = 'Certificate has been revoked';
    }

    return success(res, verificationResult);
  } catch (err) {
    console.error('Certificate verification error:', err);
    return error(res, 'Failed to verify certificate', 500);
  }
}

module.exports = {
  verifyCertificate
};
