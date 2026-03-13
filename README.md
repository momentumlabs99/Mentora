# Mentora

A blockchain-powered education platform providing accessible learning, verified digital credentials, and transparent scholarship funding for marginalized communities using Hyperledger Fabric technology.

## 🌍 About

**Mentora** combines modern web technologies with blockchain transparency to solve critical problems in humanitarian education:

- **Credential Fraud Prevention** - Tamper-proof digital certificates stored on blockchain
- **Funding Transparency** - Track donor contributions and scholarship allocations in real-time
- **Education Access** - Reach marginalized communities including rural students, refugees, and informal learners
- **Cross-border Recognition** - Portable, verifiable credentials that work globally

## 🏗️ Project Structure

```
Mentora/
├── backend/                      # Node.js Backend API
│   ├── app.js                    # Express application entry point
│   ├── server.js                 # Server configuration
│   ├── config/                   # Configuration files
│   │   └── fabric.config.js     # Fabric network configuration
│   ├── controllers/              # Request handlers (empty - to be implemented)
│   │   ├── auth.controller.js
│   │   ├── student.controller.js
│   │   ├── course.controller.js
│   │   └── scholarship.controller.js
│   ├── middleware/               # Express middleware (empty - to be implemented)
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/                   # Data models (empty - to be implemented)
│   │   ├── student.model.js
│   │   ├── course.model.js
│   │   └── certificate.model.js
│   ├── routes/                   # API endpoints (empty - to be implemented)
│   │   ├── auth.routes.js
│   │   ├── student.routes.js
│   │   ├── course.routes.js
│   │   └── scholarship.routes.js
│   ├── services/                 # Business logic
│   │   ├── auth.service.js
│   │   ├── db.service.js
│   │   ├── jwt.service.js
│   │   └── ledger-gateway.service.js    # Fabric SDK integration
│   ├── utils/                    # Utility functions
│   │   ├── blockchainUtils.js
│   │   ├── id.util.js
│   │   ├── logger.js
│   │   └── response.util.js
│   └── package.json
│
├── chaincode/                   # Hyperledger Fabric Smart Contracts
│   ├── credential-contract.js      # Certificate management
│   ├── course-contract.js         # Course management
│   ├── scholarship-contract.js    # Scholarship tracking
│   ├── index.js                 # Chaincode entry point
│   └── package.json
│
├── frontend/                    # React Web Application
│   └── package.json
│
├── docker/                      # Docker configurations
│   ├── docker-compose.yml
│   ├── backend/
│   └── fabric/
│
└── docs/                        # Documentation
     ├── CHAINCODE_TESTING.md      # Chaincode testing guide
     ├── ARCHITECTURE.md          # System architecture (to be created)
     └── API.md                  # API documentation (to be created)
```

## 📚 Documentation

- **[CHAINCODE_TESTING.md](docs/CHAINCODE_TESTING.md)** - Chaincode deployment and CLI testing guide
- **[NETWORK_CONFIGURATION.md](docs/NETWORK_CONFIGURATION.md)** - Fabric network setup, channels, and organization configuration
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture and design
- **[API.md](docs/API.md)** - API endpoints and usage
- **[structure.md](structure.md)** - Detailed technical specifications

## 🛠️ Technology Stack

### Backend
- Node.js/Express.js - API server
- Hyperledger Fabric SDK - Blockchain integration
- PostgreSQL/MongoDB - Data storage

### Blockchain
- Hyperledger Fabric - Permissioned blockchain network
- JavaScript Chaincode - Smart contracts

### Frontend
- React/Web - Platform interface
- Next.js - SSR and optimization

### Infrastructure
- Docker - Container orchestration
- AWS/Azure/GCP - Cloud hosting

## 🚀 Quick Start

### Prerequisites

```
- Node.js >= 14.0.0
- Docker & Docker Compose
- Hyperledger Fabric test network
```

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/mentora.git
cd mentora

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install chaincode dependencies
cd ../chaincode
npm install
```

### Setup Fabric Network

```bash
# Navigate to test network
cd /path/to/fabric-samples/test-network

# Start network
./network.sh up
./network.sh createChannel
```

### Deploy Chaincode

See [Chaincode Testing Guide](docs/CHAINCODE_TESTING.md) for detailed deployment instructions.

```bash
cd /path/to/fabric-samples/test-network

# Package chaincode
peer lifecycle chaincode package mentora.tar.gz \
  --path ../../mentora/chaincode \
  --lang node \
  --label mentora_1.0

# Install and approve (see full guide)
```

### Start Application

```bash
# Start backend server
cd backend
npm start

# Start frontend development server
cd frontend
npm run dev
```

## 🌐 Network Architecture

### Participating Organizations
- Education NGOs - Community outreach and student management
- Universities - Course delivery and credential validation
- Donor Foundations - Scholarship funding and oversight
- Government Education Bodies - Quality assurance and recognition

### Channels
- **Channel 1** - Academic Records (course completions, certificates)
- **Channel 2** - Scholarship Transactions (donations, allocations, impact)

### Smart Contracts
- **Credential Contract** - Issue, verify, revoke certificates
- **Scholarship Contract** - Create, allocate, track scholarships
- **Course Contract** - Record learning achievements

## 📖 Documentation Index

- **[CHAINCODE_TESTING.md](docs/CHAINCODE_TESTING.md)** - Complete chaincode testing and CLI commands
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture and component design
- **[API.md](docs/API.md)** - Backend API endpoints and usage

## 🤝 Contributing

We welcome contributions from developers, educators, and humanitarian organizations. Please read our contribution guidelines before submitting pull requests.

## 📄 License

See [LICENSE](LICENSE) file for details.

## 📞 Contact

For inquiries, partnerships, or more information, please reach out to our team.

---

**Mentora** - Empowering marginalized communities through transparent, accessible, and verifiable education. 🌍📚
