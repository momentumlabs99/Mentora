import { useEffect, useState } from 'react';
import { fetchCourses } from '../api/courses';
import { useAuth } from '../state/auth';

function CoursesPage() {
  const { token } = useAuth();
  const [courses, setCourses] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCourses = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await fetchCourses({ category, token });
      setCourses(result);
    } catch (err) {
      setError(err.message || 'Unable to load courses.');
      setCourses(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadCourses();
  }, [token]);

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Courses</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Explore programs that issue blockchain-verifiable micro-credentials.
            </p>
          </div>
          <button
            type="button"
            onClick={loadCourses}
            className="flex-none rounded-xl bg-teal-light px-3 py-2 text-xs font-semibold text-teal-deep transition hover:bg-teal-deep hover:text-white active:scale-95"
          >
            Refresh
          </button>
        </div>

        {/* Filter */}
        <div className="mt-3">
          <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="Filter by category (e.g. digital-literacy)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadCourses()}
            />
          </div>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-deep border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">{error}</div>
      )}

      {/* Course grid */}
      {courses && courses.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id || course.course_id || course.code}
              className="group rounded-2xl bg-white p-4 shadow-card transition hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {course.title || course.name || 'Untitled course'}
                  </h3>
                  {course.category && (
                    <span className="mt-1 inline-block rounded-lg bg-teal-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-deep">
                      {course.category}
                    </span>
                  )}
                </div>
                <span className="flex-none rounded-lg bg-green-light px-2 py-1 text-[10px] font-semibold text-green-earth">
                  {course.duration || 'Flexible'}
                </span>
              </div>
              {course.description && (
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {course.description}
                </p>
              )}
              <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-2 text-[11px] text-slate-400">
                <span>👤 {course.instructor || 'TBC'}</span>
                {course.code && (
                  <span className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                    {course.code}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && courses && courses.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-card">
          <p className="text-2xl">📚</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">No courses found</p>
          <p className="mt-1 text-xs text-slate-500">Try a different category or check back later.</p>
        </div>
      )}

      {!loading && !courses && !error && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-card">
          <p className="text-2xl">📚</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">No courses yet</p>
          <p className="mt-1 text-xs text-slate-500">Sign in and tap "Refresh" to load courses.</p>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
