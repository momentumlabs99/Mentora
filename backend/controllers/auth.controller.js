const authService = require('../services/auth.service');
const jwtService = require('../services/jwt.service');
const { success, error } = require('../utils/response.util');

/**
 * Login controller
 * Authenticates a user and returns a JWT token
 */
async function login(req, res) {
  try {
    const { staffId, password } = req.body;

    // Validate input
    if (!staffId || !password) {
      return error(res, 'Staff ID and password are required', 400);
    }

    // Authenticate user
    const user = await authService.authenticateStaff(staffId, password);

    if (!user) {
      return error(res, 'Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwtService.generateToken({
      id: user.id,
      name: user.name,
      role: user.role,
      branchId: user.branchId
    });

    return success(res, {
      user,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    return error(res, 'Internal server error', 500);
  }
}

/**
 * Verify token controller (simulated endpoint)
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

    return success(res, {
      valid: true,
      user: decoded
    });
  } catch (err) {
    console.error('Token verification error:', err);
    return error(res, 'Internal server error', 500);
  }
}

/**
 * Logout controller (simulated endpoint)
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

module.exports = {
  login,
  verifyToken,
  logout
};
