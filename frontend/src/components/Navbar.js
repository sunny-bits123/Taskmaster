import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <span className="logo-text">TaskMaster Pro</span>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {open && (
          <div className="dropdown">
            {/* USER INFO */}
            <div className="user-info">
              <div className="avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="username">{user?.name}</p>
                <p className="userid">{user?.email || user?.id}</p>
              </div>
            </div>

            <hr />

            {/* MENU */}
            <button onClick={() => navigate("/dashboard")}>📊 Dashboard</button>
            <button disabled>⚙️ Settings</button>

            <hr />

            <button className="logout-btn" onClick={logout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
