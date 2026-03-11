/**
 * Student Model
 * Represents a student in the blockchain educational platform
 */

class Student {
  constructor({
    studentId,
    name,
    email,
    dateOfBirth,
    currentLevel,
    institution,
    createdAt,
    updatedAt
  }) {
    this.studentId = studentId;
    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.currentLevel = currentLevel || 'Freshman';
    this.institution = institution || '';
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  /**
   * Validate student data
   */
  validate() {
    const errors = [];

    if (!this.studentId || typeof this.studentId !== 'string') {
      errors.push('Invalid student ID');
    }

    if (!this.name || typeof this.name !== 'string') {
      errors.push('Name is required');
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required');
    }

    const validLevels = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
    if (this.currentLevel && !validLevels.includes(this.currentLevel)) {
      errors.push(`Invalid level. Must be one of: ${validLevels.join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate a student ID
   */
  static generateId() {
    return `STU${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  /**
   * Create student from object
   */
  static fromObject(obj) {
    return new Student(obj);
  }
}

module.exports = Student;