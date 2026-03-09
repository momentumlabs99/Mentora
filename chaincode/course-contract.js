'use strict';

const { Contract } = require('fabric-contract-api');

/**
 * CourseContract - Manages course information and completions on the blockchain
 * Provides functionality to create courses, enroll students, track progress, and record completions
 */
class CourseContract extends Contract {

  constructor() {
    super('org.mentora.course');
  }

  /**
   * InitLedger - Initialize the ledger with default data
   */
  async InitLedger(ctx) {
    console.info('=========== INITIALIZE COURSE LEDGER ===========');
    const courses = [];
    console.info('Course ledger initialized with empty state');
    return JSON.stringify(courses);
  }

  /**
   * CreateCourse - Create a new course in the system
   * @param {Context} ctx - Transaction context
   * @param {string} courseId - Unique course identifier
   * @param {string} courseCode - Course code (e.g., CS101)
   * @param {string} title - Course title
   * @param {string} description - Course description
   * @param {string} instructorId - Instructor's unique ID
   * @param {string} instructorName - Instructor's full name
   * @param {string} category - Course category (Digital Literacy, Financial Literacy, etc.)
   * @param {string} duration - Course duration (e.g., "4 weeks")
   * @param {string} skillLevel - Skill level (Beginner, Intermediate, Advanced)
   * @param {string} issuerOrg - Issuing organization
   * @returns {string} Created course data
   */
  async CreateCourse(
    ctx,
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
  ) {
    const exists = await this.CourseExists(ctx, courseId);
    if (exists) {
      throw new Error(`The course ${courseId} already exists`);
    }

    const course = {
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
      status: 'active',
      enrolledStudents: 0,
      completions: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const courseBuffer = Buffer.from(JSON.stringify(course));
    await ctx.stub.putState(courseId, courseBuffer);

    // Create index by course code
    await ctx.stub.putState(
      `COURSE_CODE_${courseCode}`,
      courseBuffer
    );

    // Create index by category
    await ctx.stub.putState(
      `COURSE_CATEGORY_${category}_${courseId}`,
      courseBuffer
    );

    console.info(`Course ${courseId} created`);
    return JSON.stringify(course);
  }

  /**
   * EnrollStudent - Enroll a student in a course
   * @param {Context} ctx - Transaction context
   * @param {string} enrollmentId - Unique enrollment ID
   * @param {string} courseId - Course ID
   * @param {string} studentId - Student ID
   * @param {string} studentName - Student's name
   * @param {string} enrollDate - Enrollment date (ISO format)
   * @returns {string} Enrollment record
   */
  async EnrollStudent(
    ctx,
    enrollmentId,
    courseId,
    studentId,
    studentName,
    enrollDate
  ) {
    // Check if course exists
    const courseJSON = await ctx.stub.getState(courseId);
    if (!courseJSON || courseJSON.length === 0) {
      throw new Error(`Course ${courseId} not found`);
    }

    // Check if student is already enrolled
    const enrollmentKey = `ENROLL_${courseId}_${studentId}`;
    const existingEnrollment = await ctx.stub.getState(enrollmentKey);
    if (existingEnrollment && existingEnrollment.length > 0) {
      throw new Error(`Student ${studentId} is already enrolled in course ${courseId}`);
    }

    const enrollment = {
      enrollmentId,
      courseId,
      studentId,
      studentName,
      enrollmentDate: enrollDate,
      status: 'enrolled', // enrolled, in_progress, completed, dropped
      progress: 0,
      modulesCompleted: [],
      lastAccessDate: enrollDate,
      completionDate: null,
      blockchainHash: ctx.stub.getTxID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const enrollmentBuffer = Buffer.from(JSON.stringify(enrollment));
    await ctx.stub.putState(enrollmentKey, enrollmentBuffer);

    // Update course enrollment count
    const course = JSON.parse(courseJSON.toString());
    course.enrolledStudents += 1;
    course.updatedAt = new Date().toISOString();
    await ctx.stub.putState(courseId, Buffer.from(JSON.stringify(course)));

    console.info(`Student ${studentId} enrolled in course ${courseId}`);
    return JSON.stringify(enrollment);
  }

  /**
   * UpdateProgress - Update student's progress in a course
   * @param {Context} ctx - Transaction context
   * @param {string} courseId - Course ID
   * @param {string} studentId - Student ID
   * @param {number} progress - Progress percentage (0-100)
   * @param {Array} modulesCompleted - List of completed module IDs
   * @returns {string} Updated enrollment record
   */
  async UpdateProgress(
    ctx,
    courseId,
    studentId,
    progress,
    modulesCompleted
  ) {
    const enrollmentKey = `ENROLL_${courseId}_${studentId}`;
    const enrollmentJSON = await ctx.stub.getState(enrollmentKey);
    
    if (!enrollmentJSON || enrollmentJSON.length === 0) {
      throw new Error(`Enrollment not found for student ${studentId} in course ${courseId}`);
    }

    const enrollment = JSON.parse(enrollmentJSON.toString());
    
    enrollment.progress = progress;
    enrollment.modulesCompleted = JSON.parse(modulesCompleted);
    enrollment.lastAccessDate = new Date().toISOString();
    enrollment.updatedAt = new Date().toISOString();

    if (progress > 0 && enrollment.status === 'enrolled') {
      enrollment.status = 'in_progress';
    }

    await ctx.stub.putState(enrollmentKey, Buffer.from(JSON.stringify(enrollment)));

    return JSON.stringify(enrollment);
  }

  /**
   * RecordCompletion - Record a student's course completion
   * @param {Context} ctx - Transaction context
   * @param {string} courseId - Course ID
   * @param {string} studentId - Student ID
   * @param {string} completionDate - Date of completion (ISO format)
   * @param {number} finalScore - Final score (0-100)
   * @param {string} assessorId - ID of assessor verifying completion
   * @returns {string} Updated enrollment record
   */
  async RecordCompletion(
    ctx,
    courseId,
    studentId,
    completionDate,
    finalScore,
    assessorId
  ) {
    const enrollmentKey = `ENROLL_${courseId}_${studentId}`;
    const enrollmentJSON = await ctx.stub.getState(enrollmentKey);
    
    if (!enrollmentJSON || enrollmentJSON.length === 0) {
      throw new Error(`Enrollment not found for student ${studentId} in course ${courseId}`);
    }

    const courseJSON = await ctx.stub.getState(courseId);
    const course = JSON.parse(courseJSON.toString());

    const enrollment = JSON.parse(enrollmentJSON.toString());
    
    enrollment.status = 'completed';
    enrollment.progress = 100;
    enrollment.completionDate = completionDate;
    enrollment.finalScore = finalScore;
    enrollment.assessorId = assessorId;
    enrollment.blockchainHash = ctx.stub.getTxID();
    enrollment.updatedAt = new Date().toISOString();

    await ctx.stub.putState(enrollmentKey, Buffer.from(JSON.stringify(enrollment)));

    // Update course completion count
    course.completions += 1;
    course.updatedAt = new Date().toISOString();
    await ctx.stub.putState(courseId, Buffer.from(JSON.stringify(course)));

    console.info(`Student ${studentId} completed course ${courseId}`);
    return JSON.stringify(enrollment);
  }

  /**
   * QueryCourse - Query a single course by ID
   * @param {Context} ctx - Transaction context
   * @param {string} courseId - Course ID
   * @returns {string} Course data
   */
  async QueryCourse(ctx, courseId) {
    const courseJSON = await ctx.stub.getState(courseId);
    
    if (!courseJSON || courseJSON.length === 0) {
      throw new Error(`Course ${courseId} not found`);
    }

    return courseJSON.toString();
  }

  /**
   * QueryCourseByCode - Query a course by its course code
   * @param {Context} ctx - Transaction context
   * @param {string} courseCode - Course code
   * @returns {string} Course data
   */
  async QueryCourseByCode(ctx, courseCode) {
    const courseJSON = await ctx.stub.getState(`COURSE_CODE_${courseCode}`);
    
    if (!courseJSON || courseJSON.length === 0) {
      throw new Error(`Course with code ${courseCode} not found`);
    }

    return courseJSON.toString();
  }

  /**
   * QueryCoursesByCategory - Get all courses in a specific category
   * @param {Context} ctx - Transaction context
   * @param {string} category - Course category
   * @returns {string} Array of courses in the category
   */
  async QueryCoursesByCategory(ctx, category) {
    const iterator = await ctx.stub.getStateByRange(
      `COURSE_CATEGORY_${category}_`,
      `COURSE_CATEGORY_${category}_\uffff`
    );

    const allResults = [];
    
    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        try {
          const course = JSON.parse(result.value.value.toString());
          allResults.push(course);
        } catch (err) {
          console.log(`Error parsing course: ${err}`);
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
   * QueryAllCourses - Get all courses in the system
   * @param {Context} ctx - Transaction context
   * @returns {string} Array of all courses
   */
  async QueryAllCourses(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const allResults = [];
    const courses = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process course records
        if (!key.startsWith('COURSE_CODE_') && 
            !key.startsWith('COURSE_CATEGORY_') && 
            !key.startsWith('ENROLL_')) {
          try {
            const course = JSON.parse(result.value.value.toString());
            if (course.courseId) {
              courses.push(course);
            }
          } catch (err) {
            console.log(`Error parsing course: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(courses);
  }

  /**
   * QueryStudentEnrollments - Get all enrollments for a specific student
   * @param {Context} ctx - Transaction context
   * @param {string} studentId - Student ID
   * @returns {string} Array of student enrollments
   */
  async QueryStudentEnrollments(ctx, studentId) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const enrollments = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process enrollment records
        if (key.startsWith('ENROLL_') && key.endsWith(`_${studentId}`)) {
          try {
            const enrollment = JSON.parse(result.value.value.toString());
            enrollments.push(enrollment);
          } catch (err) {
            console.log(`Error parsing enrollment: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(enrollments);
  }

  /**
   * QueryCourseEnrollments - Get all enrollments for a specific course
   * @param {Context} ctx - Transaction context
   * @param {string} courseId - Course ID
   * @returns {string} Array of course enrollments
   */
  async QueryCourseEnrollments(ctx, courseId) {
    const iterator = await ctx.stub.getStateByRange(
      `ENROLL_${courseId}_`,
      `ENROLL_${courseId}_\uffff`
    );

    const enrollments = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        try {
          const enrollment = JSON.parse(result.value.value.toString());
          enrollments.push(enrollment);
        } catch (err) {
          console.log(`Error parsing enrollment: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(enrollments);
  }

  /**
   * QueryCompletions - Get all completed courses
   * @param {Context} ctx - Transaction context
   * @returns {string} Array of completed enrollments
   */
  async QueryCompletions(ctx) {
    const iterator = await ctx.stub.getStateByRange('ENROLL_', 'ENROLL_\uffff');
    
    const completions = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        try {
          const enrollment = JSON.parse(result.value.value.toString());
          if (enrollment.status === 'completed') {
            completions.push(enrollment);
          }
        } catch (err) {
          console.log(`Error parsing enrollment: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(completions);
  }

  /**
   * GetCourseStatistics - Get statistics about courses and enrollments
   * @param {Context} ctx - Transaction context
   * @returns {string} Statistics data
   */
  async GetCourseStatistics(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const courses = [];
    const enrollments = [];
    let totalCourses = 0;
    let totalEnrollments = 0;
    let totalCompletions = 0;
    const categoryCount = {};
    const skillLevelCount = {};

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        try {
          const value = JSON.parse(result.value.value.toString());
          
          if (value.courseId && !key.startsWith('COURSE_CODE_') && !key.startsWith('COURSE_CATEGORY_')) {
            courses.push(value);
            totalCourses++;
            
            // Count by category
            if (categoryCount[value.category]) {
              categoryCount[value.category]++;
            } else {
              categoryCount[value.category] = 1;
            }
            
            // Count by skill level
            if (skillLevelCount[value.skillLevel]) {
              skillLevelCount[value.skillLevel]++;
            } else {
              skillLevelCount[value.skillLevel] = 1;
            }
          }
          
          if (key.startsWith('ENROLL_')) {
            enrollments.push(value);
            totalEnrollments++;
            
            if (value.status === 'completed') {
              totalCompletions++;
            }
          }
        } catch (err) {
          console.log(`Error parsing record: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    const statistics = {
      totalCourses,
      totalEnrollments,
      totalCompletions,
      completionRate: totalEnrollments > 0 
        ? ((totalCompletions / totalEnrollments) * 100).toFixed(2)
        : 0,
      averageStudentsPerCourse: totalCourses > 0 
        ? (totalEnrollments / totalCourses).toFixed(2)
        : 0,
      categoryBreakdown: categoryCount,
      skillLevelBreakdown: skillLevelCount,
      generatedAt: new Date().toISOString()
    };

    return JSON.stringify(statistics);
  }

  /**
   * CourseExists - Check if a course exists
   * @param {Context} ctx - Transaction context
   * @param {string} courseId - Course ID to check
   * @returns {boolean} True if course exists
   */
  async CourseExists(ctx, courseId) {
    const courseJSON = await ctx.stub.getState(courseId);
    return courseJSON && courseJSON.length > 0;
  }
}

module.exports = CourseContract;
