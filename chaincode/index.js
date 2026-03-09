'use strict';

const { Contract } = require('fabric-contract-api');
const CredentialContract = require('./credential-contract');
const CourseContract = require('./course-contract');
const ScholarshipContract = require('./scholarship-contract');

/**
 * MentoraChaincode - Main chaincode entry point for Mentora platform
 * This class aggregates all contract modules into a single chaincode
 */
class MentoraChaincode extends Contract {

  constructor() {
    super('org.mentora.mentorachaincode');
  }

  /**
   * Instantiate the chaincode and initialize all sub-ledgers
   * @param {Context} ctx - Transaction context
   */
  async Instantiate(ctx) {
    console.info('=========== INSTANTIATE MENTORA CHAINCODE ===========');

    // Initialize all contract ledgers
    const credentialContract = new CredentialContract();
    await credentialContract.InitLedger(ctx);

    const courseContract = new CourseContract();
    await courseContract.InitLedger(ctx);

    const scholarshipContract = new ScholarshipContract();
    await scholarshipContract.InitLedger(ctx);

    console.info('=========== MENTORA CHAINCODE INSTANTIATED SUCCESSFULLY ===========');
    return JSON.stringify({
      status: 'success',
      message: 'Mentora chaincode instantiated successfully',
      contracts: ['credential', 'course', 'scholarship']
    });
  }

  // ==================== CREDENTIAL CONTRACT METHODS ====================

  /**
   * IssueCertificate - Issue a new digital certificate
   * @param {Context} ctx - Transaction context
   */
  async IssueCertificate(ctx, certificateId, studentId, studentName, courseCode, courseName, instructorName, issueDate, expirationDate, certificateType, issuerOrg) {
    const credentialContract = new CredentialContract();
    return await credentialContract.IssueCertificate(ctx, certificateId, studentId, studentName, courseCode, courseName, instructorName, issueDate, expirationDate, certificateType, issuerOrg);
  }

  /**
   * VerifyCertificate - Verify certificate authenticity
   * @param {Context} ctx - Transaction context
   */
  async VerifyCertificate(ctx, certificateId) {
    const credentialContract = new CredentialContract();
    return await credentialContract.VerifyCertificate(ctx, certificateId);
  }

  /**
   * RevokeCertificate - Revoke a certificate
   * @param {Context} ctx - Transaction context
   */
  async RevokeCertificate(ctx, certificateId, reason, revokedBy) {
    const credentialContract = new CredentialContract();
    return await credentialContract.RevokeCertificate(ctx, certificateId, reason, revokedBy);
  }

  /**
   * QueryCertificate - Query a certificate by ID
   * @param {Context} ctx - Transaction context
   */
  async QueryCertificate(ctx, certificateId) {
    const credentialContract = new CredentialContract();
    return await credentialContract.QueryCertificate(ctx, certificateId);
  }

  /**
   * QueryCertificatesByStudent - Get all certificates for a student
   * @param {Context} ctx - Transaction context
   */
  async QueryCertificatesByStudent(ctx, studentId) {
    const credentialContract = new CredentialContract();
    return await credentialContract.QueryCertificatesByStudent(ctx, studentId);
  }

  /**
   * QueryCertificatesByCourse - Get all certificates for a course
   * @param {Context} ctx - Transaction context
   */
  async QueryCertificatesByCourse(ctx, courseCode) {
    const credentialContract = new CredentialContract();
    return await credentialContract.QueryCertificatesByCourse(ctx, courseCode);
  }

  /**
   * QueryAllCertificates - Get all certificates in the system
   * @param {Context} ctx - Transaction context
   */
  async QueryAllCertificates(ctx) {
    const credentialContract = new CredentialContract();
    return await credentialContract.QueryAllCertificates(ctx);
  }

  /**
   * GetCertificateStatistics - Get certificate statistics
   * @param {Context} ctx - Transaction context
   */
  async GetCertificateStatistics(ctx) {
    const credentialContract = new CredentialContract();
    return await credentialContract.GetCertificateStatistics(ctx);
  }

  /**
   * CertificateExists - Check if certificate exists
   * @param {Context} ctx - Transaction context
   */
  async CertificateExists(ctx, certificateId) {
    const credentialContract = new CredentialContract();
    return await credentialContract.CertificateExists(ctx, certificateId);
  }

