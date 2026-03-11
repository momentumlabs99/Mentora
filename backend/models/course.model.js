/**
 * Course Model
 * Represents a course in the blockchain educational platform
 */

class Course {
  constructor({
    courseId,
    courseCode,
    title,
    description,
    instructorId,
    instructorName,
    category,
    duration,
    skillLevel,
    issuerOrg,
    createdAt,
    updatedAt
  }) {
    this.courseId = courseId;
    this.courseCode = courseCode;
    this.title = title;
    this.description = description;
    this.instructorId = instructorId;
    this.instructorName = instructorName;
    this.category = category;
    this.duration = duration;
    this.skillLevel = skillLevel;
    this.issuerOrg = issuerOrg;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  /**
   * Validate course data
   */
  validate() {
    const errors = [];

    if (!this.courseId || typeof this.courseId !== 'string') {
      errors.push('Invalid course ID');
    }

    if (!this.courseCode || typeof this.courseCode !== 'string') {
      errors.push('Course code is required');
    }

    if (!this.title || typeof this.title !== 'string') {
      errors.push('Course title is required');
    }

    if (!this.description || typeof this.description !== 'string') {
      errors.push('Course description is required');
    }

    if (!this.instructorId || !this.instructorName) {
      errors.push('Instructor details are required');
    }

    const validSkillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    if (this.skillLevel && !validSkillLevels.includes(this.skillLevel)) {
      errors.push(`Invalid skill level. Must be one of: ${validSkillLevels.join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate a course ID
   */
  static generateId() {
    return `CRS${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  /**
   * Create course from object
   */
  static fromObject(obj) {
    return new Course(obj);
  }
}

module.exports = Course;