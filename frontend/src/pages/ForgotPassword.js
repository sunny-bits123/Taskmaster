import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setSuccess(res.data.message || "Password reset link sent to your email");
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <div className="auth-logo-icon">✓</div>
          <span className="auth-logo-name">Taskmaster</span>
        </div>

        <h1 className="auth-heading">Reset password</h1>
        <p className="auth-subheading">
          Enter your email and we'll send you a reset link
        </p>

        {error && <div className="auth-error">{error}</div>}

        {success && <div className="auth-success">{success}</div>}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <button
              className="auth-btn"
              type="submit"
              disabled={loading}
              style={{ marginTop: "8px" }}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="auth-switch" style={{ marginTop: success ? "20px" : "0" }}>
          Remember your password?{" "}
          <Link to="/">Sign in</Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;