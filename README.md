# Mentora

A blockchain-powered humanitarian education platform designed to provide accessible education, verified digital credentials, and transparent scholarship funding for marginalized communities using Hyperledger Fabric technology.

## 🌍 Project Overview

**Mentora** is an innovative education platform that combines modern web technologies with blockchain transparency to solve critical problems in humanitarian education:

- **Credential Fraud Prevention**: Tamper-proof digital certificates stored on blockchain
- **Funding Transparency**: Track donor contributions and scholarship allocations in real-time
- **Education Access**: Reach marginalized communities including rural students, refugees, and informal learners
- **Cross-border Recognition**: Portable, verifiable credentials that work globally

## 🎯 Primary Beneficiaries

- Rural students without access to traditional education
- Refugees and displaced populations
- Informal learners lacking formal credentials
- Community educators
- NGOs and humanitarian organizations
- Donor foundations seeking transparent fund tracking

## 🛠️ Technology Stack

### Backend
- **Node.js/NestJS** - Backend API and microservices
- **Express.js** - API layer
- **Hyperledger Fabric SDK** - Blockchain integration
- **PostgreSQL** - Operational database
- **MongoDB** - Flexible content storage

### Blockchain Layer
- **Hyperledger Fabric** - Permissioned blockchain network
- **Smart Contracts (Chaincode)** - Go or JavaScript

### Frontend
- **React** - Web UI framework
- **Next.js** - SSR and performance optimization
- **React Native** - Mobile application

### Identity & Access
- **Hyperledger Indy** - Decentralized identity (future integration)
- **Keycloak** - Authentication

### Infrastructure
- **Docker** - Container orchestration
- **AWS/Azure/GCP** - Cloud hosting

## 🏗️ Project Structure

```
Mentora/
├── backend/                      # Node.js Backend API
│   ├── config/                   # Configuration files
│   │   ├── database.js          # Database connection
│   │   ├── fabricNetwork.js     # Fabric network config
│   │   └── environment.js       # Environment variables
│   ├── controllers/             # Request handlers
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── courseController.js
│   │   └── scholarshipController.js
│   ├── services/                # Business logic
│   │   ├── fabricService.js
│   │   ├── certificateService.js
│   │   └── scholarshipService.js
│   ├── routes/                  # API endpoints
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   └── scholarshipRoutes.js
│   ├── middleware/              # Express middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/                  # Data models
│   │   ├── studentModel.js
│   │   ├── courseModel.js
│   │   └── certificateModel.js
│   ├── utils/                   # Utility functions
│   │   ├── blockchainUtils.js
│   │   └── logger.js
│   ├── app.js
│   └── server.js
│
├── chaincode/                   # Hyperledger Fabric Smart Contracts
│   ├── credential-contract.js   # Certificate management
│   ├── scholarship-contract.js  # Scholarship tracking
│   ├── course-contract.js      # Course completion
│   └── index.js
│
├── frontend/                    # React Web Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── mobile/                      # React Native App
│   ├── src/
│   └── package.json
│
├── docker/                      # Docker configurations
│   ├── docker-compose.yml
│   ├── fabric/
│   └── backend/
│
└── docs/                        # Documentation
```

## 🌐 Hyperledger Fabric Network Architecture

### Participating Organizations
- **Education NGOs** - Community outreach and student management
- **Universities** - Course delivery and credential validation
- **Donor Foundations** - Scholarship funding and oversight
- **Government Education Bodies** - Quality assurance and recognition

### Network Components

```
Consortium
│
├── NGO Organization
│   ├── Peer Node
│   └── Certificate Authority
│
├── University Organization
│   ├── Peer Node
│   └── Certificate Authority
│
├── Donor Organization
│   └── Peer Node
│
└── Ordering Service
    └── Orderer Nodes
```

### Channels
- **Channel 1** - Academic Records (course completions, certificates)
- **Channel 2** - Scholarship Transactions (donations, allocations, impact)

### Smart Contracts (Chaincode)
- **Credential Contract** - Issue, verify, revoke certificates
- **Scholarship Contract** - Create, allocate, track scholarships
- **Course Completion Contract** - Record learning achievements

## ✨ Core Features

### 1️⃣ Blockchain Credential System
- Issue tamper-proof digital certificates
- Instant credential verification by employers/institutions
- Permanent academic records on blockchain
- Cross-border recognition of credentials

### 2️⃣ Student Identity for Marginalized Communities
- Blockchain-based student identity (DID wallet)
- Portable academic passport
- Complete learning history tracking
- Privacy-preserving data control

### 3️⃣ Scholarship & Donation Transparency
- Real-time tracking of donor contributions
- Transparent scholarship allocation
- Impact reporting and dashboards
- Transaction traceability on blockchain

