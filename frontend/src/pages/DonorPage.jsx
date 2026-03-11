import { useState } from 'react';
import {
  fetchScholarshipFunds,
  fetchScholarshipFundsByDonor,
  fetchScholarshipStatistics,
} from '../api/scholarships';
import { useAuth } from '../state/auth';

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
      setStats(null);
      setFunds(null);
    } finally {
      setLoading(false);
    }
  };

  const loadForDonor = async () => {
    if (!donorId) {
      setError('Enter a donor ID first.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetchScholarshipFundsByDonor(donorId, token);
      setDonorFunds(res);
    } catch (err) {
      setError(err.message || 'Unable to load donor funds.');
      setDonorFunds(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Donor Transparency Dashboard</h2>
          <p className="mt-0.5 text-xs text-slate-600">
            See how scholarship funds are created, shared, and used for learners.
          </p>
        </div>
        <button
          type="button"
          onClick={loadAll}
          className="mt-1 inline-flex items-center justify-center rounded-full bg-green-earth px-3 py-1.5 text-xs font-semibold text-white shadow-sm sm:mt-0"
        >
          Load impact metrics
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex-1 text-xs font-medium text-slate-700">
          Donor ID
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
            placeholder="e.g. DONOR-001"
            value={donorId}
            onChange={(event) => setDonorId(event.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={loadForDonor}
          className="inline-flex items-center justify-center rounded-full bg-teal-deep px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
        >
          View donor funds
        </button>
      </div>

      {loading && <p className="text-xs text-slate-600">Loading scholarship data…</p>}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {stats && (
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg bg-slate-50 px-3 py-2"
            >
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                {key.replace(/_/g, ' ')}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-teal-deep">
                {typeof value === 'number' ? value.toLocaleString() : String(value)}
              </p>
            </div>
          ))}
        </div>
      )}

      {funds && funds.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Scholarship funds
          </h3>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {funds.map((fund) => (
              <article
                key={fund.id || fund.fundId || fund._id}
                className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">
                    {fund.name || fund.label || 'Scholarship fund'}
                  </p>
                  <span className="rounded-full bg-green-earth/10 px-2 py-0.5 text-[10px] font-medium text-green-earth">
                    {fund.currency || 'USD'}{' '}
                    {typeof fund.amount === 'number' ? fund.amount.toLocaleString() : fund.amount}
                  </span>
                </div>
                {fund.donorId && (
                  <p className="mt-1 text-[11px] text-slate-600">Donor: {fund.donorId}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {donorFunds && donorFunds.length > 0 && (
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Funds for donor {donorId}
          </h3>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {donorFunds.map((fund) => (
              <article
                key={fund.id || fund.fundId || fund._id}
                className="rounded-xl border border-slate-100 bg-white p-3 text-xs"
              >
                <p className="font-semibold text-slate-900">
                  {fund.name || 'Scholarship fund'}
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Amount:{' '}
                  {typeof fund.amount === 'number' ? fund.amount.toLocaleString() : fund.amount}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default DonorPage;

