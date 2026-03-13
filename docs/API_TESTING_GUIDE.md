# Mentora API Testing Guide

This guide provides comprehensive instructions for testing the Mentora API endpoints using Insomnia or Postman.

## Prerequisites

1. **Node.js and npm** installed
2. **Insomnia** or **Postman** application installed
3. **Hyperledger Fabric network** running (for blockchain operations)

---

## What's New in RBAC Implementation

This guide has been updated to reflect the latest RBAC (Role-Based Access Control) implementation:

- ✅ **Email-based authentication** (replaced staffId-based login)
- ✅ **Three user roles**: ADMIN, NGO, STUDENT
- ✅ **Public certificate verification** (no authentication required)
- ✅ **NGO management** endpoints
- ✅ **Owner tracking** for scholarships

For complete RBAC documentation, see [RBAC_API_DOCUMENTATION.md](RBAC_API_DOCUMENTATION.md).

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

### User Roles and Sample Credentials

The Mentora platform supports three user roles:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **ADMIN** | admin@mentora.org | admin123 | System administrator with full access |
| **NGO** | ngo@scholars-fund.org | ngo123 | NGO/Sponsor managing scholarships |
| **NGO** | education@hope-foundation.org | ngo123 | Another NGO/Sponsor |
| **STUDENT** | student1@university.edu | student123 | Student user |
| **STUDENT** | student2@university.edu | student123 | Another student |

### 1. Login

Authenticate with the system to receive a JWT token.

```
POST http://localhost:4000/api/auth/login
```

#### Request Body:
```json
{
  "email": "admin@mentora.org",
  "password": "admin123"
}
```

#### Expected Response (200 OK) - ADMIN user:
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "ADMIN001",
      "email": "admin@mentora.org",
      "name": "System Admin",
      "role": "ADMIN",
      "organization": "Mentora Platform",
      "studentId": "",
      "branchId": ""
    },
    "ngo": null,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Expected Response (200 OK) - NGO user:
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "NGO001",
      "email": "ngo@scholars-fund.org",
      "name": "Scholars Fund NGO",
      "role": "NGO",
      "organization": "Scholars Fund",
      "studentId": "",
      "branchId": ""
    },
    "ngo": {
      "ngoId": "NGO001",
      "name": "Scholars Fund NGO",
      "email": "ngo@scholars-fund.org",
      "registrationNumber": "NGB/2024/001",
      "description": "Providing scholarships to underprivileged students",
      "country": "Kenya",
      "status": "Active"
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
      "userId": "ADMIN001",
      "email": "admin@mentora.org",
      "name": "System Admin",
      "role": "ADMIN"
    }
  }
}
```

### 3. Get Profile

Get current user profile (requires authentication).

```
GET http://localhost:4000/api/auth/profile
```

#### Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "NGO001",
      "email": "ngo@scholars-fund.org",
      "name": "Scholars Fund NGO",
      "role": "NGO",
      "organization": "Scholars Fund"
    },
    "ngo": {
      "ngoId": "NGO001",
      "name": "Scholars Fund NGO",
      "registrationNumber": "NGB/2024/001",
      "status": "Active"
    }
  }
}
```

### 4. Logout

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

## Public Certificate Verification

### Verify Certificate (No Authentication Required)

This is a public endpoint that can be accessed without authentication - perfect for certificate sharing links.

```
GET http://localhost:4000/api/verify/{certId}
```

#### Example:
```
GET http://localhost:4000/api/verify/CERT1234567890ABCD
```

