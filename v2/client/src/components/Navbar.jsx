// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const collapseRef = useRef(null);
  const showBtnRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // from context
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (
        collapseRef.current && !collapseRef.current.contains(e.target) &&
        showBtnRef.current && !showBtnRef.current.contains(e.target)
      ) setOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = async () => {
    try { await apiFetch("/auth/logout", { method: "POST" }); } catch {}
    signOut();               // clears localStorage + context
    setProfileOpen(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-cng" : ""}`}>
      <div className="container flex">
        <Link to="/" className="site-brand" onClick={() => setOpen(false)}>Laut</Link>

        <button
          ref={showBtnRef}
          id="navbar-show-btn"
          className="flex"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <i className="fas fa-bars" />
        </button>

        <div ref={collapseRef} id="navbar-collapse" className={open ? "navbar-collapse-rmw" : ""}>
          <button
            id="navbar-close-btn"
            className="flex"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <i className="fas fa-times" />
          </button>

          <ul className="navbar-nav">
            {[
              { to: "/", label: "Home" },
              { to: "/menu", label: "Menu" },
              { to: "/about", label: "About Us" },
              { to: "/reservations", label: "Reservations" },
              { to: "/contact", label: "Contact" },
              { to: "/gallery", label: "Gallery" },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <Link to={to} className="nav-link" onClick={() => setOpen(false)}>{label}</Link>
              </li>
            ))}

            <li className="nav-item profile-dropdown" ref={profileRef}>
              <button
                id="profile-btn"
                type="button"
                className="nav-link"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                onClick={(e) => { e.stopPropagation(); setProfileOpen(p => !p); }}
                style={{ background: "none", border: 0, padding: 0 }}
              >
                <i className="fas fa-user-circle" />
              </button>

              <div className={`profile-menu ${profileOpen ? "open" : ""}`}>
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="dropdown-link" onClick={() => { setProfileOpen(false); setOpen(false); }}>
                      Log In
                    </Link>
                    <Link to="/register" className="dropdown-link" onClick={() => { setProfileOpen(false); setOpen(false); }}>
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" className="dropdown-link" onClick={() => { setProfileOpen(false); setOpen(false); }}>
                      View Account
                    </Link>
                    <hr style={{ border: "none", borderTop: "1px solid #444", margin: "0.5rem 0" }} />
                    <button id="logout-btn" type="button" className="dropdown-link" onClick={handleLogout}>
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
