import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <div className="navbar-logo-icon">✓</div>
        <span className="navbar-logo-text">Taskmaster</span>
      </div>

      {/* Right side */}
      <div className="navbar-right" ref={dropdownRef}>
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>

        {/* Dropdown */}
        {open && (
          <div className="dropdown">
            {/* User info */}
            <div className="dropdown-user">
              <div className="dropdown-avatar">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="dropdown-name">{user?.name || "User"}</p>
                <p className="dropdown-email">{user?.email || ""}</p>
              </div>
            </div>

            <div className="dropdown-divider" />

            <button
              className="dropdown-item"
              onClick={() => { navigate("/dashboard"); setOpen(false); }}
            >
              📊 Dashboard
            </button>

            <button className="dropdown-item" disabled>
              ⚙️ Settings
            </button>

            <div className="dropdown-divider" />

            <button className="dropdown-item logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;