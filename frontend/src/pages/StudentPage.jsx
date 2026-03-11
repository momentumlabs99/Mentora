import { useState } from 'react';
import {
  fetchStudentCertificates,
  fetchStudentEnrollments,
  fetchStudentProfile,
  fetchStudentScholarships,
} from '../api/students';

import { useAuth } from '../state/auth';

function StudentPage() {
  const { token } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [view, setView] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const load = async (type) => {
    if (!studentId) {
      setError('Enter a student ID first.');
      return;
    }
    setView(type);
    setError('');
    setLoading(true);
    try {
      let result;
      if (type === 'profile') result = await fetchStudentProfile(studentId, token);
      if (type === 'certificates') result = await fetchStudentCertificates(studentId, token);
      if (type === 'enrollments') result = await fetchStudentEnrollments(studentId, token);
      if (type === 'scholarships') result = await fetchStudentScholarships(studentId, token);
      setData(result);
    } catch (err) {
      setError(err.message || 'Unable to load student data.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-base font-semibold text-slate-900">Student space</h2>
        <p className="mt-0.5 text-xs text-slate-600">
          Look up student profiles, certificates, enrollments, and scholarships.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1 text-xs font-medium text-slate-700">
          Student ID
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
            placeholder="e.g. STU-12345"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => load('profile')}
            className="rounded-full bg-teal-deep px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => load('certificates')}
            className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            Certificates
          </button>
          <button
            type="button"
            onClick={() => load('enrollments')}
            className="rounded-full bg-green-earth px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            Enrollments
          </button>
          <button
            type="button"
            onClick={() => load('scholarships')}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900"
          >
            Scholarships
          </button>
        </div>
      </div>

      {loading && <p className="text-xs text-slate-600">Loading {view}…</p>}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {data && (
        <pre className="max-h-60 overflow-auto rounded-xl bg-slate-900 p-3 text-[11px] leading-relaxed text-slate-50">
{JSON.stringify(data, null, 2)}
        </pre>
      )}
    </section>
  );
}

export default StudentPage;

