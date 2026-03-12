import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../state/auth';

function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, role } = await login({ identifier, password });
      setSession(token, role);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-8 font-inter">
      <div className="w-full max-w-sm">
        {/* Logo & hero */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-deep to-teal-mid shadow-float">
            <span className="text-xl font-bold text-white">M</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to continue learning</p>
        </div>

        {/* Form card */}
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Email or Username</span>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                placeholder="you@example.org"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Password</span>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && (
              <div className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-teal-deep to-teal-mid py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-card-hover active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[11px] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
          >
            Create an account
          </button>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          By continuing, you agree to Mentora's Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
