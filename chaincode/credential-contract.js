'use strict';

const { Contract } = require('fabric-contract-api');

/**
 * CredentialContract - Manages digital certificates and credentials on the blockchain
 * Provides functionality to issue, verify, and revoke tamper-proof educational credentials
 */
class CredentialContract extends Contract {

  constructor() {
    super('org.mentora.credential');
  }

  /**
   * InitLedger - Initialize the ledger with default data
   */
  async InitLedger(ctx) {
    console.info('=========== INITIALIZE CREDENTIAL LEDGER ===========');
    const certificates = [];
    console.info('Credential ledger initialized with empty state');
    return JSON.stringify(certificates);
  }

  /**
   * IssueCertificate - Issue a new digital certificate to a student
   * @param {Context} ctx - Transaction context
   * @param {string} certificateId - Unique certificate identifier
   * @param {string} studentId - Student's unique ID
   * @param {string} studentName - Student's full name
   * @param {string} courseCode - Course code/title
   * @param {string} courseName - Full course name
   * @param {string} instructorName - Instructor/educator name
   * @param {string} issueDate - Date of issuance (ISO format)
   * @param {string} expirationDate - Certificate expiration date (ISO format)
   * @param {string} certificateType - Type of credential (certificate, diploma, badge)
   * @param {string} issuerOrg - Issuing organization
   * @returns {string} Certificate data
   */
  async IssueCertificate(
    ctx,
    certificateId,
    studentId,
    studentName,
    courseCode,
    courseName,
    instructorName,
    issueDate,
    expirationDate,
    certificateType,
    issuerOrg
  ) {
    const exists = await this.CertificateExists(ctx, certificateId);
    if (exists) {
      throw new Error(`The certificate ${certificateId} already exists`);
    }

    // Create certificate object
    const certificate = {
      certificateId,
      studentId,
      studentName,
      courseCode,
      courseName,
      instructorName,
      issueDate,
      expirationDate,
      certificateType,
      issuerOrg,
      status: 'active', // active, revoked, expired
      blockchainHash: ctx.stub.getTxID(), // Use transaction ID as hash reference
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      revocationReason: null,
      revokedBy: null
    };

    const certificateBuffer = Buffer.from(JSON.stringify(certificate));
    await ctx.stub.putState(certificateId, certificateBuffer);

    // Create index by student ID
    await ctx.stub.putState(
      `CERT_STUDENT_${studentId}_${certificateId}`,
      certificateBuffer
    );

    console.info(`Certificate ${certificateId} issued to student ${studentId}`);
    return JSON.stringify(certificate);
  }

  /**
   * VerifyCertificate - Verify the authenticity of a certificate
   * @param {Context} ctx - Transaction context
   * @param {string} certificateId - Certificate ID to verify
   * @returns {string} Verification result with certificate details
   */
  async VerifyCertificate(ctx, certificateId) {
    const certificateJSON = await ctx.stub.getState(certificateId);
    
    if (!certificateJSON || certificateJSON.length === 0) {
      throw new Error(`Certificate ${certificateId} not found`);
    }

    const certificate = JSON.parse(certificateJSON.toString());

    // Check if certificate is expired
    const currentDate = new Date();
    const expiryDate = new Date(certificate.expirationDate);
    
    if (currentDate > expiryDate) {
      certificate.status = 'expired';
    }

    // Prepare verification response
    const verificationResult = {
      isValid: certificate.status === 'active',
      certificateId: certificate.certificateId,
      studentId: certificate.studentId,
      studentName: certificate.studentName,
      courseCode: certificate.courseCode,
      courseName: certificate.courseName,
      instructorName: certificate.instructorName,
      issueDate: certificate.issueDate,
      expirationDate: certificate.expirationDate,
      certificateType: certificate.certificateType,
      issuerOrg: certificate.issuerOrg,
      status: certificate.status,
      blockchainHash: certificate.blockchainHash,
      verificationDate: new Date().toISOString(),
      chaincodeTimestamp: ctx.stub.getTxTimestamp().toString()
    };

    return JSON.stringify(verificationResult);
  }

  /**
   * RevokeCertificate - Revoke a certificate (by authorized issuer)
   * @param {Context} ctx - Transaction context
   * @param {string} certificateId - Certificate ID to revoke
   * @param {string} reason - Reason for revocation
   * @param {string} revokedBy - Name/ID of authorizing entity
   * @returns {string} Revoked certificate data
   */
  async RevokeCertificate(ctx, certificateId, reason, revokedBy) {
    const certificateJSON = await ctx.stub.getState(certificateId);
    
    if (!certificateJSON || certificateJSON.length === 0) {
      throw new Error(`Certificate ${certificateId} not found`);
    }

    const certificate = JSON.parse(certificateJSON.toString());

    if (certificate.status === 'revoked') {
      throw new Error(`Certificate ${certificateId} is already revoked`);
    }

    // Update certificate status
    certificate.status = 'revoked';
    certificate.revocationReason = reason;
    certificate.revokedBy = revokedBy;
    certificate.revokedAt = new Date().toISOString();
    certificate.updatedAt = new Date().toISOString();

    const certificateBuffer = Buffer.from(JSON.stringify(certificate));
    await ctx.stub.putState(certificateId, certificateBuffer);

    // Update student index
    await ctx.stub.putState(
      `CERT_STUDENT_${certificate.studentId}_${certificateId}`,
      certificateBuffer
    );

    console.info(`Certificate ${certificateId} revoked by ${revokedBy}`);
    return JSON.stringify(certificate);
  }