  // ==================== COURSE CONTRACT METHODS ====================

  /**
   * CreateCourse - Create a new course
   * @param {Context} ctx - Transaction context
   */
  async CreateCourse(ctx, courseId, courseCode, title, description, instructorId, instructorName, category, duration, skillLevel, issuerOrg) {
    const courseContract = new CourseContract();
    return await courseContract.CreateCourse(ctx, courseId, courseCode, title, description, instructorId, instructorName, category, duration, skillLevel, issuerOrg);
  }

  /**
   * EnrollStudent - Enroll a student in a course
   * @param {Context} ctx - Transaction context
   */
  async EnrollStudent(ctx, enrollmentId, courseId, studentId, studentName, enrollDate) {
    const courseContract = new CourseContract();
    return await courseContract.EnrollStudent(ctx, enrollmentId, courseId, studentId, studentName, enrollDate);
  }

  /**
   * UpdateProgress - Update student progress in a course
   * @param {Context} ctx - Transaction context
   */
  async UpdateProgress(ctx, courseId, studentId, progress, modulesCompleted) {
    const courseContract = new CourseContract();
    return await courseContract.UpdateProgress(ctx, courseId, studentId, progress, modulesCompleted);
  }

  /**
   * RecordCompletion - Record student course completion
   * @param {Context} ctx - Transaction context
   */
  async RecordCompletion(ctx, courseId, studentId, completionDate, finalScore, assessorId) {
    const courseContract = new CourseContract();
    return await courseContract.RecordCompletion(ctx, courseId, studentId, completionDate, finalScore, assessorId);
  }

  /**
   * QueryCourse - Query a course by ID
   * @param {Context} ctx - Transaction context
   */
  async QueryCourse(ctx, courseId) {
    const courseContract = new CourseContract();
    return await courseContract.QueryCourse(ctx, courseId);
  }

  /**
   * QueryCourseByCode - Query a course by code
   * @param {Context} ctx - Transaction context
   */
  async QueryCourseByCode(ctx, courseCode) {
    const courseContract = new CourseContract();
    return await courseContract.QueryCourseByCode(ctx, courseCode);
  }

  /**
   * QueryCoursesByCategory - Get courses by category
   * @param {Context} ctx - Transaction context
   */
  async QueryCoursesByCategory(ctx, category) {
    const courseContract = new CourseContract();
    return await courseContract.QueryCoursesByCategory(ctx, category);
  }

  /**
   * QueryAllCourses - Get all courses
   * @param {Context} ctx - Transaction context
   */
  async QueryAllCourses(ctx) {
    const courseContract = new CourseContract();
    return await courseContract.QueryAllCourses(ctx);
  }

  /**
   * QueryStudentEnrollments - Get all enrollments for a student
   * @param {Context} ctx - Transaction context
   */
  async QueryStudentEnrollments(ctx, studentId) {
    const courseContract = new CourseContract();
    return await courseContract.QueryStudentEnrollments(ctx, studentId);
  }

  /**
   * QueryCourseEnrollments - Get all enrollments for a course
   * @param {Context} ctx - Transaction context
   */
  async QueryCourseEnrollments(ctx, courseId) {
    const courseContract = new CourseContract();
    return await courseContract.QueryCourseEnrollments(ctx, courseId);
  }

  /**
   * QueryCompletions - Get all completed courses
   * @param {Context} ctx - Transaction context
   */
  async QueryCompletions(ctx) {
    const courseContract = new CourseContract();
    return await courseContract.QueryCompletions(ctx);
  }

  /**
   * GetCourseStatistics - Get course statistics
   * @param {Context} ctx - Transaction context
   */
  async GetCourseStatistics(ctx) {
    const courseContract = new CourseContract();
    return await courseContract.GetCourseStatistics(ctx);
  }

  /**
   * CourseExists - Check if course exists
   * @param {Context} ctx - Transaction context
   */
  async CourseExists(ctx, courseId) {
    const courseContract = new CourseContract();
    return await courseContract.CourseExists(ctx, courseId);
  }

  // ==================== SCHOLARSHIP CONTRACT METHODS ====================