### 4️⃣ Offline-First Learning
- Download courses for offline access
- Automatic sync when internet reconnects
- SMS-based notifications for areas with limited connectivity

### 5️⃣ Micro-Credential System
- Short, focused skill programs including:
  - Digital literacy
  - Agriculture technology
  - Solar installation
  - Entrepreneurship
- Each module generates blockchain-verifiable badges

### 6️⃣ Teacher Verification
- Verified teacher profiles on blockchain
- Qualification validation
- Teaching history and reviews

## 👥 Platform Modules

1. **Student Portal** - Course enrollment, progress tracking, certificate wallet
2. **Educator Portal** - Course creation, student assessments, credential issuance
3. **Donor Dashboard** - View project metrics, track funds, monitor outcomes
4. **NGO Admin Panel** - Student management, program oversight
5. **Blockchain Verification Portal** - Public credential verification

## 📚 Curriculum Focus Areas

### Digital Literacy
- Basic computer skills
- Internet navigation and safety
- Digital communication tools

### Financial Literacy
- Mobile money management
- Budgeting and savings
- Micro-enterprise basics

### Technology Skills
- Coding fundamentals
- Data literacy
- AI awareness and tools

### Local Livelihood Skills
- Climate-smart agriculture
- Renewable energy basics
- Small business management

### Civic Education
- Digital rights and privacy
- Community leadership
- Advocacy and civic engagement

## 🔄 Smart Contract Functions

### Credential Contract
```javascript
issueCertificate(studentID, courseID)    // Issue new certificate
verifyCertificate(hash)                 // Verify credential authenticity
revokeCertificate(certID)                // Revoke compromised certificate
```

### Scholarship Contract
```javascript
createScholarship(donorID, amount)       // Create new scholarship fund
allocateScholarship(studentID)          // Award scholarship to student
trackUsage(transactionID)               // Track fund utilization
```

### Student Identity Contract
```javascript
registerStudent(studentData)             // Register new student identity
updateLearningRecord()                  // Update academic history
verifyStudent()                         // Verify student credentials
```

## 📊 Database Schema (PostgreSQL/CouchDB)

### Students
- `id` - Unique identifier
- `name` - Full name
- `community` - Location/community
- `wallet_id` - Blockchain wallet identifier

### Courses
- `course_id` - Unique course identifier
- `title` - Course title
- `instructor` - Assigned educator
- `duration` - Course duration

### Certificates
- `certificate_id` - Unique certificate identifier
- `student_id` - Recipient student
- `blockchain_hash` - Hash on blockchain
- `issue_date` - Date of issuance

### Scholarships
- `donor_id` - Donor identifier
- `amount` - Fund amount
- `beneficiary_student` - Student recipient

## 🚀 Deployment Architecture

```
Cloud Infrastructure (AWS / Azure / GCP)
│
├── Docker Containers
│   ├── Node Backend (API + Business Logic)
│   ├── Fabric Peers (Blockchain Nodes)
│   ├── Ordering Nodes (Transaction Ordering)
│   ├── PostgreSQL (Operational Data)
│   └── Web Application (React Frontend)
```

## 📈 Impact Metrics for Donors

- Students enrolled and active
- Certificates issued and verified
- Scholarship funds distributed
- Employment/placement outcomes
- Gender inclusion metrics
- Community reach numbers

## 💰 Sustainability Model

**Revenue Streams:**
- Institutional licensing to NGOs/universities
- Certification verification fees for employers
- Training partnerships with businesses
- Government education program contracts

## 🎓 Sample Workflow

### Course Completion Flow
```
1. Student completes course
         ↓
2. Educator verifies assessment
         ↓
3. Node backend submits transaction to Fabric
         ↓
4. Chaincode executes and records certificate hash
         ↓
5. Student receives digital credential in wallet
         ↓
6. Employer can verify credential instantly
```

### Scholarship Flow
```
1. Donor contributes funds
         ↓
2. Transaction recorded on blockchain
         ↓
3. Scholarship pool updated on contract
         ↓
4. Student awarded scholarship
         ↓
5. Funds tracked throughout lifecycle
         ↓
6. Impact metrics published to donor dashboard
```

## 🔐 Security & Privacy

- **Permissioned Blockchain** - Only verified organizations can join the network
- **Private Channels** - Sensitive data isolated to relevant participants
- **Identity Verification** - Multi-factor authentication for all participants
- **Data Encryption** - All sensitive data encrypted at rest and in transit
- **Audit Trail** - Complete transaction history on blockchain

## 🤝 Contributing

We welcome contributions from developers, educators, and humanitarian organizations. Please contact us to get involved.

## 📄 License

See LICENSE file for details.

## 📞 Contact

For inquiries, partnerships, or more information, please reach out to our team.

---

**Mentora** - Empowering marginalized communities through transparent, accessible, and verifiable education. 🌍📚
