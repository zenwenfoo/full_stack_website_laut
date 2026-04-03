// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext({
  user: null,
  loading: true,
  setUser: () => {},
  signOut: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const me = await apiFetch("/users/me"); // includes cookie
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => { refresh(); }, []);

  // react to explicit auth-change events and multi-tab storage changes
  useEffect(() => {
    const onChange = () => refresh();
    window.addEventListener("laut-auth-change", onChange);
    const onStorage = (e) => { if (e.key === "laut_auth") onChange(); };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("laut-auth-change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const signOut = async () => {
    try { await apiFetch("/auth/logout", { method: "POST" }); } catch {}
    setUser(null);
    window.dispatchEvent(new Event("laut-auth-change"));
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, signOut, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
