import { useState } from "react";
import { useAuth } from "../state/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Capitalize role for display
  const capitalizeRole = (role) => {
    return role
      ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
      : "";
  };

  return (
    <header className="flex items-center bg-white dark:bg-slate-900 p-4 sticky top-0 z-50 border-b border-primary/10 shadow-sm">
      <div className="flex size-10 shrink-0 items-center justify-center bg-primary/10 rounded-full mr-3">
        <div className="flex items-center justify-center bg-primary text-white rounded-full size-8 font-bold text-xs">
          {getInitials(user?.name || "U")}
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">
          Mentora
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {user?.name || "User"}
          </p>
          <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
            {capitalizeRole(role)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
          className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 z-50">
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