#### Expected Response (200 OK) - Valid Certificate:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "certificate": {
      "certificateId": "CERT1234567890ABCD",
      "studentName": "John Student",
      "courseName": "Blockchain Fundamentals",
      "courseCode": "BCS101",
      "instructorName": "Dr. Alice",
      "issueDate": "2024-03-01",
      "expirationDate": "2025-03-01",
      "certificateType": "Course Completion",
      "issuerOrg": "Mentora University",
      "status": "Active"
    },
    "verifiedAt": "2024-03-11T10:30:00.000Z"
  }
}
```

#### Expected Response (200 OK) - Invalid Certificate:
```json
{
  "success": true,
  "data": {
    "valid": false,
    "reason": "Certificate has expired",
    "certificate": {
      "certificateId": "CERT1234567890ABCD",
      "studentName": "John Student",
      "courseName": "Blockchain Fundamentals",
      "courseCode": "BCS101",
      "instructorName": "Dr. Alice",
      "issueDate": "2024-03-01",
      "expirationDate": "2024-01-01",
      "certificateType": "Course Completion",
      "issuerOrg": "Mentora University",
      "status": "Active"
    },
    "verifiedAt": "2024-03-11T10:30:00.000Z"
  }
}
```

**Note:** Certificates can be invalid for the following reasons:
- `"Certificate has expired"` - The expiration date has passed
- `"Certificate has been revoked"` - The status is "Revoked"

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

### 1. Create Course (ADMIN only)

Create a new course in the system.

```
POST http://localhost:4000/api/courses
```

**Required Role:** ADMIN

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

## NGO Endpoints

### 1. Get All NGOs (Public)

Retrieve all registered NGOs.

```
GET http://localhost:4000/api/ngos
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "ngoId": "NGO001",
      "name": "Scholars Fund NGO",
      "email": "ngo@scholars-fund.org",
      "registrationNumber": "NGB/2024/001",
      "description": "Providing scholarships to underprivileged students",
      "country": "Kenya",
      "status": "Active"
    },
    {
      "ngoId": "NGO002",
      "name": "Hope Foundation",
      "email": "education@hope-foundation.org",
      "registrationNumber": "NGB/2024/002",
      "description": "Empowering youth through education",
      "country": "Kenya",
      "status": "Active"
    }
  ]
}
```

### 2. Get NGO by ID (Public)

```
GET http://localhost:4000/api/ngos/{ngoId}
```

#### Example:
```
GET http://localhost:4000/api/ngos/NGO001
```

### 3. Get Current NGO Profile (NGO, ADMIN only)

Get the profile of the currently authenticated NGO user.

```
GET http://localhost:4000/api/ngos/profile/me
```

**Required Role:** NGO or ADMIN

#### Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

#### Expected Response (200 OK):
```json
{
  "success": true,
  "data": {
    "ngoId": "NGO001",
    "name": "Scholars Fund NGO",
    "email": "ngo@scholars-fund.org",
    "phone": "+254-700-123-456",
    "address": "123 Education Street, Nairobi",
    "registrationNumber": "NGB/2024/001",
    "description": "Providing scholarships to underprivileged students",
    "country": "Kenya",
    "region": "East Africa",
    "contactPerson": "Mary Johnson",
    "contactEmail": "mary@scholars-fund.org",
    "website": "https://scholars-fund.org",
    "status": "Active"
  }
}
```

---

## Scholarship Endpoints

All scholarship endpoints require authentication.

### 1. Create Scholarship Fund (NGO, ADMIN only)

Create a new scholarship fund. The system automatically tracks the owner information from your authentication token.

```
POST http://localhost:4000/api/scholarships/funds
```

**Required Role:** NGO or ADMIN

#### Request Body:
```json
{
  "fundId": "FUND001",
  "fundName": "Excellence Scholarship",
  "description": "Scholarship for outstanding academic performance",
  "donorId": "NGO001",
  "donorName": "Scholars Fund NGO",
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
    "ownerId": "NGO001",
    "ownerName": "Scholars Fund NGO",
    "ownerEmail": "ngo@scholars-fund.org",
    "ownerRole": "NGO",
    "ownerOrganization": "Scholars Fund",
    "status": "Active"
  }
}
```

**Note:** The `ownerId`, `ownerName`, `ownerEmail`, `ownerRole`, and `ownerOrganization` fields are automatically populated from the authenticated user.

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
  "error": "No authentication token provided"
}
```
OR
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

## RBAC (Role-Based Access Control) Guide

### Understanding Roles

| Role | Description | Can Create | Can View | Can Edit | Can Delete |
|------|-------------|------------|----------|----------|------------|
| **ADMIN** | Full system access | All resources | All resources | All resources | All resources |
| **NGO** | Manages scholarships | Scholarship funds, donations | Funds, courses, certificates | Funds, allocations | N/A |
| **STUDENT** | Learner and recipient | N/A | Courses, certificates, own data | N/A | N/A |

