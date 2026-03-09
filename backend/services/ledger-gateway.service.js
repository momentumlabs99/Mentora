const grpc = require('@grpc/grpc-js');
const { connect, signers } = require('@hyperledger/fabric-gateway');
const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const { TextDecoder } = require('util');

// Import configuration
const config = require('../config/fabric.config');

const utf8Decoder = new TextDecoder();

/**
 * Create gRPC connection to Fabric peer
 * @returns {Promise<Client>} gRPC client
 */
async function newGrpcConnection() {
  // Load peer TLS certificate
  const tlsCertPath = config.peerTlsCertPath;
  
  const tlsRootCert = await fs.readFile(tlsCertPath);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  
  return new grpc.Client(
    config.peerEndpoint,
    tlsCredentials,
    {
      'grpc.ssl_target_name_override': config.peerHostAlias,
      'grpc.default_authority': config.peerHostAlias,
    }
  );
}

/**
 * Load user identity from crypto materials
 * @returns {Promise<object>} Identity object with MSP ID and credentials
 */
async function newIdentity() {
  // Load user certificate
  const certDirectoryPath = config.userCertPath;
  
  const files = await fs.readdir(certDirectoryPath);
  const certPath = path.join(certDirectoryPath, files[0]);
  const credentials = await fs.readFile(certPath);
  
  return {
    mspId: config.mspId,
    credentials,
  };
}

/**
 * Create signer from private key
 * @returns {Promise<Signer>} Signer for transaction signing
 */
async function newSigner() {
  // Load private key
  const keyDirectoryPath = config.userKeyPath;
  
  const files = await fs.readdir(keyDirectoryPath);
  const keyPath = path.join(keyDirectoryPath, files[0]);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  
  return signers.newPrivateKeySigner(privateKey);
}

/**
 * Get contract instance from Fabric network
 * @returns {Promise<Contract>} Fabric contract
 */
async function getContract() {
  const client = await newGrpcConnection();
  
  const gateway = connect({
    client,
    identity: await newIdentity(),
    signer: await newSigner(),
    // Default timeouts for different operations
    evaluateOptions: () => ({ deadline: Date.now() + 5000 }),   // 5 seconds for queries
    endorseOptions: () => ({ deadline: Date.now() + 15000 }),  // 15 seconds for endorsement
    submitOptions: () => ({ deadline: Date.now() + 5000 }),     // 5 seconds for submission
    commitStatusOptions: () => ({ deadline: Date.now() + 60000 }), // 1 minute for commit
  });

  // Get network and contract
  const network = gateway.getNetwork(config.channelName);
  const contract = network.getContract(config.chaincodeName);

  // Store gateway and client for cleanup
  contract._gateway = gateway;
  contract._client = client;

  return contract;
}

/**
 * Helper function to handle contract execution with cleanup
 * @param {Function} operation - Operation to execute
 * @returns {Promise<any>} Operation result
 */
async function executeWithCleanup(operation) {
  const contract = await getContract();
  
  try {
    return await operation(contract);
  } finally {
    // Always cleanup connections
    if (contract._gateway) {
      contract._gateway.close();
    }
    if (contract._client) {
      contract._client.close();
    }
  }
}

// ==================== CREDENTIAL CONTRACT METHODS ====================

/**
 * IssueCertificate - Issue a new digital certificate
 * @param {object} certificateData - Certificate details
 * @returns {Promise<object>} Certificate data
 */
