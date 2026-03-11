import { mentoraApi, toReadableError, withAuth } from './api';

export async function fetchPublicNgos() {
  try {
    const { data } = await mentoraApi.get('/ngos');
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.ngos)) return data.ngos;
    return [];
  } catch (error) {
    throw toReadableError(error, 'Unable to load NGOs');
  }
}

export async function fetchNgoProfile(token) {
  try {
    const { data } = await mentoraApi.get('/ngos/profile/me', withAuth(token));
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to load NGO profile');
  }
}

