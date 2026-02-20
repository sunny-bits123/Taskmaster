import React, { useState } from "react";
import API from "../services/api";
import "../styles/Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      setMsg("Password reset link sent to your email");
    } catch {
      setMsg("Email not registered");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>

        {msg && <p>{msg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
