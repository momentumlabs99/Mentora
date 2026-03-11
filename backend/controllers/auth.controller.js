const authService = require('../services/auth.service');
const jwtService = require('../services/jwt.service');
const { success, error } = require('../utils/response.util');

/**
 * Login controller
 * Authenticates a user (NGO, Student, or Admin) and returns a JWT token
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return error(res, 'Email and password are required', 400);
    }

    // Authenticate user using email
    const user = await authService.authenticateUser(email, password);

    if (!user) {
      return error(res, 'Invalid credentials', 401);
    }

    // Generate JWT token with full user information
    const token = jwtService.generateToken({
      id: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
      organization: user.organization,
      studentId: user.studentId,
      branchId: user.branchId
    });

    // If user is an NGO, also fetch NGO details
    let ngoDetails = null;
    if (user.role === 'NGO') {
      ngoDetails = await authService.getNGOByUserId(user.userId);
    }

    return success(res, {
      user,
      ngo: ngoDetails,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    return error(res, 'Internal server error', 500);
  }
}

/**
 * Register controller
 * Creates a new user account and returns a JWT token
 */
async function signup(req, res) {
  try {
    const { email, password, name, role, organization } = req.body;

    if (!email || !password || !name) {
      return error(res, 'Name, email, and password are required', 400);
    }

    const normalizedRole = role || 'STUDENT';

    const user = await authService.createUser({
      email,
      password,
      name,
      role: normalizedRole,
      organization,
    });

    const token = jwtService.generateToken({
      id: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
      organization: user.organization,
      studentId: user.studentId,
      branchId: user.branchId,
    });

    let ngoDetails = null;
    if (user.role === 'NGO') {
      ngoDetails = await authService.getNGOByUserId(user.userId);
    }

    return success(res, { user, ngo: ngoDetails, token }, 201);
  } catch (err) {
    console.error('Signup error:', err);
    return error(res, err.message || 'Unable to create account', 400);
  }
}

/**
 * Verify token controller
 * Validates if a token is still valid
 */
async function verifyToken(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return error(res, 'Token is required', 400);
    }

    const decoded = jwtService.verifyToken(token);

    if (!decoded) {
      return error(res, 'Invalid or expired token', 401);
    }

    // Fetch fresh user data
    const user = await authService.getUserById(decoded.id);

    if (!user) {
      return error(res, 'User not found', 404);
    }

    return success(res, {
      valid: true,
      user: { ...decoded, ...user }
    });
  } catch (err) {
    console.error('Token verification error:', err);
    return error(res, 'Internal server error', 500);
  }
}

/**
 * Logout controller
 * In a real app, this would invalidate the token on the server
 */
async function logout(req, res) {
  try {
    // For stateless JWT, logout is handled on the client side
    // by removing the token
    return success(res, {
      message: 'Logged out successfully'
    });
  } catch (err) {
    console.error('Logout error:', err);
    return error(res, 'Internal server error', 500);
  }
}

/**
 * Get current user profile
 * Requires authentication
 */
async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const user = await authService.getUserById(userId);

    if (!user) {
      return error(res, 'User not found', 404);
    }

    // If user is an NGO, also fetch NGO details
    let ngoDetails = null;
    if (user.role === 'NGO') {
      ngoDetails = await authService.getNGOByUserId(userId);
    }

    return success(res, {
      user,
      ngo: ngoDetails
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return error(res, 'Internal server error', 500);
  }
}

module.exports = {
  login,
  verifyToken,
  logout,
  getProfile,
  signup,
};
