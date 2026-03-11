# Mentora API Testing Guide

This guide provides comprehensive instructions for testing the Mentora API endpoints using Insomnia or Postman.

## Prerequisites

1. **Node.js and npm** installed
2. **Insomnia** or **Postman** application installed
3. **Hyperledger Fabric network** running (for blockchain operations)

## Getting Started

### Starting the API Server

Navigate to the backend directory and start the server:

```bash
cd backend
npm start
```

The server will start on `http://localhost:4000`

### Health Check

Before testing any endpoints, verify the server is running:

```
GET http://localhost:4000/health
```

Expected Response:
```json
{
  "status": "ok",
  "service": "Mentora API",
  "version": "2.0.0",
  "timestamp": "2026-03-11T08:00:00.000Z"
}
```

---

## Base URL

All API endpoints use the base URL:
```
http://localhost:4000/api
```

---

## Authentication

### 1. Login

Authenticate with the system to receive a JWT token.

```
POST http://localhost:4000/api/auth/login
```

#### Request Body:
```json
{
  "staffId": "STAFF001",
  "password": "password123"
}
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "STAFF001",
      "name": "John Doe",
      "branchId": "BRANCH001",
      "role": "MANAGER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Important:** Copy the `token` value from the response. You'll need it for authenticated requests.

#### Using the Token in Insomnia/Postman:
- **Header Name:** `Authorization`
- **Header Value:** `Bearer YOUR_TOKEN_HERE`

### 2. Verify Token

Check if a token is still valid.

```
POST http://localhost:4000/api/auth/verify
```

#### Request Body:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "STAFF001",
      "name": "John Doe",
      "role": "MANAGER"
    }
  }
}
```

### 3. Logout

```
POST http://localhost:4000/api/auth/logout
```

**Note:** Since JWT is stateless, the logout is handled on the client side by removing the stored token.

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

## Student Endpoints

All student endpoints require authentication.

### 1. Get Student Certificates

Retrieve all certificates for a specific student.

```
GET http://localhost:4000/api/students/{studentId}/certificates
```

#### Example:
```
GET http://localhost:4000/api/students/STU123456/certificates
```

#### Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "certificateId": "CERT001",
      "studentId": "STU123456",
      "studentName": "Alice Johnson",
      "courseCode": "CS101",
      "courseName": "Introduction to Programming",
      "instructorName": "Dr. Smith",
      "issueDate": "2026-01-15",
      "expirationDate": "2028-01-15",
      "status": "Active"
    }
  ]
}
```

### 2. Get Student Enrollments

Retrieve all course enrollments for a student.

```
GET http://localhost:4000/api/students/{studentId}/enrollments
```

#### Example:
```
GET http://localhost:4000/api/students/STU123456/enrollments
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "enrollmentId": "ENR001",
      "courseId": "CRS001",
      "studentId": "STU123456",
      "studentName": "Alice Johnson",
      "enrollDate": "2026-03-01",
      "progress": 75,
      "status": "Active"
    }
  ]
}
```

### 3. Get Student Scholarships

Retrieve all scholarships awarded to a student.

```
GET http://localhost:4000/api/students/{studentId}/scholarships
```

#### Example:
```
GET http://localhost:4000/api/students/STU123456/scholarships
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "allocationId": "SCH001",
      "fundId": "FUND001",
      "studentId": "STU123456",
      "studentName": "Alice Johnson",
      "amount": 5000,
      "currency": "USD",
      "status": "Disbursed"
    }
  ]
}
```

### 4. Verify Student Certificate

Verify the authenticity of a certificate.

```
GET http://localhost:4000/api/students/{studentId}/verify/{certificateId}
```

#### Example:
```
GET http://localhost:4000/api/students/STU123456/verify/CERT001
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "valid": true,
    "certificate": {
      "certificateId": "CERT001",
      "status": "Active"
    }
  }
}
```

### 5. Get Student Profile

Get complete student profile with all blockchain data.

```
GET http://localhost:4000/api/students/{studentId}/profile
```

#### Example:
```
GET http://localhost:4000/api/students/STU123456/profile
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "studentId": "STU123456",
    "certificates": [...],
    "enrollments": [...],
    "scholarships": [...],
    "statistics": {
      "totalCertificates": 3,
      "totalEnrollments": 5,
      "totalScholarships": 1
    }
  }
}
```

### 6. Get Specific Certificate

Retrieve a specific certificate by ID.

```
GET http://localhost:4000/api/students/certificates/{certificateId}
```

#### Example:
```
GET http://localhost:4000/api/students/certificates/CERT001
```

---

## Course Endpoints

All course endpoints require authentication.

### 1. Create Course

Create a new course in the system.

```
POST http://localhost:4000/api/courses
```

#### Request Body:
```json
{
  "courseId": "CRS001",
  "courseCode": "CS101",
  "title": "Introduction to Computer Science",
  "description": "Fundamental concepts of computer science and programming",
  "instructorId": "INST001",
  "instructorName": "Dr. John Smith",
  "category": "Computer Science",
  "duration": "12 weeks",
  "skillLevel": "Beginner",
  "issuerOrg": "University of Tech"
}
```

#### Expected Response (201 Created):
```json
{
  "success": true,
  "data": {
    "courseId": "CRS001",
    "courseCode": "CS101",
    "title": "Introduction to Computer Science",
    "status": "Created"
  }
}
```

### 2. Get All Courses

Retrieve all available courses.

```
GET http://localhost:4000/api/courses
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "courseId": "CRS001",
      "courseCode": "CS101",
      "title": "Introduction to Computer Science",
      "category": "Computer Science",
      "skillLevel": "Beginner"
    }
  ]
}
```

### 3. Get Course by ID

```
GET http://localhost:4000/api/courses/{courseId}
```

#### Example:
```
GET http://localhost:4000/api/courses/CRS001
```

### 4. Get Course by Code

```
GET http://localhost:4000/api/courses/code/{courseCode}
```

#### Example:
```
GET http://localhost:4000/api/courses/code/CS101
```

### 5. Get Courses by Category

```
GET http://localhost:4000/api/courses/category/{category}
```

#### Example:
```
GET http://localhost:4000/api/courses/category/Computer%20Science
```

### 6. Enroll Student in Course

Enroll a student in a course.

```
POST http://localhost:4000/api/courses/enroll
```

#### Request Body:
```json
{
  "enrollmentId": "ENR001",
  "courseId": "CRS001",
  "studentId": "STU123456",
  "studentName": "Alice Johnson",
  "enrollDate": "2026-03-11"
}
```

#### Expected Response (201 Created):
```json
{
  "success": true,
  "data": {
    "enrollmentId": "ENR001",
    "status": "Enrolled"
  }
}
```

### 7. Update Student Progress

Update a student's progress in a course.

```
PUT http://localhost:4000/api/courses/{courseId}/students/{studentId}/progress
```

#### Example:
```
PUT http://localhost:4000/api/courses/CRS001/students/STU123456/progress
```

#### Request Body:
```json
{
  "progress": 75,
  "modulesCompleted": [
    "Module 1: Introduction",
    "Module 2: Fundamentals",
    "Module 3: Advanced Concepts"
  ]
}
```

### 8. Record Course Completion

Record that a student has completed a course.

```
POST http://localhost:4000/api/courses/complete
```

#### Request Body:
```json
{
  "courseId": "CRS001",
  "studentId": "STU123456",
  "completionDate": "2026-03-11",
  "finalScore": 95,
  "assessorId": "INST001"
}
```

### 9. Get Course Enrollments

Get all enrollments for a specific course.

```
GET http://localhost:4000/api/courses/{courseId}/enrollments
```

#### Example:
```
GET http://localhost:4000/api/courses/CRS001/enrollments
```

### 10. Get Course Certificates

Get all certificates issued for a course.

```
GET http://localhost:4000/api/courses/{courseId}/certificates
```

#### Example:
```
GET http://localhost:4000/api/courses/CRS001/certificates
```

### 11. Get Course Statistics

Retrieve course statistics.

```
GET http://localhost:4000/api/courses/statistics
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalCourses": 10,
    "totalEnrollments": 150,
    "totalCompletions": 75,
    "averageCompletionRate": 50
  }
}
```

---

## Scholarship Endpoints

All scholarship endpoints require authentication.

### 1. Create Scholarship Fund

Create a new scholarship fund.

```
POST http://localhost:4000/api/scholarships/funds
```

#### Request Body:
```json
{
  "fundId": "FUND001",
  "fundName": "Excellence Scholarship",
  "description": "Scholarship for outstanding academic performance",
  "donorId": "DON001",
  "donorName": "Tech Foundation",
  "initialAmount": 50000,
  "currency": "USD",
  "allocationYear": "2026",
  "eligibilityCriteria": {
    "minGPA": 3.5,
    "program": "Computer Science",
    "yearLevel": "Sophomore"
  }
}
```

#### Expected Response (201 Created):
```json
{
  "success": true,
  "data": {
    "fundId": "FUND001",
    "fundName": "Excellence Scholarship",
    "status": "Active"
  }
}
```

### 2. Get All Scholarship Funds

```
GET http://localhost:4000/api/scholarships/funds
```

### 3. Get Fund by ID

```
GET http://localhost:4000/api/scholarships/funds/{fundId}
```

#### Example:
```
GET http://localhost:4000/api/scholarships/funds/FUND001
```

### 4. Get Funds by Donor

```
GET http://localhost:4000/api/scholarships/funds/donor/{donorId}
```

#### Example:
```
GET http://localhost:4000/api/scholarships/funds/donor/DON001
```

### 5. Get Funds by Year

```
GET http://localhost:4000/api/scholarships/funds/year/{year}
```

#### Example:
```
GET http://localhost:4000/api/scholarships/funds/year/2026
```

### 6. Create Donation

Record a donation to a scholarship fund.

```
POST http://localhost:4000/api/scholarships/donations
```

#### Request Body:
```json
{
  "donationId": "DONN001",
  "fundId": "FUND001",
  "donorId": "DON001",
  "donorName": "Tech Foundation",
  "amount": 10000,
  "currency": "USD",
  "donationDate": "2026-03-11",
  "transactionReference": "TXN123456789"
}
```

### 7. Get Donation by ID

```
GET http://localhost:4000/api/scholarships/donations/{donationId}
```

### 8. Get Donations by Fund

```
GET http://localhost:4000/api/scholarships/funds/{fundId}/donations
```

#### Example:
```
GET http://localhost:4000/api/scholarships/funds/FUND001/donations
```

### 9. Allocate Scholarship

Allocate a scholarship to a student.

```
POST http://localhost:4000/api/scholarships/allocate
```

#### Request Body:
```json
{
  "allocationId": "ALC001",
  "fundId": "FUND001",
  "studentId": "STU123456",
  "studentName": "Alice Johnson",
  "amount": 5000,
  "currency": "USD",
  "allocationDate": "2026-03-11",
  "allocatedBy": "INST001",
  "reason": "Outstanding academic performance"
}
```

### 10. Disburse Scholarship

Disburse scholarship funds to a student.

```
POST http://localhost:4000/api/scholarships/disburse/{allocationId}
```

#### Example:
```
POST http://localhost:4000/api/scholarships/disburse/ALC001
```

#### Request Body:
```json
{
  "disbursementDate": "2026-03-12",
  "disbursementReference": "REF987654321",
  "disbursementMethod": "Bank Transfer"
}
```

### 11. Get Fund Allocations

Get all allocations for a specific fund.

```
GET http://localhost:4000/api/scholarships/funds/{fundId}/allocations
```

#### Example:
```
GET http://localhost:4000/api/scholarships/funds/FUND001/allocations
```

### 12. Get Scholarship Statistics

Retrieve overall scholarship statistics.

```
GET http://localhost:4000/api/scholarships/statistics
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalFunds": 15,
    "totalDonations": 250000,
    "totalAllocations": 100000,
    "pendingDisbursements": 20000
  }
}
```

---

## Error Responses

All endpoints follow a consistent error response format:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid or missing required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Access denied. Required role(s): MANAGER"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Testing Tips

### Setting Up Insomnia

1. Create a new Collection called "Mentora API"
2. Set the Base URL to: `http://localhost:4000/api`
3. Create a folder structure:
   - Authentication
   - Students
   - Courses
   - Scholarships

### Setting Up Headers in Insomnia

Create an environment variable for your token:
- **Variable Name:** `token`
- **Value:** `YOUR_JWT_TOKEN_HERE`

Then add a header to all requests:
- **Header Name:** `Authorization`
- **Header Value:** `Bearer {{token}}`

### Setting Up Postman

1. Create a new Collection called "Mentora API"
2. Set the Base URL to: `http://localhost:4000/api`
3. Create folders for each endpoint group
4. Add the `Authorization` header with `Bearer` token to all authenticated requests

### Common Issues

#### "No authentication token provided"
- Make sure you've logged in and copied the token
- Ensure the `Authorization` header is set with `Bearer` prefix

#### "Invalid or expired token"
- Token expires after 24 hours
- Login again to get a new token

#### "Route not found"
- Check the URL path
- Ensure the base URL is correct

---

## API Documentation Endpoint

For a quick reference of all available endpoints, visit:

```
GET http://localhost:4000/api
```

This returns a JSON with all available endpoints organized by category.