async function issueCertificate(certificateData) {
  return await executeWithCleanup(async (contract) => {
    const { certificateId, studentId, studentName, courseCode, courseName, instructorName, issueDate, expirationDate, certificateType, issuerOrg } = certificateData;
    
    console.log(`--> Submit Transaction: IssueCertificate for ${certificateId}`);
    const resultBytes = await contract.submitTransaction(
      'IssueCertificate',
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
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * VerifyCertificate - Verify certificate authenticity
 * @param {string} certificateId - Certificate ID
 * @returns {Promise<object>} Verification result
 */
async function verifyCertificate(certificateId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: VerifyCertificate for ${certificateId}`);
    const resultBytes = await contract.evaluateTransaction('VerifyCertificate', certificateId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * RevokeCertificate - Revoke a certificate
 * @param {string} certificateId - Certificate ID
 * @param {string} reason - Revocation reason
 * @param {string} revokedBy - Authorizing entity
 * @returns {Promise<object>} Revoked certificate data
 */
async function revokeCertificate(certificateId, reason, revokedBy) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Submit Transaction: RevokeCertificate for ${certificateId}`);
    const resultBytes = await contract.submitTransaction('RevokeCertificate', certificateId, reason, revokedBy);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCertificate - Query a certificate by ID
 * @param {string} certificateId - Certificate ID
 * @returns {Promise<object>} Certificate data
 */
async function queryCertificate(certificateId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCertificate for ${certificateId}`);
    const resultBytes = await contract.evaluateTransaction('QueryCertificate', certificateId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCertificatesByStudent - Get all certificates for a student
 * @param {string} studentId - Student ID
 * @returns {Promise<Array>} Array of certificates
 */
async function queryCertificatesByStudent(studentId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCertificatesByStudent for ${studentId}`);
    const resultBytes = await contract.evaluateTransaction('QueryCertificatesByStudent', studentId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCertificatesByCourse - Get all certificates for a course
 * @param {string} courseCode - Course code
 * @returns {Promise<Array>} Array of certificates
 */
async function queryCertificatesByCourse(courseCode) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCertificatesByCourse for ${courseCode}`);
    const resultBytes = await contract.evaluateTransaction('QueryCertificatesByCourse', courseCode);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryAllCertificates - Get all certificates
 * @returns {Promise<Array>} Array of all certificates
 */
async function queryAllCertificates() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryAllCertificates`);
    const resultBytes = await contract.evaluateTransaction('QueryAllCertificates');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * GetCertificateStatistics - Get certificate statistics
 * @returns {Promise<object>} Statistics data
 */
async function getCertificateStatistics() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: GetCertificateStatistics`);
    const resultBytes = await contract.evaluateTransaction('GetCertificateStatistics');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

// ==================== COURSE CONTRACT METHODS ====================

/**
 * CreateCourse - Create a new course
 * @param {object} courseData - Course details
 * @returns {Promise<object>} Course data
 */
async function createCourse(courseData) {
  return await executeWithCleanup(async (contract) => {
    const { courseId, courseCode, title, description, instructorId, instructorName, category, duration, skillLevel, issuerOrg } = courseData;
    
    console.log(`--> Submit Transaction: CreateCourse for ${courseId}`);
    const resultBytes = await contract.submitTransaction(
      'CreateCourse',
      courseId,
      courseCode,
      title,
      description,
      instructorId,
      instructorName,
      category,
      duration,
      skillLevel,
      issuerOrg
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * EnrollStudent - Enroll a student in a course
 * @param {object} enrollmentData - Enrollment details
 * @returns {Promise<object>} Enrollment data
 */
async function enrollStudent(enrollmentData) {
  return await executeWithCleanup(async (contract) => {
    const { enrollmentId, courseId, studentId, studentName, enrollDate } = enrollmentData;
    
    console.log(`--> Submit Transaction: EnrollStudent for ${enrollmentId}`);
    const resultBytes = await contract.submitTransaction(
      'EnrollStudent',
      enrollmentId,
      courseId,
      studentId,
      studentName,
      enrollDate
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * UpdateProgress - Update student progress in a course
 * @param {string} courseId - Course ID
 * @param {string} studentId - Student ID
 * @param {number} progress - Progress percentage
 * @param {Array} modulesCompleted - List of completed modules
 * @returns {Promise<object>} Updated enrollment data
 */
async function updateProgress(courseId, studentId, progress, modulesCompleted) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Submit Transaction: UpdateProgress for ${courseId}/${studentId}`);
    const resultBytes = await contract.submitTransaction(
      'UpdateProgress',
      courseId,
      studentId,
      progress.toString(),
      JSON.stringify(modulesCompleted)
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * RecordCompletion - Record student course completion
 * @param {object} completionData - Completion details
 * @returns {Promise<object>} Completion data
 */
async function recordCompletion(completionData) {
  return await executeWithCleanup(async (contract) => {
    const { courseId, studentId, completionDate, finalScore, assessorId } = completionData;
    
    console.log(`--> Submit Transaction: RecordCompletion for ${courseId}/${studentId}`);
    const resultBytes = await contract.submitTransaction(
      'RecordCompletion',
      courseId,
      studentId,
      completionDate,
      finalScore.toString(),
      assessorId
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCourse - Query a course by ID
 * @param {string} courseId - Course ID
 * @returns {Promise<object>} Course data
 */
async function queryCourse(courseId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCourse for ${courseId}`);
    const resultBytes = await contract.evaluateTransaction('QueryCourse', courseId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCourseByCode - Query a course by code
 * @param {string} courseCode - Course code
 * @returns {Promise<object>} Course data
 */
async function queryCourseByCode(courseCode) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCourseByCode for ${courseCode}`);
    const resultBytes = await contract.evaluateTransaction('QueryCourseByCode', courseCode);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCoursesByCategory - Get courses by category
 * @param {string} category - Course category
 * @returns {Promise<Array>} Array of courses
 */
async function queryCoursesByCategory(category) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCoursesByCategory for ${category}`);
    const resultBytes = await contract.evaluateTransaction('QueryCoursesByCategory', category);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryAllCourses - Get all courses
 * @returns {Promise<Array>} Array of all courses
 */
async function queryAllCourses() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryAllCourses`);
    const resultBytes = await contract.evaluateTransaction('QueryAllCourses');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryStudentEnrollments - Get enrollments for a student
 * @param {string} studentId - Student ID
 * @returns {Promise<Array>} Array of enrollments
 */
async function queryStudentEnrollments(studentId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryStudentEnrollments for ${studentId}`);
    const resultBytes = await contract.evaluateTransaction('QueryStudentEnrollments', studentId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCourseEnrollments - Get enrollments for a course
 * @param {string} courseId - Course ID
 * @returns {Promise<Array>} Array of enrollments
 */
async function queryCourseEnrollments(courseId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCourseEnrollments for ${courseId}`);
    const resultBytes = await contract.evaluateTransaction('QueryCourseEnrollments', courseId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryCompletions - Get all course completions
 * @returns {Promise<Array>} Array of completions
 */
async function queryCompletions() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryCompletions`);
    const resultBytes = await contract.evaluateTransaction('QueryCompletions');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * GetCourseStatistics - Get course statistics
 * @returns {Promise<object>} Statistics data
 */
async function getCourseStatistics() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: GetCourseStatistics`);
    const resultBytes = await contract.evaluateTransaction('GetCourseStatistics');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

// ==================== SCHOLARSHIP CONTRACT METHODS ====================

/**
 * CreateScholarshipFund - Create a scholarship fund
 * @param {object} fundData - Fund details
 * @returns {Promise<object>} Fund data
 */
async function createScholarshipFund(fundData) {
  return await executeWithCleanup(async (contract) => {
    const { fundId, fundName, description, donorId, donorName, initialAmount, currency, allocationYear, eligibilityCriteria } = fundData;
    
    console.log(`--> Submit Transaction: CreateScholarshipFund for ${fundId}`);
    const resultBytes = await contract.submitTransaction(
      'CreateScholarshipFund',
      fundId,
      fundName,
      description,
      donorId,
      donorName,
      initialAmount.toString(),
      currency,
      allocationYear,
      JSON.stringify(eligibilityCriteria)
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * CreateDonation - Record a donation to a fund
 * @param {object} donationData - Donation details
 * @returns {Promise<object>} Donation data
 */
async function createDonation(donationData) {
  return await executeWithCleanup(async (contract) => {
    const { donationId, fundId, donorId, donorName, amount, currency, donationDate, transactionReference } = donationData;
    
    console.log(`--> Submit Transaction: CreateDonation for ${donationId}`);
    const resultBytes = await contract.submitTransaction(
      'CreateDonation',
      donationId,
      fundId,
      donorId,
      donorName,
      amount.toString(),
      currency,
      donationDate,
      transactionReference
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * AllocateScholarship - Allocate scholarship to a student
 * @param {object} allocationData - Allocation details
 * @returns {Promise<object>} Allocation data
 */
async function allocateScholarship(allocationData) {
  return await executeWithCleanup(async (contract) => {
    const { allocationId, fundId, studentId, studentName, amount, currency, allocationDate, allocatedBy, reason } = allocationData;
    
    console.log(`--> Submit Transaction: AllocateScholarship for ${allocationId}`);
    const resultBytes = await contract.submitTransaction(
      'AllocateScholarship',
      allocationId,
      fundId,
      studentId,
      studentName,
      amount.toString(),
      currency,
      allocationDate,
      allocatedBy,
      reason
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * DisburseScholarship - Disburse scholarship funds
 * @param {object} disbursementData - Disbursement details
 * @returns {Promise<object>} Disbursement data
 */
async function disburseScholarship(disbursementData) {
  return await executeWithCleanup(async (contract) => {
    const { allocationId, disbursementDate, disbursementReference, disbursementMethod } = disbursementData;
    
    console.log(`--> Submit Transaction: DisburseScholarship for ${allocationId}`);
    const resultBytes = await contract.submitTransaction(
      'DisburseScholarship',
      allocationId,
      disbursementDate,
      disbursementReference,
      disbursementMethod
    );
    
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryScholarshipFund - Query a scholarship fund
 * @param {string} fundId - Fund ID
 * @returns {Promise<object>} Fund data
 */
async function queryScholarshipFund(fundId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryScholarshipFund for ${fundId}`);
    const resultBytes = await contract.evaluateTransaction('QueryScholarshipFund', fundId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryAllFunds - Get all scholarship funds
 * @returns {Promise<Array>} Array of funds
 */
async function queryAllFunds() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryAllFunds`);
    const resultBytes = await contract.evaluateTransaction('QueryAllFunds');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryFundsByDonor - Get funds by donor
 * @param {string} donorId - Donor ID
 * @returns {Promise<Array>} Array of funds
 */
async function queryFundsByDonor(donorId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryFundsByDonor for ${donorId}`);
    const resultBytes = await contract.evaluateTransaction('QueryFundsByDonor', donorId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryFundsByYear - Get funds by allocation year
 * @param {string} year - Year
 * @returns {Promise<Array>} Array of funds
 */
async function queryFundsByYear(year) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryFundsByYear for ${year}`);
    const resultBytes = await contract.evaluateTransaction('QueryFundsByYear', year);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryDonation - Query a donation
 * @param {string} donationId - Donation ID
 * @returns {Promise<object>} Donation data
 */
async function queryDonation(donationId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryDonation for ${donationId}`);
    const resultBytes = await contract.evaluateTransaction('QueryDonation', donationId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryDonationsByFund - Get donations for a fund
 * @param {string} fundId - Fund ID
 * @returns {Promise<Array>} Array of donations
 */
async function queryDonationsByFund(fundId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryDonationsByFund for ${fundId}`);
    const resultBytes = await contract.evaluateTransaction('QueryDonationsByFund', fundId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryStudentScholarships - Get scholarships for a student
 * @param {string} studentId - Student ID
 * @returns {Promise<Array>} Array of scholarships
 */
async function queryStudentScholarships(studentId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryStudentScholarships for ${studentId}`);
    const resultBytes = await contract.evaluateTransaction('QueryStudentScholarships', studentId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * QueryFundAllocations - Get allocations for a fund
 * @param {string} fundId - Fund ID
 * @returns {Promise<Array>} Array of allocations
 */
async function queryFundAllocations(fundId) {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: QueryFundAllocations for ${fundId}`);
    const resultBytes = await contract.evaluateTransaction('QueryFundAllocations', fundId);
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

/**
 * GetScholarshipStatistics - Get scholarship statistics
 * @returns {Promise<object>} Statistics data
 */
async function getScholarshipStatistics() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: GetScholarshipStatistics`);
    const resultBytes = await contract.evaluateTransaction('GetScholarshipStatistics');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

// ==================== SYSTEM METHODS ====================

/**
 * GetSystemStatus - Get overall system status
 * @returns {Promise<object>} System status data
 */
async function getSystemStatus() {
  return await executeWithCleanup(async (contract) => {
    console.log(`--> Evaluate Transaction: GetSystemStatus`);
    const resultBytes = await contract.evaluateTransaction('GetSystemStatus');
    return JSON.parse(utf8Decoder.decode(resultBytes));
  });
}

module.exports = {
  // Credential Contract Methods
  issueCertificate,
  verifyCertificate,
  revokeCertificate,
  queryCertificate,
  queryCertificatesByStudent,
  queryCertificatesByCourse,
  queryAllCertificates,
  getCertificateStatistics,
  
  // Course Contract Methods
  createCourse,
  enrollStudent,
  updateProgress,
  recordCompletion,
  queryCourse,
  queryCourseByCode,
  queryCoursesByCategory,
  queryAllCourses,
  queryStudentEnrollments,
  queryCourseEnrollments,
  queryCompletions,
  getCourseStatistics,
  
  // Scholarship Contract Methods
  createScholarshipFund,
  createDonation,
  allocateScholarship,
  disburseScholarship,
  queryScholarshipFund,
  queryAllFunds,
  queryFundsByDonor,
  queryFundsByYear,
  queryDonation,
  queryDonationsByFund,
  queryStudentScholarships,
  queryFundAllocations,
  getScholarshipStatistics,
  
  // System Methods
  getSystemStatus,
  
  // Helpers
  executeWithCleanup
};
