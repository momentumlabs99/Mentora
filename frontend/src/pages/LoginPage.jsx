import AuthPanel from '../components/AuthPanel';

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-3 py-4 font-inter text-slate-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <div className="rounded-3xl bg-teal-deep px-5 py-5 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">
            Mentora
          </p>
          <h1 className="mt-1 text-xl font-semibold">Sign in</h1>
          <p className="mt-1 text-xs text-teal-100">
            Learn, earn verifiable credentials, and track scholarship impact.
          </p>
        </div>

        <AuthPanel />

        <p className="text-center text-[11px] text-slate-500">
          By continuing, you agree to Mentora’s Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

