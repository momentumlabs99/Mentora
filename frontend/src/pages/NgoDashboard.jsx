import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchScholarshipFunds, fetchScholarshipStatistics } from '../api/scholarships';
import { fetchNgoProfile } from '../api/ngos';
import { useAuth } from '../state/auth';

function NgoDashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [funds, setFunds] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [profileData, fundsData, statsData] = await Promise.all([
        fetchNgoProfile(token).catch(() => null),
        fetchScholarshipFunds(token).catch(() => []),
        fetchScholarshipStatistics(token).catch(() => null)
      ]);
      setProfile(profileData);
      setFunds(fundsData || []);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { to: '/app/donor', icon: '💰', title: 'My Funds', desc: 'View scholarship funds', color: 'bg-warm-50 text-warm-600' },
    { to: '/app/donor', icon: '➕', title: 'Create Fund', desc: 'New scholarship fund', color: 'bg-green-light text-green-earth' },
    { to: '/app/donor', icon: '📊', title: 'Manage Funds', desc: 'Allocations & disbursements', color: 'bg-teal-light text-teal-deep' },
    { to: '/app/verify', icon: '🏅', title: 'Certificates', desc: 'Verified credentials', color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-green-earth to-green-600 p-5 text-white shadow-card">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">NGO Dashboard</p>
        <h2 className="mt-1 text-lg font-bold leading-tight">
          {profile?.name || 'NGO Partner'}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/80">
          Manage scholarship funds and track impact for your organization.
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(stats).slice(0, 4).map(([key, value]) => (
            <div key={key} className="rounded-2xl bg-white p-4 shadow-card">
              <p className="text-2xl font-bold text-teal-deep">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{key.replace(/_/g, ' ')}</p>
            </div>
          ))}
        </div>
      )}

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

      {funds.length > 0 && (
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Recent Scholarship Funds
          </h3>
          <div className="space-y-2">
            {funds.slice(0, 3).map((fund) => (
              <div key={fund.id || fund.fundId} className="flex items-center justify-between rounded-xl bg-surface p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{fund.name || 'Scholarship Fund'}</p>
                  <p className="text-xs text-slate-500">{fund.donorId || 'N/A'}</p>
                </div>
                <span className="rounded-lg bg-green-light px-2 py-1 text-xs font-bold text-green-earth">
                  {fund.currency || 'USD'} {fund.amount?.toLocaleString() || '0'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NgoDashboard;
