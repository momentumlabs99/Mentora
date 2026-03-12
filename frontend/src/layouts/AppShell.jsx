import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

function AppShell() {
  return (
    <div className="min-h-screen bg-surface font-inter text-slate-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-4 pb-24 md:max-w-5xl md:pb-6">
        <Header />
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default AppShell;
