import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { useAuth } from '../state/auth';

const ROLES = [
  { value: 'STUDENT', label: '🎓 Student', desc: 'Learn and earn credentials' },
  { value: 'NGO', label: '🏛️ NGO', desc: 'Manage programs & learners' },
];

function SignUpPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [organization, setOrganization] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, role: nextRole } = await signup({ name, email, password, role, organization });
      setSession(token, nextRole);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-8 font-inter">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-deep to-teal-mid shadow-float">
            <span className="text-xl font-bold text-white">M</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
          <p className="mt-1 text-sm text-slate-500">Join Mentora in a few steps</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Full name</span>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                placeholder="Amina Otieno"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Email</span>
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                placeholder="you@example.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">Password</span>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* Role selector */}
            <div>
              <span className="mb-2 block text-xs font-semibold text-slate-600">I am a…</span>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={[
                      'rounded-xl border-2 px-3 py-3 text-left transition',
                      role === r.value
                        ? 'border-teal-deep bg-teal-light'
                        : 'border-slate-100 bg-surface hover:border-slate-200',
                    ].join(' ')}
                  >
                    <p className="text-sm font-semibold text-slate-800">{r.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                Organization <span className="font-normal text-slate-400">(optional)</span>
              </span>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
                placeholder="School or NGO name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
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
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
