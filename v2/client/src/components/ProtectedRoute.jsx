// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

export default function ProtectedRoute({ children }) {
  const [state, setState] = React.useState({ checking: true, ok: false });

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await apiFetch('/users/me');
        if (alive) setState({ checking: false, ok: true });
      } catch {
        if (alive) setState({ checking: false, ok: false });
      }
    })();
    return () => { alive = false; };
  }, []);

  if (state.checking) return null; // or a spinner
  return state.ok ? children : <Navigate to="/login" replace />;
}