  /**
   * CreateScholarshipFund - Create a scholarship fund
   * @param {Context} ctx - Transaction context
   */
  async CreateScholarshipFund(ctx, fundId, fundName, description, donorId, donorName, initialAmount, currency, allocationYear, eligibilityCriteria) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.CreateScholarshipFund(ctx, fundId, fundName, description, donorId, donorName, initialAmount, currency, allocationYear, eligibilityCriteria);
  }

  /**
   * CreateDonation - Record a donation to a fund
   * @param {Context} ctx - Transaction context
   */
  async CreateDonation(ctx, donationId, fundId, donorId, donorName, amount, currency, donationDate, transactionReference) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.CreateDonation(ctx, donationId, fundId, donorId, donorName, amount, currency, donationDate, transactionReference);
  }

  /**
   * AllocateScholarship - Allocate scholarship to a student
   * @param {Context} ctx - Transaction context
   */
  async AllocateScholarship(ctx, allocationId, fundId, studentId, studentName, amount, currency, allocationDate, allocatedBy, reason) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.AllocateScholarship(ctx, allocationId, fundId, studentId, studentName, amount, currency, allocationDate, allocatedBy, reason);
  }

  /**
   * DisburseScholarship - Disburse scholarship funds
   * @param {Context} ctx - Transaction context
   */
  async DisburseScholarship(ctx, allocationId, disbursementDate, disbursementReference, disbursementMethod) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.DisburseScholarship(ctx, allocationId, disbursementDate, disbursementReference, disbursementMethod);
  }

  /**
   * QueryScholarshipFund - Query a scholarship fund
   * @param {Context} ctx - Transaction context
   */
  async QueryScholarshipFund(ctx, fundId) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryScholarshipFund(ctx, fundId);
  }

  /**
   * QueryAllFunds - Get all scholarship funds
   * @param {Context} ctx - Transaction context
   */
  async QueryAllFunds(ctx) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryAllFunds(ctx);
  }

  /**
   * QueryFundsByDonor - Get funds by donor
   * @param {Context} ctx - Transaction context
   */
  async QueryFundsByDonor(ctx, donorId) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryFundsByDonor(ctx, donorId);
  }

  /**
   * QueryFundsByYear - Get funds by year
   * @param {Context} ctx - Transaction context
   */
  async QueryFundsByYear(ctx, year) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryFundsByYear(ctx, year);
  }

  /**
   * QueryDonation - Query a donation
   * @param {Context} ctx - Transaction context
   */
  async QueryDonation(ctx, donationId) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryDonation(ctx, donationId);
  }

  /**
   * QueryDonationsByFund - Get donations for a fund
   * @param {Context} ctx - Transaction context
   */
  async QueryDonationsByFund(ctx, fundId) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryDonationsByFund(ctx, fundId);
  }

  /**
   * QueryStudentScholarships - Get scholarships for a student
   * @param {Context} ctx - Transaction context
   */
  async QueryStudentScholarships(ctx, studentId) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryStudentScholarships(ctx, studentId);
  }

  /**
   * QueryFundAllocations - Get allocations for a fund
   * @param {Context} ctx - Transaction context
   */
  async QueryFundAllocations(ctx, fundId) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.QueryFundAllocations(ctx, fundId);
  }

  /**
   * GetScholarshipStatistics - Get scholarship statistics
   * @param {Context} ctx - Transaction context
   */
  async GetScholarshipStatistics(ctx) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.GetScholarshipStatistics(ctx);
  }

  /**
   * ScholarshipFundExists - Check if scholarship fund exists
   * @param {Context} ctx - Transaction context
   */
  async ScholarshipFundExists(ctx, fundId) {
    const scholarshipContract = new ScholarshipContract();
    return await scholarshipContract.ScholarshipFundExists(ctx, fundId);
  }

  // ==================== GLOBAL METHODS ====================

  /**
   * GetSystemStatus - Get overall system status
   * @param {Context} ctx - Transaction context
   */
  async GetSystemStatus(ctx) {
    const credentialStats = await this.GetCertificateStatistics(ctx);
    const courseStats = await this.GetCourseStatistics(ctx);
    const scholarshipStats = await this.GetScholarshipStatistics(ctx);

    return JSON.stringify({
      status: 'operational',
      timestamp: new Date().toISOString(),
      contracts: {
        credential: JSON.parse(credentialStats),
        course: JSON.parse(courseStats),
        scholarship: JSON.parse(scholarshipStats)
      }
    });
  }
}

module.exports = MentoraChaincode;
