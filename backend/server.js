const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", routes);

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    service: "Mentora API",
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Mentora API - Blockchain Educational Platform",
    version: "2.0.0",
    endpoints: {
      auth: {
        base: "/api/auth",
        login: "POST /api/auth/login",
        logout: "POST /api/auth/logout",
        verify: "POST /api/auth/verify"
      },
      students: {
        base: "/api/students",
        certificates: "GET /api/students/:studentId/certificates",
        enrollments: "GET /api/students/:studentId/enrollments",
        scholarships: "GET /api/students/:studentId/scholarships",
        profile: "GET /api/students/:studentId/profile",
        verifyCertificate: "GET /api/students/:studentId/verify/:certificateId"
      },
      courses: {
        base: "/api/courses",
        all: "GET /api/courses",
        byId: "GET /api/courses/:courseId",
        byCode: "GET /api/courses/code/:courseCode",
        byCategory: "GET /api/courses/category/:category",
        create: "POST /api/courses",
        enroll: "POST /api/courses/enroll",
        progress: "PUT /api/courses/:courseId/students/:studentId/progress",
        complete: "POST /api/courses/complete",
        statistics: "GET /api/courses/statistics",
        enrollments: "GET /api/courses/:courseId/enrollments",
        certificates: "GET /api/courses/:courseId/certificates"
      },
      scholarships: {
        base: "/api/scholarships",
        funds: "GET /api/scholarships/funds",
        fundById: "GET /api/scholarships/funds/:fundId",
        createFund: "POST /api/scholarships/funds",
        fundsByDonor: "GET /api/scholarships/funds/donor/:donorId",
        fundsByYear: "GET /api/scholarships/funds/year/:year",
        createDonation: "POST /api/scholarships/donations",
        donationById: "GET /api/scholarships/donations/:donationId",
        donationsByFund: "GET /api/scholarships/funds/:fundId/donations",
        allocate: "POST /api/scholarships/allocate",
        disburse: "POST /api/scholarships/disburse/:allocationId",
        statistics: "GET /api/scholarships/statistics"
      }
    }
  });
});

// 404 handler (must be after all routes)
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║          🚀 Mentora API Server Started                 ║
║                                                        ║
║          Blockchain Educational Platform               ║
║          Hyperledger Fabric Integration               ║
║                                                        ║
║          Server: http://localhost:${PORT}               ║
║          API Docs: http://localhost:${PORT}/api           ║
║          Health: http://localhost:${PORT}/health          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
