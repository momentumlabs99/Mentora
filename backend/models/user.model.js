/**
 * User Model
 * Represents a user in the blockchain educational platform
 * Supports multiple roles: ADMIN, NGO, STUDENT
 */

class User {
  constructor({
    userId,
    email,
    password,
    name,
    role,
    organization,
    studentId,
    branchId,
    createdAt,
    updatedAt
  }) {
    this.userId = userId;
    this.email = email;
    this.password = password; // In production, this should be hashed
    this.name = name;
    this.role = role || 'STUDENT';
    this.organization = organization || '';
    this.studentId = studentId || '';
    this.branchId = branchId || '';
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  /**
   * Validate user data
   */
  validate() {
    const errors = [];

    const validRoles = ['ADMIN', 'NGO', 'STUDENT'];
    if (!this.role || !validRoles.includes(this.role)) {
      errors.push(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required');
    }

    if (!this.password || this.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    if (!this.name || typeof this.name !== 'string') {
      errors.push('Name is required');
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
   * Generate a user ID
   */
  static generateId(role) {
    const prefix = role === 'NGO' ? 'NGO' : role === 'ADMIN' ? 'ADM' : 'USR';
    return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  /**
   * Create user from object (excluding password)
   */
  static fromObject(obj, includePassword = false) {
    const user = new User(obj);
    if (!includePassword) {
      delete user.password;
    }
    return user;
  }

  /**
   * Return user object without password
   */
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;