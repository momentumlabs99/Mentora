import { mentoraApi, toReadableError, withAuth } from './api';

export async function fetchScholarshipStatistics(token) {
  try {
    const { data } = await mentoraApi.get('/scholarships/statistics', withAuth(token));
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to load scholarship statistics');
  }
}

export async function fetchScholarshipFunds(token) {
  try {
    const { data } = await mentoraApi.get('/scholarships/funds', withAuth(token));
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.funds)) return data.funds;
    return [];
  } catch (error) {
    throw toReadableError(error, 'Unable to load scholarship funds');
  }
}

export async function fetchScholarshipFundsByDonor(donorId, token) {
  if (!donorId) throw new Error('Donor ID is required');
  try {
    const { data } = await mentoraApi.get(
      `/scholarships/funds/donor/${encodeURIComponent(donorId)}`,
      withAuth(token),
    );
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.funds)) return data.funds;
    return [];
  } catch (error) {
    throw toReadableError(error, 'Unable to load funds for donor');
  }
}

