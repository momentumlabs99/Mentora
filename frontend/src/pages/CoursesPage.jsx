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
    if (token) {
      loadCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="space-y-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Course Library</h2>
          <p className="mt-0.5 text-xs text-slate-600">
            Explore courses that generate blockchain-verifiable micro-credentials.
          </p>
        </div>
        <button
          type="button"
          onClick={loadCourses}
          className="mt-1 inline-flex items-center justify-center rounded-full bg-teal-deep px-3 py-1.5 text-xs font-semibold text-white shadow-sm sm:mt-0"
        >
          Refresh courses
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex-1 text-xs font-medium text-slate-700">
          Filter by category
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
            placeholder="e.g. digital-literacy"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </label>
      </div>

      {loading && <p className="text-xs text-slate-600">Loading courses…</p>}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {courses?.map((course) => (
          <article
            key={course.id || course.course_id || course.code}
            className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/80 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {course.title || course.name || 'Untitled course'}
                </h3>
                {course.category && (
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-teal-deep/80">
                    {course.category}
                  </p>
                )}
              </div>
              <span className="rounded-full bg-green-earth/10 px-2 py-0.5 text-[10px] font-medium text-green-earth">
                {course.duration || 'Flexible'}
              </span>
            </div>
            {course.description && (
              <p className="mt-1 line-clamp-3 text-xs text-slate-600">
                {course.description}
              </p>
            )}
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Instructor: {course.instructor || 'TBC'}</span>
              {course.code && (
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-700">
                  {course.code}
                </span>
              )}
            </div>
          </article>
        ))}
        {!loading && !courses && (
          <p className="text-xs text-slate-600">
            No courses to show yet. Tap “Refresh courses” to try again in a moment.
          </p>
        )}
      </div>
    </section>
  );
}

export default CoursesPage;

