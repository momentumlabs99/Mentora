import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { useAuth } from '../state/auth';

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
      const { token, role: nextRole } = await signup({
        name,
        email,
        password,
        role,
        organization,
      });
      setSession(token, nextRole);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-3 py-4 font-inter text-slate-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <div className="rounded-3xl bg-teal-deep px-5 py-5 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">
            Mentora
          </p>
          <h1 className="mt-1 text-xl font-semibold">Create account</h1>
          <p className="mt-1 text-xs text-teal-100">
            We’ll get you started in a few steps.
          </p>
        </div>

        <section className="space-y-4 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-base font-semibold text-slate-900">Sign up</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-medium text-slate-700">
              Full name
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
                placeholder="e.g. Amina Otieno"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="block text-xs font-medium text-slate-700">
              Email
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
                placeholder="you@example.org"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="block text-xs font-medium text-slate-700">
              Password
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
                placeholder="At least 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs font-medium text-slate-700">
                Role
                <select
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="STUDENT">Student</option>
                  <option value="NGO">NGO</option>
                </select>
              </label>

              <label className="text-xs font-medium text-slate-700">
                Organization (optional)
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-deep focus:bg-white"
                  placeholder="School / NGO name"
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                />
              </label>
            </div>

            {error && <p className="text-xs font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg bg-teal-deep px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Already have an account? Sign in
          </button>
        </section>
      </div>
    </div>
  );
}

export default SignUpPage;

