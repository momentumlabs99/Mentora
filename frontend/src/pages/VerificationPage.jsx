import { useState } from 'react';
import { verifyCertificate } from '../api/verification';

function VerificationPage() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (event) => {
    event.preventDefault();
    if (!certId) { setError('Enter a certificate ID or hash.'); return; }
    setError('');
    setLoading(true);
    try {
      const data = await verifyCertificate(certId);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Unable to verify certificate.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-card">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Public Verification
          </p>
        </div>
        <h2 className="mt-2 text-lg font-bold leading-tight">Verify a Certificate</h2>
        <p className="mt-1 text-xs text-white/60">
          Check if any Mentora credential is authentic. No login required.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <form onSubmit={handleVerify} className="space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Certificate ID or Hash
            </span>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
              placeholder="CERT-0xabc123…"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-teal-deep to-teal-mid py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-card-hover active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Verifying…
              </span>
            ) : (
              'Verify certificate'
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">{error}</div>
      )}

      {result && (
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-light text-xs">✅</span>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Result</p>
          </div>
          <pre className="max-h-60 overflow-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
{JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default VerificationPage;
