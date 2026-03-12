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

  return (
    <header className="flex items-center bg-white dark:bg-slate-900 p-4 sticky top-0 z-50 border-b border-primary/10 shadow-sm">
      <div className="flex size-10 shrink-0 items-center justify-center bg-primary/10 rounded-full mr-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
          alt="User profile"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBX6COziU4v0-cpJ89BF3iC1jXwZa8cqXuv3dGL6AAyRVROnQ73ZhcxQkT7xZH4TvfYk_LkC1uHzsUV0mZy4RMtZVz_lYR5U0e6VBN7TTvmkXDB9Jz1rJMKydWKW_WZmAgZk-sg_OlCxZ9jrmcYjFCY8dYaIyb0s29SAW0KAMXfNRmcl3_Ch8IgKFcFeQYaOcjf-IDFYUlKnu73_hnXGw7307KZ6lOt5Vw2soJ2c7d_Lr3xq_mS7pcodX00i336lacx7axjWalhAbM")',
          }}
        />
      </div>
      <div className="flex-1">
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">
          Mentora
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {user?.name || "User"}
        </p>
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
