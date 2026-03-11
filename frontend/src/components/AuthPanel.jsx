import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../state/auth';

function AuthPanel() {
  const navigate = useNavigate();
  const { role, setSession } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token: nextToken, role: nextRole } = await login({ identifier, password });
      setSession(nextToken, nextRole);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Sign in</h2>
          <p className="mt-0.5 text-xs text-slate-600">Welcome back — continue to your dashboard.</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          Mentora
        </span>
      </div>

      <form onSubmit={handleLogin} className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-700">
              Email / Username
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-teal-deep focus:bg-white"
                placeholder="e.g. ngo@mentora.org"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-700">
              Password
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-teal-deep focus:bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-teal-deep px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-deep focus-visible:ring-offset-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Create account
          </button>
        </div>

        {role && (
          <p className="text-xs text-slate-600">
            Current role:{' '}
            <span className="font-semibold text-teal-deep">{role}</span>
          </p>
        )}
        {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      </form>
    </section>
  );
}

export default AuthPanel;

