import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';

function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const quickActions = [
    { to: '/app/courses', icon: '📚', title: 'Browse Courses', desc: 'Find new courses', color: 'bg-teal-light text-teal-deep' },
    { to: '/app/student', icon: '📖', title: 'My Courses', desc: 'View enrollments', color: 'bg-blue-50 text-blue-600' },
    { to: '/app/student', icon: '🏅', title: 'My Certificates', desc: 'View credentials', color: 'bg-green-light text-green-earth' },
    { to: '/app/donor', icon: '💰', title: 'Scholarships', desc: 'View financial aid', color: 'bg-warm-50 text-warm-600' },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-teal-deep via-teal-mid to-teal-deep p-5 text-white shadow-card">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Student Dashboard</p>
        <h2 className="mt-1 text-lg font-bold leading-tight">
          Welcome, {user?.name || 'Student'}!
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/80">
          Continue your learning journey and earn blockchain-verified credentials.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-teal-deep">{enrollments.length}</p>
          <p className="mt-1 text-xs text-slate-500">Enrolled Courses</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-green-earth">{certificates.length}</p>
          <p className="mt-1 text-xs text-slate-500">Certificates</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-blue-600">0</p>
          <p className="mt-1 text-xs text-slate-500">In Progress</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-warm-600">0</p>
          <p className="mt-1 text-xs text-slate-500">Scholarships</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.to)}
            className="group flex flex-col items-start rounded-2xl bg-white p-4 text-left shadow-card transition hover:shadow-card-hover active:scale-[0.97]"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${action.color}`}>
              {action.icon}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">{action.title}</h3>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{action.desc}</p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Continue Learning
        </h3>
        {enrollments.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-2xl">📚</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">No courses yet</p>
            <p className="mt-1 text-xs text-slate-500">Browse courses to get started</p>
            <button
              onClick={() => navigate('/app/courses')}
              className="mt-3 rounded-xl bg-teal-deep px-4 py-2 text-xs font-semibold text-white transition hover:shadow-card"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="rounded-xl bg-surface p-3">
                <p className="text-sm font-semibold text-slate-800">{enrollment.courseName}</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full bg-teal-deep" style={{ width: `${enrollment.progress || 0}%` }} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{enrollment.progress || 0}% complete</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
