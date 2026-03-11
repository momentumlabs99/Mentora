import { mentoraApi, toReadableError } from './api';

export async function login({ identifier, password }) {
  try {
    const { data } = await mentoraApi.post('/auth/login', {
      // Backend may expect email/username under a specific key; we pass both.
      email: identifier,
      username: identifier,
      password,
    });

    const token = data.token || data.accessToken || data.jwt;
    if (!token) {
      throw new Error('Login succeeded but no token was returned by the API.');
    }

    const role = data.user?.role || data.role || '';
    return { token, role, raw: data };
  } catch (error) {
    throw toReadableError(error, 'Unable to login');
  }
}

export async function signup({ name, email, password, role, organization }) {
  try {
    const { data } = await mentoraApi.post('/auth/signup', {
      name,
      email,
      password,
      role,
      organization,
    });

    const token = data.token || data.accessToken || data.jwt;
    if (!token) {
      throw new Error('Sign up succeeded but no token was returned by the API.');
    }

    const resolvedRole = data.user?.role || data.role || '';
    return { token, role: resolvedRole, raw: data };
  } catch (error) {
    throw toReadableError(error, 'Unable to create account');
  }
}

export function deriveProfileFromTokenPayload(payload) {
  if (!payload) return null;
  return {
    id: payload.sub || payload.id,
    role: payload.role,
    email: payload.email,
    name: payload.name || payload.fullName,
  };
}

