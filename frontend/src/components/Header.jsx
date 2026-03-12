import { useAuth } from '../state/auth';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { isAuthenticated, role, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-deep via-teal-mid to-teal-deep px-5 py-5 text-white shadow-float">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/5" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-sm font-bold">
              M
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-100/80">
              Mentora
            </p>
          </div>
          <h1 className="mt-2 text-lg font-bold leading-tight sm:text-xl">
            Learn. Earn Credentials.
          </h1>
          <p className="mt-1 max-w-xs text-[12px] leading-relaxed text-white/70">
            Blockchain-verified education for communities that need it most.
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex flex-col items-end gap-2">
            {role && (
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                {role}
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                signOut();
                navigate('/login', { replace: true });
              }}
              className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm transition hover:bg-white/20"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