  /**
   * QueryCertificate - Query a single certificate by ID
   * @param {Context} ctx - Transaction context
   * @param {string} certificateId - Certificate ID
   * @returns {string} Certificate data
   */
  async QueryCertificate(ctx, certificateId) {
    const certificateJSON = await ctx.stub.getState(certificateId);
    
    if (!certificateJSON || certificateJSON.length === 0) {
      throw new Error(`Certificate ${certificateId} not found`);
    }

    return certificateJSON.toString();
  }

  /**
   * QueryCertificatesByStudent - Get all certificates for a specific student
   * @param {Context} ctx - Transaction context
   * @param {string} studentId - Student ID
   * @returns {string} Array of certificates for the student
   */
  async QueryCertificatesByStudent(ctx, studentId) {
    // Query all states with the student prefix
    const iterator = await ctx.stub.getStateByRange(
      `CERT_STUDENT_${studentId}_`,
      `CERT_STUDENT_${studentId}_\uffff`
    );

    const allResults = [];
    
    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        try {
          const certificate = JSON.parse(result.value.value.toString());
          allResults.push(certificate);
        } catch (err) {
          console.log(`Error parsing certificate: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(allResults);
  }

  /**
   * QueryCertificatesByCourse - Get all certificates issued for a specific course
   * @param {Context} ctx - Transaction context
   * @param {string} courseCode - Course code
   * @returns {string} Array of certificates for the course
   */
  async QueryCertificatesByCourse(ctx, courseCode) {
    // Query all certificates and filter by course
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const allResults = [];
    const filteredCertificates = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process certificate records (skip indexes)
        if (!key.startsWith('CERT_STUDENT_')) {
          try {
            const certificate = JSON.parse(result.value.value.toString());
            if (certificate.courseCode === courseCode) {
              filteredCertificates.push(certificate);
            }
          } catch (err) {
            console.log(`Error parsing certificate: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(filteredCertificates);
  }

  /**
   * QueryAllCertificates - Get all certificates in the system
   * @param {Context} ctx - Transaction context
   * @returns {string} Array of all certificates
   */
  async QueryAllCertificates(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const allResults = [];
    const certificates = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process certificate records (skip indexes)
        if (!key.startsWith('CERT_STUDENT_')) {
          try {
            const certificate = JSON.parse(result.value.value.toString());
            certificates.push(certificate);
          } catch (err) {
            console.log(`Error parsing certificate: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(certificates);
  }

  /**
   * GetCertificateStatistics - Get statistics about issued certificates
   * @param {Context} ctx - Transaction context
   * @returns {string} Statistics data
   */
  async GetCertificateStatistics(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    let totalCertificates = 0;
    const statusCount = { active: 0, revoked: 0, expired: 0 };
    const typeCount = {};
    const certificatesPerStudent = {};

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process certificate records (skip indexes)
        if (!key.startsWith('CERT_STUDENT_')) {
          try {
            const certificate = JSON.parse(result.value.value.toString());
            totalCertificates++;
            
            // Count by status
            if (statusCount[certificate.status] !== undefined) {
              statusCount[certificate.status]++;
            }
            
            // Count by type
            if (typeCount[certificate.certificateType]) {
              typeCount[certificate.certificateType]++;
            } else {
              typeCount[certificate.certificateType] = 1;
            }
            
            // Count per student
            if (certificatesPerStudent[certificate.studentId]) {
              certificatesPerStudent[certificate.studentId]++;
            } else {
              certificatesPerStudent[certificate.studentId] = 1;
            }
          } catch (err) {
            console.log(`Error parsing certificate: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    const statistics = {
      totalCertificates,
      statusBreakdown: statusCount,
      typeBreakdown: typeCount,
      uniqueStudents: Object.keys(certificatesPerStudent).length,
      averageCertificatesPerStudent: Object.keys(certificatesPerStudent).length > 0
        ? (totalCertificates / Object.keys(certificatesPerStudent).length).toFixed(2)
        : 0,
      generatedAt: new Date().toISOString()
    };

    return JSON.stringify(statistics);
  }

  /**
   * CertificateExists - Check if a certificate exists
   * @param {Context} ctx - Transaction context
   * @param {string} certificateId - Certificate ID to check
   * @returns {boolean} True if certificate exists
   */
  async CertificateExists(ctx, certificateId) {
    const certificateJSON = await ctx.stub.getState(certificateId);
    return certificateJSON && certificateJSON.length > 0;
  }
}

module.exports = CredentialContract;
