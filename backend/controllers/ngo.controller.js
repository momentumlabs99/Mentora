const authService = require('../services/auth.service');
const { success, error } = require('../utils/response.util');

/**
 * Get all NGOs
 */
async function getAllNGOs(req, res) {
  try {
    const ngos = await authService.getAllNGOs();
    return success(res, ngos);
  } catch (err) {
    console.error('Get all NGOs error:', err);
    return error(res, 'Failed to retrieve NGOs', 500);
  }
}

/**
 * Get NGO by ID
 */
async function getNGOById(req, res) {
  try {
    const { ngoId } = req.params;

    if (!ngoId) {
      return error(res, 'NGO ID is required', 400);
    }

    const ngo = await authService.getNGOById(ngoId);

    if (!ngo) {
      return error(res, 'NGO not found', 404);
    }

    return success(res, ngo);
  } catch (err) {
    console.error('Get NGO by ID error:', err);
    return error(res, 'Failed to retrieve NGO', 500);
  }
}

/**
 * Get NGO profile for authenticated NGO user
 */
async function getNGOProfile(req, res) {
  try {
    const userId = req.user.id;
    const ngo = await authService.getNGOByUserId(userId);

    if (!ngo) {
      return error(res, 'NGO profile not found', 404);
    }

    return success(res, ngo);
  } catch (err) {
    console.error('Get NGO profile error:', err);
    return error(res, 'Failed to retrieve NGO profile', 500);
  }
}

module.exports = {
  getAllNGOs,
  getNGOById,
  getNGOProfile
};
