const User = require('../models/user.model');
const NGO = require('../models/ngo.model');

// Sample users database with RBAC support
const usersDatabase = [
  {
    userId: "ADMIN001",
    email: "admin@mentora.org",
    password: "admin123",
    name: "System Admin",
    role: "ADMIN",
    organization: "Mentora Platform",
    studentId: "",
    branchId: "",
  },
  {
    userId: "NGO001",
    email: "ngo@scholars-fund.org",
    password: "ngo123",
    name: "Scholars Fund NGO",
    role: "NGO",
    organization: "Scholars Fund",
    studentId: "",
    branchId: "",
  },
  {
    userId: "NGO002",
    email: "education@hope-foundation.org",
    password: "ngo123",
    name: "Hope Foundation",
    role: "NGO",
    organization: "Hope Foundation",
    studentId: "",
    branchId: "",
  },
  {
    userId: "STU001",
    email: "student1@university.edu",
    password: "student123",
    name: "John Student",
    role: "STUDENT",
    organization: "",
    studentId: "STU123456789",
    branchId: "BRANCH001",
  },
  {
    userId: "STU002",
    email: "student2@university.edu",
    password: "student123",
    name: "Jane Student",
    role: "STUDENT",
    organization: "",
    studentId: "STU987654321",
    branchId: "BRANCH001",
  },
];

// Sample NGOs database for owner_id tracking
const ngoDatabase = [
  {
    ngoId: "NGO001",
    name: "Scholars Fund NGO",
    email: "ngo@scholars-fund.org",
    phone: "+254-700-123-456",
    address: "123 Education Street, Nairobi",
    registrationNumber: "NGB/2024/001",
    description: "Providing scholarships to underprivileged students",
    country: "Kenya",
    region: "East Africa",
    contactPerson: "Mary Johnson",
    contactEmail: "mary@scholars-fund.org",
    website: "https://scholars-fund.org",
    status: "Active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    ngoId: "NGO002",
    name: "Hope Foundation",
    email: "education@hope-foundation.org",
    phone: "+254-700-789-012",
    address: "456 Hope Road, Mombasa",
    registrationNumber: "NGB/2024/002",
    description: "Empowering youth through education",
    country: "Kenya",
    region: "Coastal",
    contactPerson: "Peter Williams",
    contactEmail: "peter@hope-foundation.org",
    website: "https://hope-foundation.org",
    status: "Active",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
];

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - Password
 * @returns {Promise<object|null>} User object or null
 */
async function authenticateUser(email, password) {
  const user = usersDatabase.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<object|null>} User object or null
 */
async function getUserById(userId) {
  const user = usersDatabase.find((u) => u.userId === userId);
  
  if (!user) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Get NGO by user ID (for NGO users)
 * @param {string} userId - User ID
 * @returns {Promise<object|null>} NGO object or null
 */
async function getNGOByUserId(userId) {
  const user = usersDatabase.find((u) => u.userId === userId);
  
  if (!user || user.role !== 'NGO') {
    return null;
  }

  return ngoDatabase.find((ngo) => ngo.ngoId === user.userId) || null;
}

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise<object|null>} User object or null
 */
async function getUserByEmail(email) {
  const user = usersDatabase.find((u) => u.email === email);
  
  if (!user) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Get all NGOs
 * @returns {Promise<Array>} Array of NGOs
 */
async function getAllNGOs() {
  return ngoDatabase;
}

/**
 * Get NGO by ID
 * @param {string} ngoId - NGO ID
 * @returns {Promise<object|null>} NGO object or null
 */
async function getNGOById(ngoId) {
  return ngoDatabase.find((ngo) => ngo.ngoId === ngoId) || null;
}

/**
 * Create user (simple in-memory implementation)
 * @param {object} userData - User data
 * @returns {Promise<object>} Created user (without password)
 */
async function createUser(userData) {
  const base = {
    role: 'STUDENT',
    organization: '',
    studentId: '',
    branchId: '',
    ...userData,
  };

  // Prevent duplicate emails
  const existing = usersDatabase.find((u) => u.email === base.email);
  if (existing) {
    throw new Error('An account with this email already exists');
  }

  // Generate an ID if missing
  if (!base.userId) {
    base.userId = User.generateId(base.role);
  }

  // Build full user including password for storage
  const user = User.fromObject(base, true);
  const validation = user.validate();

  if (!validation.valid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }

  // In this demo, push into the in-memory database.
  usersDatabase.push({
    userId: user.userId,
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role,
    organization: user.organization,
    studentId: user.studentId,
    branchId: user.branchId,
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Update user (for future implementation)
 * @param {string} userId - User ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated user
 */
async function updateUser(userId, updateData) {
  const user = await getUserById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  // In production, this would update in database
  return { ...user, ...updateData };
}

module.exports = {
  authenticateUser,
  getUserById,
  getNGOByUserId,
  getUserByEmail,
  getAllNGOs,
  getNGOById,
  createUser,
  updateUser,
  // Legacy support
  authenticateStaff: authenticateUser,
};
