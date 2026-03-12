import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';
import AdminDashboard from './AdminDashboard';
import NgoDashboard from './NgoDashboard';
import StudentDashboard from './StudentDashboard';

function OverviewPage() {
  const { role } = useAuth();

  if (role === 'ADMIN') {
    return <AdminDashboard />;
  }

  if (role === 'NGO') {
    return <NgoDashboard />;
  }

  if (role === 'STUDENT') {
    return <StudentDashboard />;
  }

  // Default fallback
  return <GenericDashboard />;
}

function GenericDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      to: '/app/courses',
      icon: '📚',
      title: 'Courses',
      desc: 'Browse & enroll in courses',
      color: 'bg-teal-light text-teal-deep',
    },
    {
      to: '/app/student',
      icon: '🎓',
      title: 'Student',
      desc: 'Profile, certificates & more',
      color: 'bg-green-light text-green-earth',
    },
    {
      to: '/app/donor',
      icon: '💰',
      title: 'Donor Hub',
      desc: 'Track scholarship impact',
      color: 'bg-warm-50 text-warm-600',
    },
    {
      to: '/app/verify',
      icon: '✅',
      title: 'Verify',
      desc: 'Check any certificate',
      color: 'bg-slate-100 text-slate-700',
    },
  ];

  const features = [
    { icon: '🔗', title: 'Blockchain-Secured', desc: 'Every credential is tamper-proof and verifiable.' },
    { icon: '📱', title: 'Mobile-First', desc: 'Built for low-end devices and intermittent connectivity.' },
    { icon: '🌍', title: 'Cross-Border', desc: 'Portable credentials recognized globally.' },
    { icon: '🔍', title: 'Transparent', desc: 'Track every scholarship dollar from donor to learner.' },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-green-earth to-green-600 p-5 text-white shadow-card">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Dashboard</p>
        <h2 className="mt-1 text-lg font-bold leading-tight">
          Empowering communities through education
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/80">
          Mentora connects learners, NGOs, and donors with blockchain-verified credentials and transparent scholarship tracking.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.to}
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
          Why Mentora?
        </h3>
        <div className="space-y-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-surface text-base">
                {f.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
