const ledgerService = require('../services/ledger-gateway.service');
const { success, error } = require('../utils/response.util');

/**
 * Create a new scholarship fund
 */
async function createScholarshipFund(req, res) {
  try {
    const fundData = req.body;
    
    // Add owner_id from authenticated user (for NGO users)
    if (req.user && (req.user.role === 'NGO' || req.user.role === 'ADMIN')) {
      fundData.ownerId = req.user.id;
      fundData.ownerName = req.user.name;
      fundData.ownerEmail = req.user.email;
      fundData.ownerRole = req.user.role;
      if (req.user.role === 'NGO') {
        fundData.ownerOrganization = req.user.organization;
      }
    }

    // Validate required fields
    const requiredFields = [
      'fundId', 'fundName', 'description', 'donorId',
      'donorName', 'initialAmount', 'currency',
      'allocationYear', 'eligibilityCriteria'
    ];

    for (const field of requiredFields) {
      if (fundData[field] === undefined || fundData[field] === null) {
        return error(res, `${field} is required`, 400);
      }
    }

    const fund = await ledgerService.createScholarshipFund(fundData);
    return success(res, fund, 201);
  } catch (err) {
    console.error('Create scholarship fund error:', err);
    return error(res, 'Failed to create scholarship fund', 500);
  }
}

/**
 * Get scholarship fund by ID
 */
async function getScholarshipFund(req, res) {
  try {
    const { fundId } = req.params;

    if (!fundId) {
      return error(res, 'Fund ID is required', 400);
    }

    const fund = await ledgerService.queryScholarshipFund(fundId);
    
    if (!fund) {
      return error(res, 'Scholarship fund not found', 404);
    }

    return success(res, fund);
  } catch (err) {
    console.error('Get scholarship fund error:', err);
    return error(res, 'Failed to retrieve scholarship fund', 500);
  }
}

/**
 * Get all scholarship funds
 */
async function getAllFunds(req, res) {
  try {
    const funds = await ledgerService.queryAllFunds();
    return success(res, funds);
  } catch (err) {
    console.error('Get all funds error:', err);
    return error(res, 'Failed to retrieve scholarship funds', 500);
  }
}

/**
 * Get funds by donor
 */
async function getFundsByDonor(req, res) {
  try {
    const { donorId } = req.params;

    if (!donorId) {
      return error(res, 'Donor ID is required', 400);
    }

    const funds = await ledgerService.queryFundsByDonor(donorId);
    return success(res, funds);
  } catch (err) {
    console.error('Get funds by donor error:', err);
    return error(res, 'Failed to retrieve funds', 500);
  }
}

/**
 * Get funds by allocation year
 */
async function getFundsByYear(req, res) {
  try {
    const { year } = req.params;

    if (!year) {
      return error(res, 'Year is required', 400);
    }

    const funds = await ledgerService.queryFundsByYear(year);
    return success(res, funds);
  } catch (err) {
    console.error('Get funds by year error:', err);
    return error(res, 'Failed to retrieve funds', 500);
  }
}

/**
 * Create a donation to a fund
 */
async function createDonation(req, res) {
  try {
    const donationData = req.body;

    // Validate required fields
    const requiredFields = [
      'donationId', 'fundId', 'donorId', 'donorName',
      'amount', 'currency', 'donationDate', 'transactionReference'
    ];

    for (const field of requiredFields) {
      if (!donationData[field]) {
        return error(res, `${field} is required`, 400);
      }
    }

    const donation = await ledgerService.createDonation(donationData);
    return success(res, donation, 201);
  } catch (err) {
    console.error('Create donation error:', err);
    return error(res, 'Failed to create donation', 500);
  }
}

/**
 * Get donation by ID
 */
async function getDonation(req, res) {
  try {
    const { donationId } = req.params;

    if (!donationId) {
      return error(res, 'Donation ID is required', 400);
    }

    const donation = await ledgerService.queryDonation(donationId);
    
    if (!donation) {
      return error(res, 'Donation not found', 404);
    }

    return success(res, donation);
  } catch (err) {
    console.error('Get donation error:', err);
    return error(res, 'Failed to retrieve donation', 500);
  }
}

/**
 * Get donations by fund
 */
async function getDonationsByFund(req, res) {
  try {
    const { fundId } = req.params;

    if (!fundId) {
      return error(res, 'Fund ID is required', 400);
    }

    const donations = await ledgerService.queryDonationsByFund(fundId);
    return success(res, donations);
  } catch (err) {
    console.error('Get donations by fund error:', err);
    return error(res, 'Failed to retrieve donations', 500);
  }
}

/**
 * Allocate scholarship to a student
 */
async function allocateScholarship(req, res) {
  try {
    const allocationData = req.body;

    // Validate required fields
    const requiredFields = [
      'allocationId', 'fundId', 'studentId', 'studentName',
      'amount', 'currency', 'allocationDate', 'allocatedBy', 'reason'
    ];

    for (const field of requiredFields) {
      if (!allocationData[field]) {
        return error(res, `${field} is required`, 400);
      }
    }

    const allocation = await ledgerService.allocateScholarship(allocationData);
    return success(res, allocation, 201);
  } catch (err) {
    console.error('Allocate scholarship error:', err);
    return error(res, 'Failed to allocate scholarship', 500);
  }
}

/**
 * Disburse scholarship funds
 */
async function disburseScholarship(req, res) {
  try {
    const { allocationId } = req.params;
    const { disbursementDate, disbursementReference, disbursementMethod } = req.body;

    if (!allocationId) {
      return error(res, 'Allocation ID is required', 400);
    }

    if (!disbursementDate || !disbursementReference || !disbursementMethod) {
      return error(res, 'Disbursement details are required', 400);
    }

    const disbursement = await ledgerService.disburseScholarship({
      allocationId,
      disbursementDate,
      disbursementReference,
      disbursementMethod
    });
    return success(res, disbursement);
  } catch (err) {
    console.error('Disburse scholarship error:', err);
    return error(res, 'Failed to disburse scholarship', 500);
  }
}

/**
 * Get allocations for a fund
 */
async function getFundAllocations(req, res) {
  try {
    const { fundId } = req.params;

    if (!fundId) {
      return error(res, 'Fund ID is required', 400);
    }

    const allocations = await ledgerService.queryFundAllocations(fundId);
    return success(res, allocations);
  } catch (err) {
    console.error('Get fund allocations error:', err);
    return error(res, 'Failed to retrieve allocations', 500);
  }
}

/**
 * Get scholarship statistics
 */
async function getScholarshipStatistics(req, res) {
  try {
    const stats = await ledgerService.getScholarshipStatistics();
    return success(res, stats);
  } catch (err) {
    console.error('Get scholarship statistics error:', err);
    return error(res, 'Failed to retrieve statistics', 500);
  }
}

module.exports = {
  createScholarshipFund,
  getScholarshipFund,
  getAllFunds,
  getFundsByDonor,
  getFundsByYear,
  createDonation,
  getDonation,
  getDonationsByFund,
  allocateScholarship,
  disburseScholarship,
  getFundAllocations,
  getScholarshipStatistics
};
