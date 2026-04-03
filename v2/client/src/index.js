import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from "./context/AuthContext";

import "./styles/normalise.css";
import "./styles/style.css";
import "./styles/utility.css";
import "./styles/responsive.css";
import "./styles/fonts.css";

// Importing fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
