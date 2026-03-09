'use strict';

const { Contract } = require('fabric-contract-api');

/**
 * ScholarshipContract - Manages scholarships, donations, and allocations on the blockchain
 * Provides functionality to create scholarship funds, accept donations, allocate to students, and track fund usage
 */
class ScholarshipContract extends Contract {

  constructor() {
    super('org.mentora.scholarship');
  }

  /**
   * InitLedger - Initialize the ledger with default data
   */
  async InitLedger(ctx) {
    console.info('=========== INITIALIZE SCHOLARSHIP LEDGER ===========');
    const scholarships = [];
    console.info('Scholarship ledger initialized with empty state');
    return JSON.stringify(scholarships);
  }

  /**
   * CreateScholarshipFund - Create a new scholarship fund
   * @param {Context} ctx - Transaction context
   * @param {string} fundId - Unique fund identifier
   * @param {string} fundName - Name of the scholarship fund
   * @param {string} description - Description of the scholarship
   * @param {string} donorId - Donor's unique ID
   * @param {string} donorName - Donor's name/organization
   * @param {string} initialAmount - Initial funding amount
   * @param {string} currency - Currency code (e.g., USD, EUR)
   * @param {string} allocationYear - Year for scholarship allocation
   * @param {string} eligibilityCriteria - JSON string of eligibility criteria
   * @returns {string} Created fund data
   */
  async CreateScholarshipFund(
    ctx,
    fundId,
    fundName,
    description,
    donorId,
    donorName,
    initialAmount,
    currency,
    allocationYear,
    eligibilityCriteria
  ) {
    const exists = await this.ScholarshipFundExists(ctx, fundId);
    if (exists) {
      throw new Error(`The scholarship fund ${fundId} already exists`);
    }

    const fund = {
      fundId,
      fundName,
      description,
      donorId,
      donorName,
      totalRaised: parseFloat(initialAmount),
      totalAllocated: 0,
      totalDisbursed: 0,
      currentBalance: parseFloat(initialAmount),
      currency,
      allocationYear,
      eligibilityCriteria: JSON.parse(eligibilityCriteria),
      status: 'active', // active, paused, closed
      recipientCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const fundBuffer = Buffer.from(JSON.stringify(fund));
    await ctx.stub.putState(fundId, fundBuffer);

    // Create index by donor
    await ctx.stub.putState(
      `SCHOLARSHIP_DONOR_${donorId}_${fundId}`,
      fundBuffer
    );

    // Create index by year
    await ctx.stub.putState(
      `SCHOLARSHIP_YEAR_${allocationYear}_${fundId}`,
      fundBuffer
    );

    console.info(`Scholarship fund ${fundId} created by ${donorName}`);
    return JSON.stringify(fund);
  }

  /**
   * CreateDonation - Record a donation to a scholarship fund
   * @param {Context} ctx - Transaction context
   * @param {string} donationId - Unique donation identifier
   * @param {string} fundId - Target scholarship fund ID
   * @param {string} donorId - Donor ID
   * @param {string} donorName - Donor name
   * @param {string} amount - Donation amount
   * @param {string} currency - Currency code
   * @param {string} donationDate - Date of donation (ISO format)
   * @param {string} transactionReference - External transaction reference
   * @returns {string} Donation record
   */
  async CreateDonation(
    ctx,
    donationId,
    fundId,
    donorId,
    donorName,
    amount,
    currency,
    donationDate,
    transactionReference
  ) {
    // Check if fund exists
    const fundJSON = await ctx.stub.getState(fundId);
    if (!fundJSON || fundJSON.length === 0) {
      throw new Error(`Scholarship fund ${fundId} not found`);
    }

    const donation = {
      donationId,
      fundId,
      donorId,
      donorName,
      amount: parseFloat(amount),
      currency,
      donationDate,
      transactionReference,
      blockchainHash: ctx.stub.getTxID(),
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    const donationBuffer = Buffer.from(JSON.stringify(donation));
    await ctx.stub.putState(donationId, donationBuffer);

    // Update fund balance
    const fund = JSON.parse(fundJSON.toString());
    fund.totalRaised += parseFloat(amount);
    fund.currentBalance += parseFloat(amount);
    fund.updatedAt = new Date().toISOString();
    await ctx.stub.putState(fundId, Buffer.from(JSON.stringify(fund)));

    console.info(`Donation ${donationId} of ${amount} ${currency} received for fund ${fundId}`);
    return JSON.stringify(donation);
  }

  /**
   * AllocateScholarship - Allocate scholarship to a student
   * @param {Context} ctx - Transaction context
   * @param {string} allocationId - Unique allocation identifier
   * @param {string} fundId - Scholarship fund ID
   * @param {string} studentId - Student ID
   * @param {string} studentName - Student name
   * @param {string} amount - Allocated amount
   * @param {string} currency - Currency code
   * @param {string} allocationDate - Date of allocation (ISO format)
   * @param {string} allocatedBy - Name/ID of person allocating
   * @param {string} reason - Reason for allocation
   * @returns {string} Allocation record
   */
  async AllocateScholarship(
    ctx,
    allocationId,
    fundId,
    studentId,
    studentName,
    amount,
    currency,
    allocationDate,
    allocatedBy,
    reason
  ) {
    // Check if fund exists and has sufficient balance
    const fundJSON = await ctx.stub.getState(fundId);
    if (!fundJSON || fundJSON.length === 0) {
      throw new Error(`Scholarship fund ${fundId} not found`);
    }

    const fund = JSON.parse(fundJSON.toString());
    
    if (fund.currentBalance < parseFloat(amount)) {
      throw new Error(`Insufficient balance in fund ${fundId}`);
    }

    if (fund.status !== 'active') {
      throw new Error(`Fund ${fundId} is not active (status: ${fund.status})`);
    }

    const allocation = {
      allocationId,
      fundId,
      studentId,
      studentName,
      amount: parseFloat(amount),
      currency,
      allocationDate,
      allocatedBy,
      reason,
      status: 'allocated', // allocated, disbursed, cancelled
      blockchainHash: ctx.stub.getTxID(),
      disbursementDate: null,
      disbursementReference: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const allocationBuffer = Buffer.from(JSON.stringify(allocation));
    await ctx.stub.putState(allocationId, allocationBuffer);

    // Create index by student
    await ctx.stub.putState(
      `SCHOLARSHIP_STUDENT_${studentId}_${allocationId}`,
      allocationBuffer
    );

    // Update fund
    fund.totalAllocated += parseFloat(amount);
    fund.currentBalance -= parseFloat(amount);
    fund.recipientCount += 1;
    fund.updatedAt = new Date().toISOString();
    await ctx.stub.putState(fundId, Buffer.from(JSON.stringify(fund)));

    console.info(`Scholarship ${allocationId} of ${amount} ${currency} allocated to student ${studentName}`);
    return JSON.stringify(allocation);
  }

  /**
   * DisburseScholarship - Record disbursement of scholarship funds to student
   * @param {Context} ctx - Transaction context
   * @param {string} allocationId - Allocation ID
   * @param {string} disbursementDate - Disbursement date (ISO format)
   * @param {string} disbursementReference - Payment/bank reference
   * @param {string} disbursementMethod - Method of disbursement (e.g., bank_transfer, mobile_money)
   * @returns {string} Updated allocation record
   */
  async DisburseScholarship(
    ctx,
    allocationId,
    disbursementDate,
    disbursementReference,
    disbursementMethod
  ) {
    const allocationJSON = await ctx.stub.getState(allocationId);
    
    if (!allocationJSON || allocationJSON.length === 0) {
      throw new Error(`Allocation ${allocationId} not found`);
    }

    const allocation = JSON.parse(allocationJSON.toString());

    if (allocation.status !== 'allocated') {
      throw new Error(`Allocation ${allocationId} is not in allocated status (status: ${allocation.status})`);
    }

    const fundJSON = await ctx.stub.getState(allocation.fundId);
    const fund = JSON.parse(fundJSON.toString());

    allocation.status = 'disbursed';
    allocation.disbursementDate = disbursementDate;
    allocation.disbursementReference = disbursementReference;
    allocation.disbursementMethod = disbursementMethod;
    allocation.updatedAt = new Date().toISOString();

    await ctx.stub.putState(allocationId, Buffer.from(JSON.stringify(allocation)));

    // Update fund
    fund.totalDisbursed += allocation.amount;
    fund.updatedAt = new Date().toISOString();
    await ctx.stub.putState(allocation.fundId, Buffer.from(JSON.stringify(fund)));

    // Update student index
    await ctx.stub.putState(
      `SCHOLARSHIP_STUDENT_${allocation.studentId}_${allocationId}`,
      Buffer.from(JSON.stringify(allocation))
    );

    console.info(`Scholarship ${allocationId} disbursed to student ${allocation.studentName}`);
    return JSON.stringify(allocation);
  }

  /**
   * QueryScholarshipFund - Query a scholarship fund by ID
   * @param {Context} ctx - Transaction context
   * @param {string} fundId - Fund ID
   * @returns {string} Fund data
   */
  async QueryScholarshipFund(ctx, fundId) {
    const fundJSON = await ctx.stub.getState(fundId);
    
    if (!fundJSON || fundJSON.length === 0) {
      throw new Error(`Scholarship fund ${fundId} not found`);
    }

    return fundJSON.toString();
  }

  /**
   * QueryAllFunds - Get all scholarship funds
   * @param {Context} ctx - Transaction context
   * @returns {string} Array of all funds
   */
  async QueryAllFunds(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const funds = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process fund records (skip indexes and allocations)
        if (!key.startsWith('SCHOLARSHIP_DONOR_') && 
            !key.startsWith('SCHOLARSHIP_YEAR_') && 
            !key.startsWith('SCHOLARSHIP_STUDENT_') &&
            !key.startsWith('DONATION_')) {
          try {
            const value = JSON.parse(result.value.value.toString());
            if (value.fundId) {
              funds.push(value);
            }
          } catch (err) {
            console.log(`Error parsing fund: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(funds);
  }

  /**
   * QueryFundsByDonor - Get all funds created by a specific donor
   * @param {Context} ctx - Transaction context
   * @param {string} donorId - Donor ID
   * @returns {string} Array of funds
   */
  async QueryFundsByDonor(ctx, donorId) {
    const iterator = await ctx.stub.getStateByRange(
      `SCHOLARSHIP_DONOR_${donorId}_`,
      `SCHOLARSHIP_DONOR_${donorId}_\uffff`
    );

    const funds = [];
    
    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        try {
          const fund = JSON.parse(result.value.value.toString());
          funds.push(fund);
        } catch (err) {
          console.log(`Error parsing fund: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(funds);
  }

  /**
   * QueryFundsByYear - Get all funds for a specific allocation year
   * @param {Context} ctx - Transaction context
   * @param {string} year - Allocation year
   * @returns {string} Array of funds
   */
  async QueryFundsByYear(ctx, year) {
    const iterator = await ctx.stub.getStateByRange(
      `SCHOLARSHIP_YEAR_${year}_`,
      `SCHOLARSHIP_YEAR_${year}_\uffff`
    );

    const funds = [];
    
    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        try {
          const fund = JSON.parse(result.value.value.toString());
          funds.push(fund);
        } catch (err) {
          console.log(`Error parsing fund: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(funds);
  }

  /**
   * QueryDonation - Query a single donation by ID
   * @param {Context} ctx - Transaction context
   * @param {string} donationId - Donation ID
   * @returns {string} Donation data
   */
  async QueryDonation(ctx, donationId) {
    const donationJSON = await ctx.stub.getState(donationId);
    
    if (!donationJSON || donationJSON.length === 0) {
      throw new Error(`Donation ${donationId} not found`);
    }

    return donationJSON.toString();
  }

  /**
   * QueryDonationsByFund - Get all donations for a specific fund
   * @param {Context} ctx - Transaction context
   * @param {string} fundId - Fund ID
   * @returns {string} Array of donations
   */
  async QueryDonationsByFund(ctx, fundId) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const donations = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process donation records
        if (!key.startsWith('SCHOLARSHIP_')) {
          try {
            const donation = JSON.parse(result.value.value.toString());
            if (donation.donationId && donation.fundId === fundId) {
              donations.push(donation);
            }
          } catch (err) {
            console.log(`Error parsing donation: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(donations);
  }

  /**
   * QueryStudentScholarships - Get all scholarship allocations for a student
   * @param {Context} ctx - Transaction context
   * @param {string} studentId - Student ID
   * @returns {string} Array of allocations
   */
  async QueryStudentScholarships(ctx, studentId) {
    const iterator = await ctx.stub.getStateByRange(
      `SCHOLARSHIP_STUDENT_${studentId}_`,
      `SCHOLARSHIP_STUDENT_${studentId}_\uffff`
    );

    const allocations = [];
    
    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        try {
          const allocation = JSON.parse(result.value.value.toString());
          allocations.push(allocation);
        } catch (err) {
          console.log(`Error parsing allocation: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(allocations);
  }

  /**
   * QueryFundAllocations - Get all allocations for a specific fund
   * @param {Context} ctx - Transaction context
   * @param {string} fundId - Fund ID
   * @returns {string} Array of allocations
   */
  async QueryFundAllocations(ctx, fundId) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const allocations = [];

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        // Only process allocation records (skip indexes)
        if (!key.startsWith('SCHOLARSHIP_STUDENT_')) {
          try {
            const allocation = JSON.parse(result.value.value.toString());
            if (allocation.allocationId && allocation.fundId === fundId) {
              allocations.push(allocation);
            }
          } catch (err) {
            console.log(`Error parsing allocation: ${err}`);
          }
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(allocations);
  }

  /**
   * GetScholarshipStatistics - Get comprehensive statistics about scholarships
   * @param {Context} ctx - Transaction context
   * @returns {string} Statistics data
   */
  async GetScholarshipStatistics(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    
    const funds = [];
    const donations = [];
    const allocations = [];
    let totalFunds = 0;
    let totalRaised = 0;
    let totalAllocated = 0;
    let totalDisbursed = 0;
    let totalDonations = 0;
    let totalAllocations = 0;
    let totalStudents = new Set();
    const currencyBreakdown = {};
    const statusBreakdown = { active: 0, paused: 0, closed: 0 };

    while (true) {
      const result = await iterator.next();

      if (result.value && result.value.value.toString()) {
        const key = result.value.key;
        
        try {
          const value = JSON.parse(result.value.value.toString());
          
          if (value.fundId && !key.startsWith('SCHOLARSHIP_DONOR_') && !key.startsWith('SCHOLARSHIP_YEAR_')) {
            funds.push(value);
            totalFunds++;
            totalRaised += value.totalRaised;
            totalAllocated += value.totalAllocated;
            totalDisbursed += value.totalDisbursed;
            
            if (statusBreakdown[value.status] !== undefined) {
              statusBreakdown[value.status]++;
            }
            
            if (currencyBreakdown[value.currency]) {
              currencyBreakdown[value.currency] += value.totalRaised;
            } else {
              currencyBreakdown[value.currency] = value.totalRaised;
            }
          }
          
          if (value.donationId) {
            donations.push(value);
            totalDonations++;
          }
          
          if (value.allocationId && !key.startsWith('SCHOLARSHIP_STUDENT_')) {
            allocations.push(value);
            totalAllocations++;
            totalStudents.add(value.studentId);
          }
        } catch (err) {
          console.log(`Error parsing record: ${err}`);
        }
      }

      if (result.done) {
        await iterator.close();
        break;
      }
    }

    const statistics = {
      funds: {
        totalFunds,
        totalRaised: totalRaised.toFixed(2),
        totalAllocated: totalAllocated.toFixed(2),
        totalDisbursed: totalDisbursed.toFixed(2),
        averageFundSize: totalFunds > 0 ? (totalRaised / totalFunds).toFixed(2) : 0,
        statusBreakdown,
        currencyBreakdown
      },
      donations: {
        totalDonations,
        averageDonation: totalDonations > 0 ? (totalRaised / totalDonations).toFixed(2) : 0
      },
      allocations: {
        totalAllocations,
        uniqueStudents: totalStudents.size,
        averageAllocation: totalAllocations > 0 ? (totalAllocated / totalAllocations).toFixed(2) : 0,
        disbursedCount: allocations.filter(a => a.status === 'disbursed').length,
        pendingCount: allocations.filter(a => a.status === 'allocated').length
      },
      generatedAt: new Date().toISOString()
    };

    return JSON.stringify(statistics);
  }

  /**
   * ScholarshipFundExists - Check if a scholarship fund exists
   * @param {Context} ctx - Transaction context
   * @param {string} fundId - Fund ID to check
   * @returns {boolean} True if fund exists
   */
  async ScholarshipFundExists(ctx, fundId) {
    const fundJSON = await ctx.stub.getState(fundId);
    return fundJSON && fundJSON.length > 0;
  }
}

module.exports = ScholarshipContract;
