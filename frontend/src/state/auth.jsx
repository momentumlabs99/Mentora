import { createContext, useContext, useMemo, useState } from 'react';

const TOKEN_KEY = 'mentora_token';
const ROLE_KEY = 'mentora_role';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_KEY) || '');

  const setSession = (nextToken, nextRole) => {
    const t = nextToken || '';
    const r = nextRole || '';
    setToken(t);
    setRole(r);
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
    if (r) localStorage.setItem(ROLE_KEY, r);
    else localStorage.removeItem(ROLE_KEY);
  };

  const signOut = () => setSession('', '');

  const value = useMemo(
    () => ({
      token,
      role,
      isAuthenticated: Boolean(token),
      setSession,
      signOut,
    }),
    [token, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

