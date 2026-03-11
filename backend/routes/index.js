const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const studentRoutes = require('./student.routes');
const courseRoutes = require('./course.routes');
const scholarshipRoutes = require('./scholarship.routes');
const verificationRoutes = require('./verification.routes');
const ngoRoutes = require('./ngo.routes');

// Mount route modules
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/scholarships', scholarshipRoutes);
router.use('/verify', verificationRoutes);
router.use('/ngos', ngoRoutes);

module.exports = router;
