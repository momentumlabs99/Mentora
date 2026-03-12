import { mentoraApi, toReadableError, withAuth } from './api';

export async function fetchCourses({ category, token }) {
  try {
    const path = category ? `/courses/category/${encodeURIComponent(category)}` : '/courses';
    const { data } = await mentoraApi.get(path, withAuth(token));
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.courses)) return data.courses;
    return [];
  } catch (error) {
    throw toReadableError(error, 'Unable to load courses');
  }
}

export async function fetchCourseStatistics(token) {
  try {
    const { data } = await mentoraApi.get('/courses/statistics', withAuth(token));
    return data;
  } catch (error) {
    throw toReadableError(error, 'Unable to load course statistics');
  }
}

