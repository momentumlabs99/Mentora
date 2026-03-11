import { mentoraApi, toReadableError, withAuth } from './api';

export async function fetchStudentProfile(studentId, token) {
  if (!studentId) throw new Error('Student ID is required');
  try {
    const { data } = await mentoraApi.get(`/students/${studentId}/profile`, withAuth(token));
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to load student profile');
  }
}

export async function fetchStudentCertificates(studentId, token) {
  if (!studentId) throw new Error('Student ID is required');
  try {
    const { data } = await mentoraApi.get(
      `/students/${studentId}/certificates`,
      withAuth(token),
    );
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to load certificates');
  }
}

export async function fetchStudentEnrollments(studentId, token) {
  if (!studentId) throw new Error('Student ID is required');
  try {
    const { data } = await mentoraApi.get(
      `/students/${studentId}/enrollments`,
      withAuth(token),
    );
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to load enrollments');
  }
}

export async function fetchStudentScholarships(studentId, token) {
  if (!studentId) throw new Error('Student ID is required');
  try {
    const { data } = await mentoraApi.get(
      `/students/${studentId}/scholarships`,
      withAuth(token),
    );
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to load scholarships');
  }
}

