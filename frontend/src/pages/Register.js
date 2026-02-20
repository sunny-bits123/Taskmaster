import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api"; // make sure baseURL is http://localhost:5000/api
import "../styles/Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", { name, email, password });
      alert(response.data.message); // "User registered successfully"
      navigate("/"); // redirect to login
    } catch (err) {
      console.log(err); // check real error in console
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // show actual backend message
      } else {
        alert("Something went wrong. Check console for details.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Taskmaster Pro</h2>
        <p className="auth-subtitle">Create your account</p>

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

