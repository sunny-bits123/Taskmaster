import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Auth.css";
import AuthNavbar from "../components/AuthNavbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to manage your tasks</p>

          <form onSubmit={handleSubmit}>
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="auth-button" type="submit">
              Login
            </button>

            <div className="forgot-link">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </form>

          <div className="auth-footer">
            Don’t have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
