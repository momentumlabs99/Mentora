import { useState } from 'react';
import { verifyCertificate } from '../api/verification';

function VerificationPage() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (event) => {
    event.preventDefault();
    if (!certId) {
      setError('Enter a certificate ID or hash.');
      return;
    }
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
    <section className="space-y-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-base font-semibold text-slate-900">Public Verification Portal</h2>
        <p className="mt-0.5 text-xs text-slate-600">
          Check if a Mentora certificate is valid. No login needed.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-3">
        <label className="block text-xs font-medium text-slate-700">
          Certificate ID / Hash
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
            placeholder="e.g. CERT-0xabc123…"
            value={certId}
            onChange={(event) => setCertId(event.target.value)}
          />
        </label>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-teal-deep px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-deep focus-visible:ring-offset-2"
        >
          {loading ? 'Verifying…' : 'Verify certificate'}
        </button>
      </form>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      {result && (
        <pre className="max-h-60 overflow-auto rounded-xl bg-slate-900 p-3 text-[11px] leading-relaxed text-slate-50">
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </section>
  );
}

export default VerificationPage;

