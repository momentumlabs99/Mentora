import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../state/auth';

function AppShell() {
  const navigate = useNavigate();
  const { signOut, role, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-3 py-4 font-inter text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 pb-20 md:pb-6">
        <Header />

        {isAuthenticated && (
          <div className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <div className="text-xs text-slate-600">
              Signed in
              {role ? (
                <>
                  {' '}
                  as <span className="font-semibold text-teal-deep">{role}</span>
                </>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => {
                signOut();
                navigate('/login', { replace: true });
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        )}

        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
}

export default AppShell;

