import { useState } from 'react';
import {
  fetchScholarshipFunds,
  fetchScholarshipFundsByDonor,
  fetchScholarshipStatistics,
} from '../api/scholarships';
import { useAuth } from '../state/auth';

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-surface p-3 text-center">
      <p className="text-lg font-bold text-teal-deep">
        {typeof value === 'number' ? value.toLocaleString() : String(value)}
      </p>
      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
        {label.replace(/_/g, ' ')}
      </p>
    </div>
  );
}

function FundCard({ fund }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800">
          {fund.name || fund.label || 'Scholarship Fund'}
        </p>
        <span className="flex-none rounded-lg bg-green-light px-2 py-0.5 text-[11px] font-bold text-green-earth">
          {fund.currency || 'USD'}{' '}
          {typeof fund.amount === 'number' ? fund.amount.toLocaleString() : fund.amount}
        </span>
      </div>
      {fund.donorId && (
        <p className="mt-1.5 text-[11px] text-slate-400">Donor: {fund.donorId}</p>
      )}
    </div>
  );
}

function DonorPage() {
  const { token } = useAuth();
  const [donorId, setDonorId] = useState('');
  const [stats, setStats] = useState(null);
  const [funds, setFunds] = useState(null);
  const [donorFunds, setDonorFunds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAll = async () => {
    setError('');
    setLoading(true);
    try {
      const [statsRes, fundsRes] = await Promise.all([
        fetchScholarshipStatistics(token),
        fetchScholarshipFunds(token),
      ]);
      setStats(statsRes);
      setFunds(fundsRes);
    } catch (err) {
      setError(err.message || 'Unable to load donor metrics.');
    } finally {
      setLoading(false);
    }
  };

  const loadForDonor = async () => {
    if (!donorId) { setError('Enter a donor ID first.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetchScholarshipFundsByDonor(donorId, token);
      setDonorFunds(res);
    } catch (err) {
      setError(err.message || 'Unable to load donor funds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-warm-50 to-warm-100 p-4 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Donor Hub</h2>
            <p className="mt-0.5 text-xs text-slate-600">
              Track how scholarship funds create real impact for learners.
            </p>
          </div>
          <button
            type="button"
            onClick={loadAll}
            className="flex-none rounded-xl bg-green-earth px-3 py-2 text-xs font-semibold text-white shadow-card transition hover:shadow-card-hover active:scale-95"
          >
            Load metrics
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Object.entries(stats).map(([key, value]) => (
            <StatCard key={key} label={key} value={value} />
          ))}
        </div>
      )}

      {/* Donor lookup */}
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Look up a donor</p>
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-surface px-3 py-2.5">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="Donor ID (e.g. DONOR-001)"
              value={donorId}
              onChange={(e) => setDonorId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadForDonor()}
            />
          </div>
          <button
            type="button"
            onClick={loadForDonor}
            className="flex-none rounded-xl bg-teal-deep px-4 py-2.5 text-xs font-semibold text-white transition active:scale-95"
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-deep border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">{error}</div>
      )}

      {/* All funds */}
      {funds && funds.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">All Scholarship Funds</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {funds.map((fund) => (
              <FundCard key={fund.id || fund.fundId || fund._id} fund={fund} />
            ))}
          </div>
        </div>
      )}

      {/* Donor-specific funds */}
      {donorFunds && donorFunds.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            Funds by {donorId}
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {donorFunds.map((fund) => (
              <FundCard key={fund.id || fund.fundId || fund._id} fund={fund} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorPage;
