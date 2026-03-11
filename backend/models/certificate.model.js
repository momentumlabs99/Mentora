/**
 * Certificate Model
 * Represents a digital certificate in the blockchain educational platform
 */

class Certificate {
  constructor({
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
    status,
    createdAt,
    updatedAt
  }) {
    this.certificateId = certificateId;
    this.studentId = studentId;
    this.studentName = studentName;
    this.courseCode = courseCode;
    this.courseName = courseName;
    this.instructorName = instructorName;
    this.issueDate = issueDate;
    this.expirationDate = expirationDate;
    this.certificateType = certificateType || 'Course Completion';
    this.issuerOrg = issuerOrg;
    this.status = status || 'Active';
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  /**
   * Validate certificate data
   */
  validate() {
    const errors = [];

    if (!this.certificateId || typeof this.certificateId !== 'string') {
      errors.push('Invalid certificate ID');
    }

    if (!this.studentId || typeof this.studentId !== 'string') {
      errors.push('Student ID is required');
    }

    if (!this.studentName || typeof this.studentName !== 'string') {
      errors.push('Student name is required');
    }

    if (!this.courseCode || !this.courseName) {
      errors.push('Course details are required');
    }

    if (!this.instructorName) {
      errors.push('Instructor name is required');
    }

    if (!this.issueDate) {
      errors.push('Issue date is required');
    }

    const validStatuses = ['Active', 'Revoked', 'Expired'];
    if (this.status && !validStatuses.includes(this.status)) {
      errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if certificate is valid
   */
  isValid() {
    if (this.status !== 'Active') {
      return false;
    }

    if (this.expirationDate) {
      const expirationDate = new Date(this.expirationDate);
      const now = new Date();
      if (expirationDate < now) {
        return false;
      }
    }

    return true;
  }

  /**
   * Generate a certificate ID
   */
  static generateId() {
    return `CERT${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  /**
   * Create certificate from object
   */
  static fromObject(obj) {
    return new Certificate(obj);
  }
}

module.exports = Certificate;