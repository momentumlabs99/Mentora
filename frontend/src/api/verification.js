import { mentoraApi, toReadableError } from './api';

export async function verifyCertificate(certId) {
  if (!certId) throw new Error('Certificate ID is required');
  try {
    const { data } = await mentoraApi.get(`/verify/${encodeURIComponent(certId)}`);
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to verify certificate');
  }
}

