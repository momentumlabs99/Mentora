# Mentora Chaincode Testing Guide

This guide provides step-by-step instructions for deploying and testing the Mentora chaincode on Hyperledger Fabric using CLI commands.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Network Setup](#network-setup)
3. [Chaincode Deployment](#chaincode-deployment)
4. [Chaincode Installation](#chaincode-installation)
5. [Chaincode Instantiation](#chaincode-instantiation)
6. [Testing Credential Contract](#testing-credential-contract)
7. [Testing Course Contract](#testing-course-contract)
8. [Testing Scholarship Contract](#testing-scholarship-contract)
9. [Querying Data](#querying-data)
10. [Error Handling](#error-handling)
11. [Common Issues](#common-issues)

---

## Prerequisites

Ensure you have the following installed:

- Hyperledger Fabric test network or production network running
- Fabric CLI tools (`fabric-ca-client`, `fabric-ccenv`, etc.)
- Docker and Docker Compose (for test network)
- Basic understanding of Hyperledger Fabric concepts

### Verify Network Status

```bash
# Check if Fabric network is running
docker ps

# You should see running containers for:
# - Orderer
# - Peers (peer0.org1.example.com, peer0.org2.example.com, etc.)
# - CA servers
# - CouchDB (if configured)
```

### Set Environment Variables

```bash
# Core peer settings
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export CORE_CHAINCODE_NODE_TLS_TRUSTCERTS=/etc/hyperledger/fabric/peer/tls/ca.crt

# Channel name
export CHANNEL_NAME="mychannel"

# Chaincode name
export CHAINCODE_NAME="mentora"
export CHAINCODE_VERSION="1.0"
export CHAINCODE_SEQUENCE="1"
```

---

## Network Setup

If you don't have a Fabric network running, start the test network:

```bash
cd /path/to/fabric-samples/test-network
./network.sh down          # Clean up previous network
./network.sh up            # Start network
./network.sh createChannel  # Create a channel (default: mychannel)

# Deploy the CCA (Certificate Authority) if needed
```

---

## Chaincode Deployment

### 1. Package the Chaincode

```bash
# Navigate to testnetwork directory
cd fabric-samples/test-network

# Package the chaincode
peer lifecycle chaincode package \
  mentora.tar.gz \
  --path ../../mentora/chaincode \
  --lang node \
  --label mentora_1.0

# Verify package was created
ls -lh mentora.tar.gz
```

### 2. Install Chaincode on Peers

#### On Org1 Peer

```bash
# Set environment for Org1
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp

# Install on peer0.org1
peer lifecycle chaincode install \
  mentora.tar.gz

# Verify installation
peer lifecycle chaincode queryinstalled

# Note the package ID from the output, e.g.:
# Package ID: mentora_1.0:a7f7e6b7c3d2e8f0a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d
```

#### On Org2 Peer (if applicable)

```bash
# Set environment for Org2
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_ADDRESS=localhost:9051
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp

# Install on peer0.org2
peer lifecycle chaincode install \
  mentora.tar.gz

# Verify installation
peer lifecycle chaincode queryinstalled
```

---

## Chaincode Installation

### Approve Chaincode for Organizations

#### Approve for Org1

```bash
# Set environment for Org1
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp

# Approve the chaincode (replace PACKAGE_ID with the actual ID from queryinstalled)
peer lifecycle chaincode approveformyorg \
  --channelID $CHANNEL_NAME \
  --name mentora \
  --version 1.0 \
  --sequence 1 \
  --package-id mentora_1.0:a7f7e6b7c3d2e8f0a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d \
  --tls \
  --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# Verify approval status
peer lifecycle chaincode checkcommitreadiness \
  --channelID $CHANNEL_NAME \
  --name mentora \
  --version 1.0 \
  --sequence 1 \
  --tls \
  --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```

#### Approve for Org2 (if applicable)

```bash
# Set environment for Org2
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_ADDRESS=localhost:9051
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp

# Approve for Org2
peer lifecycle chaincode approveformyorg \
  --channelID $CHANNEL_NAME \
  --name mentora \
  --version 1.0 \
  --sequence 1 \
  --package-id mentora_1.0:a7f7e6b7c3d2e8f0a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d \
  --tls \
  --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```

---

## Chaincode Instantiation

### Commit the Chaincode

```bash
# Must have majority of organizations approve the chaincode
peer lifecycle chaincode commit \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --channelID $CHANNEL_NAME \
  --name mentora \
  --version 1.0 \
  --sequence 1 \
  --tls \
  --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
  --peerAddresses localhost:7051 \
  --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
  --peerAddresses localhost:9051 \
  --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

# Verify committed chaincode
peer lifecycle chaincode querycommitted \
  --channelID $CHANNEL_NAME \
  --name mentora
```

### Verify Chaincode Deployment

```bash
# Check that chaincode is defined and active
peer lifecycle chaincode querycommitted \
  --channelID mychannel

# You should see mentora with version 1.0 and sequence 1
```

---

## Testing Credential Contract

### Create (Instantiate) a Course First

You need a course before issuing a certificate:

```bash
# Test course creation
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"CreateCourse","Args":["COURSE001","DL101","Digital Literacy Basics","Introduction to computers and internet","INST001","Alice Johnson","Digital Literacy","4
weeks","Beginner","EduOrg1"]}'

# Expected output: Chaincode invoke successful
```

### Issue a Certificate

```bash
# Issue certificate to student
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"IssueCertificate","Args":["CERT001","STU001","John Doe","DL101","Digital Literacy Basics","Alice Johnson","2024-03-09","2025-03-09","certificate","EduOrg1"]}'

# Expected output: Chaincode invoke successful
```

### Verify a Certificate

```bash
# Verify certificate authenticity
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"VerifyCertificate","Args":["CERT001"]}'

# Expected output: JSON with certificate details and verification result
# {
#   "isValid": true,
#   "certificateId": "CERT001",
#   "studentId": "STU001",
#   "studentName": "John Doe",
#   ...
# }
```

### Query Certificate by ID

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryCertificate","Args":["CERT001"]}'
```

### Query All Certificates

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryAllCertificates","Args":[]}'
```

### Query Certificates by Student

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryCertificatesByStudent","Args":["STU001"]}'
```

### Revoke a Certificate

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"RevokeCertificate","Args":["CERT001","Certificate compromised due to security breach","Admin@EduOrg1"]}'
```

### Get Certificate Statistics

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"GetCertificateStatistics","Args":[]}'

# Expected output:
# {
#   "totalCertificates": 1,
#   "statusBreakdown": { "active": 1, "revoked": 0, "expired": 0 },
#   "typeBreakdown": { "certificate": 1 },
#   "uniqueStudents": 1,
#   "averageCertificatesPerStudent": "1.00"
# }
```

---

## Testing Course Contract

### Create a Course

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"CreateCourse","Args":["COURSE001","DL101","Digital Literacy Basics","Introduction to computers and internet","INST001","Alice Johnson","Digital Literacy","4
weeks","Beginner","EduOrg1"]}'
```

### Enroll a Student in a Course

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"EnrollStudent","Args":["ENROL001","COURSE001","STU001","John Doe","2024-03-09"]}'
```

### Update Student Progress

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"UpdateProgress","Args":["COURSE001","STU001","50","[\\"MODULE1\\",\\"MODULE2\\"]"]}'
```

### Record Course Completion

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"RecordCompletion","Args":["COURSE001","STU001","2024-03-09","95","INST001"]}'
```

### Query Course by ID

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryCourse","Args":["COURSE001"]}'
```

### Query All Courses

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryAllCourses","Args":[]}'
```

### Query Courses by Category

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryCoursesByCategory","Args":["Digital Literacy"]}'
```

### Query Student Enrollments

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryStudentEnrollments","Args":["STU001"]}'
```

### Query All Completions

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryCompletions","Args":[]}'
```

### Get Course Statistics

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"GetCourseStatistics","Args":[]}'

# Expected output:
# {
#   "totalCourses": 1,
#   "totalEnrollments": 1,
#   "totalCompletions": 1,
#   "completionRate": "100.00",
#   "averageStudentsPerCourse": "1.00",
#   "categoryBreakdown": { "Digital Literacy": 1 }
# }
```

---

## Testing Scholarship Contract

### Create a Scholarship Fund

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"CreateScholarshipFund","Args":["FUND001","Digital Skills Scholarship","Scholarship for digital literacy students","DONOR001","Global Giving Foundation","10000","USD","2024","{\\"academicPerformance\\": \\"B+\\", \\"financialNeed\\": true}"]}'
```

### Record a Donation

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"CreateDonation","Args":["DONATION001","FUND001","DONOR002","Microsoft Foundation","5000","USD","2024-03-09","TXN123456789"]}'
```

### Allocate Scholarship to Student

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"AllocateScholarship","Args":["ALLOC001","FUND001","STU001","John Doe","2000","USD","2024-03-09","Admin@EduOrg1","High academic achievement and financial need"]}'
```

### Disburse Scholarship Funds

```bash
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"DisburseScholarship","Args":["ALLOC001","2024-03-10","BANK890123456","bank_transfer"]}'
```

### Query Scholarship Fund

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryScholarshipFund","Args":["FUND001"]}'
```

### Query All Funds

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryAllFunds","Args":[]}'
```

### Query Funds by Donor

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryFundsByDonor","Args":["DONOR001"]}'
```

### Query Student Scholarships

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryStudentScholarships","Args":["STU001"]}'
```

### Query Fund Allocations

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"QueryFundAllocations","Args":["FUND001"]}'
```

### Get Scholarship Statistics

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"GetScholarshipStatistics","Args":[]}'

# Expected output:
# {
#   "funds": {
#     "totalFunds": 1,
#     "totalRaised": "15000.00",
#     "totalAllocated": "2000.00",
#     "totalDisbursed": "2000.00"
#   },
#   "donations": { "totalDonations": 1, "averageDonation": "5000.00" },
#   "allocations": {
#     "totalAllocations": 1,
#     "uniqueStudents": 1,
#     "disbursedCount": 1,
#     "pendingCount": 0
#   }
# }
```

---

## Querying Data

### Get System Status

```bash
peer chaincode query \
  -C $CHANNEL_NAME \
  -n mentora \
  -c '{"function":"GetSystemStatus","Args":[]}'

# This returns statistics from all three contract modules
```

### Search for Specific Data Using Docker Logs

```bash
# View peer logs
docker logs peer0.org1.example.com

# View orderer logs
docker logs orderer.example.com

# Search for specific transaction
docker logs peer0.org1.example.com | grep "CERT001"
```

---

## Error Handling

### Common Error Messages

1. **Chaincode not found**
   ```
   Error: chaincode with name 'mentora' does not exist
   ```
   **Solution**: Ensure chaincode is committed and status is active

2. **Asset already exists**
   ```
   Error: The certificate CERT001 already exists
   ```
   **Solution**: Use a unique certificate ID or query first

3. **Asset not found**
   ```
   Error: Certificate CERT001 not found
   ```
   **Solution**: Ensure the ID is correct and certificate exists

4. **Insufficient balance**
   ```
   Error: Insufficient balance in fund FUND001
   ```
   **Solution**: Check fund balance before allocating scholarships

5. **MSP error**
   ```
   Error: Client identity is not in the organization
   ```
   **Solution**: Verify MSPID and TLS certificates

### Debug Transactions

```bash
# Add --waitForEvent flag to wait for commit event
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n mentora \
  --waitForEvent \
  -c '{"function":"IssueCertificate","Args":["CERT002","STU002","Jane Smith","DL101","Digital Literacy Basics","Alice Johnson","2024-03-09","2025-03-09","certificate","EduOrg1"]}'
```

---

## Common Issues

### Issue 1: Connection Refused

```
Error: rpc error: code = Unavailable desc = connection is closed
```

**Solution**: Check if Fabric network is running and peer is accessible

```bash
docker ps
# Verify peer containers are running
```

### Issue 2: TLS Certificate Errors

```
Error: X.509 certificate signed by unknown authority
```

**Solution**: Verify TLS certificate paths and ensure correct certificates are used

```bash
ls -la ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/
```

### Issue 3: Chaincode Not Starting

```
Error: Error starting container: API error (500): ...
```

**Solution**: Check chaincode logs and ensure package.json is correct

```bash
# Check peer logs for chaincode errors
docker logs peer0.org1.example.com --tail 50
```

### Issue 4: Version Mismatch

```
Error: chaincode version mismatch
```

**Solution**: Ensure all peers have the same chaincode version and sequence number

```bash
peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME
```

---

## Cleanup

### Stop the Network

```bash
cd fabric-samples/test-network
./network.sh down

# This removes all containers, volumes, and the chaincode
```

### Reset Channel State (Caution!)

```bash
# Reset channel to clean state (removes all data)
./network.sh down
./network.sh up
./network.sh createChannel

# Redeploy chaincode from scratch
```

---

## Quick Test Script

Save this as `test-chaincode.sh`:

```bash
#!/bin/bash

CHANNEL_NAME="mychannel"
CHAINCODE_NAME="mentora"

echo "Creating course..."
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n $CHAINCODE_NAME \
  -c '{"function":"CreateCourse","Args":["COURSE001","DL101","Digital Literacy Basics","Introduction to computers and internet","INST001","Alice Johnson","Digital Literacy","4
weeks","Beginner","EduOrg1"]}'

sleep 2

echo "Enrolling student..."
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n $CHAINCODE_NAME \
  -c '{"function":"EnrollStudent","Args":["ENROL001","COURSE001","STU001","John Doe","2024-03-09"]}'

sleep 2

echo "Recording completion..."
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n $CHAINCODE_NAME \
  -c '{"function":"RecordCompletion","Args":["COURSE001","STU001","2024-03-09","95","INST001"]}'

sleep 2

echo "Issuing certificate..."
peer chaincode invoke \
  -o localhost:7050 \
  --ordererTLSHostnameOverride orderer.example.com \
  --tls \
  -cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/m
sp/tlscacerts/tlsca.example.com-cert.pem \
  -C $CHANNEL_NAME \
  -n $CHAINCODE_NAME \
  -c '{"function":"IssueCertificate","Args":["CERT001","STU001","John Doe","DL101","Digital Literacy Basics","Alice Johnson","2024-03-09","2025-03-09","certificate","EduOrg1"]}'

sleep 2

echo "Verifying certificate..."
peer chaincode query \
  -C $CHANNEL_NAME \
  -n $CHAINCODE_NAME \
  -c '{"function":"VerifyCertificate","Args":["CERT001"]}'

echo "Getting statistics..."
peer chaincode query \
  -C $CHANNEL_NAME \
  -n $CHAINCODE_NAME \
  -c '{"function":"GetCertificateStatistics","Args":[]}'

echo "Tests completed!"
```

Make it executable and run:

```bash
chmod +x test-chaincode.sh
./test-chaincode.sh
```

---

## Conclusion

This guide covers all the essential operations for testing the Mentora chaincode on Hyperledger Fabric. Use these commands as a reference for:

- Deploying and instantiating chaincode
- Testing credential management functions
- Testing course and enrollment functions
- Testing scholarship and donation tracking
- Querying data and statistics
- Troubleshooting common issues

For more information, refer to the Hyperledger Fabric documentation and the main project README.
