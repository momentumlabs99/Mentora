import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { mentoraApi } from '../api/api';

const TOKEN_KEY = 'mentora_token';
const ROLE_KEY = 'mentora_role';
const USER_KEY = 'mentora_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_KEY) || '');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const setSession = (nextToken, nextRole, userData = null) => {
    const t = nextToken || '';
    const r = nextRole || '';
    setToken(t);
    setRole(r);
    setUser(userData);
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
    if (r) localStorage.setItem(ROLE_KEY, r);
    else localStorage.removeItem(ROLE_KEY);
    if (userData) localStorage.setItem(USER_KEY, JSON.stringify(userData));
    else localStorage.removeItem(USER_KEY);
  };

  const signOut = async () => {
    try {
      if (token) {
        await mentoraApi.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      setSession('', '', null);
    }
  };

  // Token expiration check
  useEffect(() => {
    if (!token) return;

    const checkTokenExpiration = () => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = payload.exp * 1000;
        if (Date.now() >= expiresAt) {
          signOut();
        }
      } catch (err) {
        console.error('Token validation error:', err);
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      role,
      user,
      isAuthenticated: Boolean(token),
      setSession,
      signOut,
    }),
    [token, role, user],
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

