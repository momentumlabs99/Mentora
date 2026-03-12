import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

function AppShell() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <Header />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-24 md:max-w-5xl md:pb-6">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default AppShell;
