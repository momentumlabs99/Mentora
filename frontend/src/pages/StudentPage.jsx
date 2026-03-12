import { useState } from 'react';
import {
  fetchStudentCertificates,
  fetchStudentEnrollments,
  fetchStudentProfile,
  fetchStudentScholarships,
} from '../api/students';
import { useAuth } from '../state/auth';

const TABS = [
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'certificates', label: 'Certs', icon: '🏅' },
  { key: 'enrollments', label: 'Enrolled', icon: '📖' },
  { key: 'scholarships', label: 'Aid', icon: '💰' },
];

function StudentPage() {
  const { token } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const load = async (type) => {
    if (!studentId) {
      setError('Enter a student ID first.');
      return;
    }
    setActiveTab(type);
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
    <div className="space-y-4">
      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h2 className="text-lg font-bold text-slate-900">Student Space</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Look up profiles, certificates, enrollments, and scholarships.
        </p>

        <div className="mt-3 flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="Student ID (e.g. STU-12345)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && load(activeTab)}
          />
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => load(tab.key)}
              className={[
                'flex flex-none items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition active:scale-95',
                activeTab === tab.key
                  ? 'bg-teal-deep text-white shadow-card'
                  : 'bg-surface text-slate-600 hover:bg-slate-100',
              ].join(' ')}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-deep border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">{error}</div>
      )}

      {data && !loading && (
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-lg bg-teal-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-deep">
              {activeTab}
            </span>
            <span className="text-[11px] text-slate-400">Student: {studentId}</span>
          </div>
          <pre className="max-h-72 overflow-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
{JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {!data && !loading && !error && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-card">
          <p className="text-2xl">🎓</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Enter a student ID</p>
          <p className="mt-1 text-xs text-slate-500">Then tap a category to look up their data.</p>
        </div>
      )}
    </div>
  );
}

export default StudentPage;
