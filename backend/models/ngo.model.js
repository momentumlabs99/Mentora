/**
 * NGO/Sponsor Model
 * Represents an NGO or sponsoring organization in the platform
 */

class NGO {
  constructor({
    ngoId,
    name,
    email,
    phone,
    address,
    registrationNumber,
    description,
    country,
    region,
    contactPerson,
    contactEmail,
    website,
    status,
    createdAt,
    updatedAt
  }) {
    this.ngoId = ngoId;
    this.name = name;
    this.email = email;
    this.phone = phone || '';
    this.address = address || '';
    this.registrationNumber = registrationNumber || '';
    this.description = description || '';
    this.country = country || '';
    this.region = region || '';
    this.contactPerson = contactPerson || '';
    this.contactEmail = contactEmail || '';
    this.website = website || '';
    this.status = status || 'Active';
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  /**
   * Validate NGO data
   */
  validate() {
    const errors = [];

    if (!this.ngoId || typeof this.ngoId !== 'string') {
      errors.push('Invalid NGO ID');
    }

    if (!this.name || typeof this.name !== 'string') {
      errors.push('Name is required');
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Valid email is required');
    }

    if (!this.registrationNumber) {
      errors.push('Registration number is required');
    }

    const validStatuses = ['Active', 'Inactive', 'Suspended'];
    if (this.status && !validStatuses.includes(this.status)) {
      errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
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
   * Generate an NGO ID
   */
  static generateId() {
    return `NGO${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  /**
   * Create NGO from object
   */
  static fromObject(obj) {
    return new NGO(obj);
  }
}

module.exports = NGO;