### Role-Based Endpoint Access

#### Scholarship Endpoints

| Endpoint | Create | View | Update/Delete |
|----------|--------|------|----------------|
| `/api/scholarships/funds` (POST) | NGO, ADMIN | - | - |
| `/api/scholarships/funds` (GET) | - | All roles | - |
| `/api/scholarships/donations` (POST) | NGO, ADMIN, STUDENT | - | - |
| `/api/scholarships/allocate` (POST) | NGO, ADMIN | - | - |
| `/api/scholarships/disburse/:id` (POST) | NGO, ADMIN, STUDENT | - | - |

#### Course Endpoints

| Endpoint | Create | View | Update |
|----------|--------|------|--------|
| `/api/courses` (POST) | ADMIN | - | - |
| `/api/courses` (GET) | - | All roles | - |
| `/api/courses/enroll` (POST) | STUDENT, ADMIN, NGO | - | - |
| `/api/courses/complete` (POST) | ADMIN, NGO | - | - |
| `/api/courses/{id}/students/{sid}/progress` (PUT) | STUDENT, ADMIN, NGO | - | - |

### Testing Role-Based Access

To test RBAC:

1. **Login as different roles** using the sample credentials
2. **Copy the JWT token** from each login response
3. **Test endpoints** with different role tokens
4. **Verify access restrictions** - you should get 403 Forbidden when trying to access endpoints your role doesn't have permission for

**Example Testing Flow:**

```bash
# Test 1: Try to create a course as STUDENT (should fail)
curl -X POST http://localhost:4000/api/courses \
  -H "Authorization: Bearer STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...course data...}'

# Expected: 403 Forbidden

# Test 2: Try to create a course as ADMIN (should succeed)
curl -X POST http://localhost:4000/api/courses \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...course data...}'

# Expected: 201 Created

# Test 3: Try to create a scholarship fund as STUDENT (should fail)
curl -X POST http://localhost:4000/api/scholarships/funds \
  -H "Authorization: Bearer STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...fund data...}'

# Expected: 403 Forbidden

# Test 4: Try to create a scholarship fund as NGO (should succeed)
curl -X POST http://localhost:4000/api/scholarships/funds \
  -H "Authorization: Bearer NGO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...fund data...}'

# Expected: 201 Created with owner tracking
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

---

## Additional Documentation

- **[RBAC API Documentation](RBAC_API_DOCUMENTATION.md)** - Complete guide to Role-Based Access Control, user roles, and permissions
- **[Network Configuration](NETWORK_CONFIGURATION.md)** - Hyperledger Fabric network setup and configuration
- **[Chaincode Testing](CHAINCODE_TESTING.md)** - Testing blockchain smart contracts

---

## Quick Start Testing Guide

### Step 1: Start the Server

```bash
cd backend
npm start
```

### Step 2: Login (Get a Token)

Use one of the sample credentials:

```bash
# As Admin
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mentora.org","password":"admin123"}'

# As NGO
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ngo@scholars-fund.org","password":"ngo123"}'

# As Student
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student1@university.edu","password":"student123"}'
```

### Step 3: Use the Token

Copy the `token` from the login response and use it in subsequent requests:

```bash
curl http://localhost:4000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Step 4: Test Public Certificate Verification

No token required:

```bash
curl http://localhost:4000/api/verify/CERT1234567890ABCD
```

### Step 5: Test Role-Based Access

Try creating a scholarship fund as different users to see RBAC in action:

```bash
# As NGO (should succeed)
curl -X POST http://localhost:4000/api/scholarships/funds \
  -H "Authorization: Bearer NGO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fundId":"FUND001","fundName":"Test Fund","donorId":"NGO001","donorName":"Test NGO","initialAmount":1000,"currency":"USD","allocationYear":"2026","eligibilityCriteria":{}}'

# As Student (should fail with 403)
curl -X POST http://localhost:4000/api/scholarships/funds \
  -H "Authorization: Bearer STUDENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fundId":"FUND002","fundName":"Test Fund","donorId":"STU001","donorName":"Test Student","initialAmount":1000,"currency":"USD","allocationYear":"2026","eligibilityCriteria":{}}'
```
